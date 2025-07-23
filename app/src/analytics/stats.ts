// 🗃️ DATABASE ENTITIES: Import analytics entity types
import { type DailyStats } from 'wasp/entities';
// 🔧 WASP JOBS: Import background job type definitions  
import { type DailyStatsJob } from 'wasp/server/jobs';
// 💳 PAYMENT PROCESSORS: Import payment service clients
import Stripe from 'stripe';
import { stripe } from '../payment/stripe/stripeClient';
import { listOrders } from '@lemonsqueezy/lemonsqueezy.js';
// 📊 ANALYTICS PROVIDERS: Import analytics utilities
// import { getDailyPageViews, getSources } from './providers/plausibleAnalyticsUtils';
import { getDailyPageViews, getSources } from './providers/googleAnalyticsUtils';
// 🔧 CHANGE: Switch analytics providers by commenting/uncommenting lines above
// 💰 PAYMENT SYSTEM: Import payment configuration
import { paymentProcessor } from '../payment/paymentProcessor';
import { SubscriptionStatus } from '../payment/plans';

// 📊 TYPE DEFINITIONS: Analytics props for components
export type DailyStatsProps = { 
  dailyStats?: DailyStats; // Current day's statistics
  weeklyStats?: DailyStats[]; // Array of daily stats for trending
  isLoading?: boolean; // Loading state for UI components
};

/**
 * 📊 DAILY ANALYTICS CALCULATION: Background job to compute and store daily metrics
 * 🔧 TEMPLATE USAGE: Core analytics engine that runs daily to collect business metrics
 * 
 * Key features:
 * - Automated daily statistics collection
 * - Multi-payment processor revenue tracking (Stripe & LemonSqueezy)
 * - Page view analytics integration (Google Analytics or Plausible)
 * - User growth metrics calculation
 * - Traffic source analysis
 * - Error handling and logging
 * 
 * Collected metrics:
 * - Total page views with day-over-day changes
 * - User count and growth deltas
 * - Paying user count and subscription metrics
 * - Total revenue across payment processors
 * - Traffic sources breakdown
 */
export const calculateDailyStats: DailyStatsJob<never, void> = async (_args, context) => {
  // 📅 DATE SETUP: Establish UTC dates for consistent timezone handling
  const nowUTC = new Date(Date.now());
  nowUTC.setUTCHours(0, 0, 0, 0); // Start of today in UTC

  const yesterdayUTC = new Date(nowUTC);
  yesterdayUTC.setUTCDate(yesterdayUTC.getUTCDate() - 1); // Start of yesterday in UTC

  try {
    const yesterdaysStats = await context.entities.DailyStats.findFirst({
      where: {
        date: {
          equals: yesterdayUTC,
        },
      },
    });

    const userCount = await context.entities.User.count({});
    // users can have paid but canceled subscriptions which terminate at the end of the period
    // we don't want to count those users as current paying users
    const paidUserCount = await context.entities.User.count({
      where: {
        subscriptionStatus: SubscriptionStatus.Active,
      },
    });

    let userDelta = userCount;
    let paidUserDelta = paidUserCount;
    if (yesterdaysStats) {
      userDelta -= yesterdaysStats.userCount;
      paidUserDelta -= yesterdaysStats.paidUserCount;
    }

    let totalRevenue;
    switch (paymentProcessor.id) {
      case 'stripe':
        totalRevenue = await fetchTotalStripeRevenue();
        break;
      case 'lemonsqueezy':
        totalRevenue = await fetchTotalLemonSqueezyRevenue();
        break;
      default:
        throw new Error(`Unsupported payment processor: ${paymentProcessor.id}`);
    }

    const { totalViews, prevDayViewsChangePercent } = await getDailyPageViews();

    let dailyStats = await context.entities.DailyStats.findUnique({
      where: {
        date: nowUTC,
      },
    });

    if (!dailyStats) {
      console.log('No daily stat found for today, creating one...');
      dailyStats = await context.entities.DailyStats.create({
        data: {
          date: nowUTC,
          totalViews,
          prevDayViewsChangePercent,
          userCount,
          paidUserCount,
          userDelta,
          paidUserDelta,
          totalRevenue,
        },
      });
    } else {
      console.log('Daily stat found for today, updating it...');
      dailyStats = await context.entities.DailyStats.update({
        where: {
          id: dailyStats.id,
        },
        data: {
          totalViews,
          prevDayViewsChangePercent,
          userCount,
          paidUserCount,
          userDelta,
          paidUserDelta,
          totalRevenue,
        },
      });
    }
    const sources = await getSources();

    for (const source of sources) {
      let visitors = source.visitors;
      if (typeof source.visitors !== 'number') {
        visitors = parseInt(source.visitors);
      }
      await context.entities.PageViewSource.upsert({
        where: {
          date_name: {
            date: nowUTC,
            name: source.source,
          },
        },
        create: {
          date: nowUTC,
          name: source.source,
          visitors,
          dailyStatsId: dailyStats.id,
        },
        update: {
          visitors,
        },
      });
    }

    console.table({ dailyStats });
  } catch (error: any) {
    console.error('Error calculating daily stats: ', error);
    await context.entities.Logs.create({
      data: {
        message: `Error calculating daily stats: ${error?.message}`,
        level: 'job-error',
      },
    });
  }
};

async function fetchTotalStripeRevenue() {
  let totalRevenue = 0;
  let params: Stripe.BalanceTransactionListParams = {
    limit: 100,
    // created: {
    //   gte: startTimestamp,
    //   lt: endTimestamp
    // },
    type: 'charge',
  };

  let hasMore = true;
  while (hasMore) {
    const balanceTransactions = await stripe.balanceTransactions.list(params);

    for (const transaction of balanceTransactions.data) {
      if (transaction.type === 'charge') {
        totalRevenue += transaction.amount;
      }
    }

    if (balanceTransactions.has_more) {
      // Set the starting point for the next iteration to the last object fetched
      params.starting_after = balanceTransactions.data[balanceTransactions.data.length - 1].id;
    } else {
      hasMore = false;
    }
  }

  // Revenue is in cents so we convert to dollars (or your main currency unit)
  return totalRevenue / 100;
}

async function fetchTotalLemonSqueezyRevenue() {
  try {
    let totalRevenue = 0;
    let hasNextPage = true;
    let currentPage = 1;

    while (hasNextPage) {
      const { data: response } = await listOrders({
        filter: {
          storeId: process.env.LEMONSQUEEZY_STORE_ID,
        },
        page: {
          number: currentPage,
          size: 100,
        },
      });

      if (response?.data) {
        for (const order of response.data) {
          totalRevenue += order.attributes.total;
        }
      }

      hasNextPage = !response?.meta?.page.lastPage;
      currentPage++;
    }

    // Revenue is in cents so we convert to dollars (or your main currency unit)
    return totalRevenue / 100;
  } catch (error) {
    console.error('Error fetching Lemon Squeezy revenue:', error);
    throw error;
  }
}
