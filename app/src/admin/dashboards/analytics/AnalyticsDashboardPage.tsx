// 🔐 AUTHENTICATION: Import user type for admin authentication
import { type AuthUser } from 'wasp/auth';
// 📊 DATA FETCHING: Import query hook and operation for analytics data
import { useQuery, getDailyStats } from 'wasp/client/operations';
// 📈 ANALYTICS CARDS: Import metric display components
import TotalSignupsCard from './TotalSignupsCard'; // User registration metrics
import TotalPageViewsCard from './TotalPageViewsCard'; // Website traffic metrics
import TotalPayingUsersCard from './TotalPayingUsersCard'; // Revenue user metrics
import TotalRevenueCard from './TotalRevenueCard'; // Revenue metrics
// 📊 CHARTS: Import data visualization components
import RevenueAndProfitChart from './RevenueAndProfitChart'; // Revenue trends chart
import SourcesTable from './SourcesTable'; // Traffic sources table
// 🏗️ LAYOUT: Import admin layout wrapper
import DefaultLayout from '../../layout/DefaultLayout';
// 🔒 SECURITY: Import admin access control hook
import { useRedirectHomeUnlessUserIsAdmin } from '../../useRedirectHomeUnlessUserIsAdmin';
// 🎨 STYLING: Import conditional CSS utility
import { cn } from '../../../client/cn';

/**
 * 📊 ANALYTICS DASHBOARD: Main admin dashboard with key metrics and charts
 * 🔧 TEMPLATE USAGE: Primary admin interface for monitoring app performance
 * 
 * Key features:
 * - Real-time analytics data fetching
 * - Responsive grid layout for metrics cards
 * - Revenue and user growth tracking
 * - Traffic sources analysis
 * - Admin-only access with security checks
 * - Loading states and error handling
 * - Dark mode support throughout
 */
const Dashboard = ({ user }: { user: AuthUser }) => {
  // 🔒 ADMIN ACCESS CONTROL: Redirect non-admin users to home page
  useRedirectHomeUnlessUserIsAdmin({ user });
  // 🔧 CHANGE: Customize admin check logic in the hook if needed

  // 📊 ANALYTICS DATA: Fetch daily statistics with loading and error states
  const { data: stats, isLoading, error } = useQuery(getDailyStats);
  // 🔧 CHANGE: Add error handling, caching, or refresh intervals
  // 🔧 CHANGE: Replace getDailyStats with your analytics operation

  return (
    <DefaultLayout user={user}>
      {/* 📊 DASHBOARD CONTAINER: Main analytics content wrapper */}
      <div className='relative'>
        {/* 🔧 CHANGE: Add breadcrumbs or page title here if needed */}
        
        {/* 📈 METRICS CONTENT: Main dashboard content with conditional opacity */}
        <div className={cn({
          'opacity-25': !stats, // Dim content while loading
          // 🔧 CHANGE: Customize loading state appearance
        })}>
          
          {/* 📊 METRICS CARDS GRID: Key performance indicators */}
          <div className='grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5'>
            {/* 🔧 CHANGE: Customize metrics grid layout:
             * - grid-cols-1: single column on mobile
             * - md:grid-cols-2: two columns on medium screens
             * - xl:grid-cols-4: four columns on extra large screens
             * - Responsive gap spacing: gap-4 md:gap-6 2xl:gap-7.5
             */}
            
            {/* 👀 PAGE VIEWS CARD: Website traffic metrics */}
            <TotalPageViewsCard
              totalPageViews={stats?.dailyStats.totalViews}
              prevDayViewsChangePercent={stats?.dailyStats.prevDayViewsChangePercent}
              // 🔧 CHANGE: Add additional metrics like bounce rate, session duration
            />
            
            {/* 💰 REVENUE CARD: Financial performance metrics */}
            <TotalRevenueCard
              dailyStats={stats?.dailyStats}
              weeklyStats={stats?.weeklyStats}
              isLoading={isLoading}
              // 🔧 CHANGE: Add MRR, ARR, or other revenue metrics
            />
            
            {/* 💳 PAYING USERS CARD: Subscription metrics */}
            <TotalPayingUsersCard 
              dailyStats={stats?.dailyStats} 
              isLoading={isLoading}
              // 🔧 CHANGE: Add churn rate, upgrade rate, or conversion metrics
            />
            
            {/* 👥 SIGNUPS CARD: User acquisition metrics */}
            <TotalSignupsCard 
              dailyStats={stats?.dailyStats} 
              isLoading={isLoading}
              // 🔧 CHANGE: Add conversion funnel or activation metrics
            />
          </div>

          {/* 📊 CHARTS AND TABLES SECTION: Detailed analytics visualization */}
          <div className='mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5'>
            {/* 🔧 CHANGE: Customize charts layout:
             * - mt-4 md:mt-6 2xl:mt-7.5: responsive top margin
             * - grid-cols-12: 12-column grid for flexible layouts
             * - Responsive gaps: gap-4 md:gap-6 2xl:gap-7.5
             */}
            
            {/* 📈 REVENUE CHART: Revenue and profit trends over time */}
            <RevenueAndProfitChart 
              weeklyStats={stats?.weeklyStats} 
              isLoading={isLoading}
              // 🔧 CHANGE: Add different chart types (bar, pie, area)
              // 🔧 CHANGE: Add time period selectors (daily, weekly, monthly)
            />

            {/* 📊 TRAFFIC SOURCES: Detailed traffic sources breakdown */}
            <div className='col-span-12 xl:col-span-8'>
              {/* 🔧 CHANGE: Adjust column span for different layouts */}
              <SourcesTable sources={stats?.dailyStats?.sources} />
              {/* 🔧 CHANGE: Add additional tables (top pages, user segments, etc.) */}
            </div>
          </div>
        </div>

        {!stats && (
          <div className='absolute inset-0 flex items-start justify-center bg-white/50 dark:bg-boxdark-2/50'>
            <div className='rounded-lg bg-white p-8 shadow-lg dark:bg-boxdark'>
              <p className='text-2xl font-bold text-boxdark dark:text-white'>
                No daily stats generated yet
              </p>
              <p className='mt-2 text-sm text-bodydark2'>
                Stats will appear here once the daily stats job has run
              </p>
            </div>
          </div>
        )}
      </div>
    </DefaultLayout>
  );
};

export default Dashboard;
