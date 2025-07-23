// 🗃️ DATABASE ENTITIES: Import Wasp user entity types
import { type User } from 'wasp/entities';

// 🎭 MOCK DATA GENERATION: Import Faker.js for realistic test data
import { faker } from '@faker-js/faker';

// 🔗 DATABASE CLIENT: Import Prisma client for database operations
import type { PrismaClient } from '@prisma/client';

// 💰 PAYMENT SYSTEM: Import subscription-related utilities
import { getSubscriptionPaymentPlanIds, SubscriptionStatus } from '../../payment/plans';

// 📝 TYPE DEFINITION: User data structure without auto-generated ID
type MockUserData = Omit<User, 'id'>;

/**
 * 🌱 DATABASE SEEDING: Generate realistic mock users for development/testing
 * 🔧 TEMPLATE USAGE: Essential for populating development database with test data
 * 
 * This function is imported in `app.db.seeds` in the `main.wasp` file and
 * seeds the database with mock users via the `wasp db seed` command.
 * 
 * Key features:
 * - Generates realistic user data with Faker.js
 * - Creates diverse subscription statuses
 * - Maintains data consistency across related fields
 * - Supports configurable user count
 * - Includes payment and credit system data
 * 
 * Usage scenarios:
 * - Development environment setup
 * - Testing user-related features
 * - Demo environment preparation
 * - Performance testing with realistic data
 * 
 * Reference: https://wasp.sh/docs/data-model/backends#seeding-the-database
 */
export async function seedMockUsers(prismaClient: PrismaClient) {
  // 🔧 CHANGE: Modify number of users to generate
  const numberOfUsers = 50; // Customize based on your needs
  
  // 🚀 BATCH CREATION: Generate and create all users in parallel
  await Promise.all(
    generateMockUsersData(numberOfUsers).map((data) => 
      prismaClient.user.create({ data })
    )
  );
  // 🔧 CHANGE: Add progress tracking for large datasets:
  // console.log(`Creating ${numberOfUsers} mock users...`);
  // const users = generateMockUsersData(numberOfUsers);
  // for (let i = 0; i < users.length; i++) {
  //   await prismaClient.user.create({ data: users[i] });
  //   if (i % 10 === 0) console.log(`Created ${i + 1}/${users.length} users`);
  // }
}

/**
 * 👥 MOCK DATA GENERATION: Create array of mock user data objects
 * 🔧 TEMPLATE USAGE: Generates specified number of realistic user records
 */
function generateMockUsersData(numOfUsers: number): MockUserData[] {
  // 🎭 FAKER GENERATION: Use Faker's multiple helper for batch generation
  return faker.helpers.multiple(generateMockUserData, { count: numOfUsers });
  // 🔧 CHANGE: Add data distribution control:
  // return Array.from({ length: numOfUsers }, (_, index) => 
  //   generateMockUserData(index)
  // );
}

/**
 * 👤 INDIVIDUAL USER GENERATOR: Create single realistic user data object
 * 🔧 TEMPLATE USAGE: Customize user attributes and relationships here
 */
function generateMockUserData(): MockUserData {
  // 👤 PERSONAL INFORMATION: Generate realistic name data
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  // 🔧 CHANGE: Add more personal data:
  // const middleName = faker.person.middleName();
  // const fullName = `${firstName} ${middleName} ${lastName}`;
  
  // 💰 SUBSCRIPTION STATUS: Randomly assign subscription states
  const subscriptionStatus = faker.helpers.arrayElement<SubscriptionStatus | null>([
    ...Object.values(SubscriptionStatus), // Active subscription statuses
    null, // No subscription
  ]);
  // 🔧 CHANGE: Control subscription distribution:
  // const subscriptionStatus = faker.datatype.boolean(0.3) ? 
  //   faker.helpers.arrayElement(Object.values(SubscriptionStatus)) : null;
  
  // 📅 DATE GENERATION: Create realistic timestamp relationships
  const now = new Date();
  const createdAt = faker.date.past({ refDate: now }); // Account creation date
  const timePaid = faker.date.between({ from: createdAt, to: now }); // Payment date
  
  // 🪙 CREDIT SYSTEM: Generate credits based on subscription status
  const credits = subscriptionStatus ? 0 : faker.number.int({ min: 0, max: 10 });
  // Free users get credits, subscribed users don't need them
  // 🔧 CHANGE: Customize credit distribution:
  // const credits = subscriptionStatus ? 
  //   faker.number.int({ min: 100, max: 1000 }) : // Bonus credits for subscribers
  //   faker.number.int({ min: 0, max: 50 }); // Free tier credits
  
  // 💳 PAYMENT STATUS: Determine if user has made payments
  const hasUserPaidOnStripe = !!subscriptionStatus || credits > 3;
  // Users with subscriptions or many credits have likely paid
  
  // 📦 USER DATA OBJECT: Return complete mock user data
  return {
    // 📧 CONTACT INFORMATION
    email: faker.internet.email({ firstName, lastName }),
    // 🔧 CHANGE: Add email domain control:
    // email: faker.internet.email({ firstName, lastName, provider: 'yourapp.com' }),
    
    username: faker.internet.userName({ firstName, lastName }),
    // 🔧 CHANGE: Add username patterns:
    // username: `${firstName.toLowerCase()}_${lastName.toLowerCase()}_${faker.number.int({ min: 1, max: 999 })}`,
    
    // ⏰ TIMESTAMPS
    createdAt, // Account creation date
    
    // 🔐 PERMISSIONS
    isAdmin: false, // Regular users, not admins
    // 🔧 CHANGE: Add admin users:
    // isAdmin: faker.datatype.boolean(0.05), // 5% admin users
    
    // 🪙 CREDIT SYSTEM
    credits, // Available credits for free users
    
    // 💰 SUBSCRIPTION DATA
    subscriptionStatus, // Current subscription state
    subscriptionPlan: subscriptionStatus ? 
      faker.helpers.arrayElement(getSubscriptionPaymentPlanIds()) : null,
    // 🔧 CHANGE: Bias toward specific plans:
    // subscriptionPlan: subscriptionStatus ? 
    //   faker.helpers.weightedArrayElement([
    //     { weight: 0.6, value: 'basic' },
    //     { weight: 0.3, value: 'pro' },
    //     { weight: 0.1, value: 'enterprise' }
    //   ]) : null,
    
    // 🔗 EXTERNAL INTEGRATIONS
    lemonSqueezyCustomerPortalUrl: null, // LemonSqueezy integration
    // 🔧 CHANGE: Add real LemonSqueezy URLs for testing:
    // lemonSqueezyCustomerPortalUrl: hasUserPaidOnStripe ? 
    //   `https://app.lemonsqueezy.com/customer/${faker.string.uuid()}` : null,
    
    paymentProcessorUserId: hasUserPaidOnStripe ? 
      `cus_test_${faker.string.uuid()}` : null, // Stripe customer ID
    // 🔧 CHANGE: Use realistic Stripe customer ID format:
    // paymentProcessorUserId: hasUserPaidOnStripe ? 
    //   `cus_${faker.string.alphanumeric(14)}` : null,
    
    // 💳 PAYMENT HISTORY
    datePaid: hasUserPaidOnStripe ? 
      faker.date.between({ from: createdAt, to: timePaid }) : null,
    // Date of most recent payment
  };
}

// 🔧 TEMPLATE ENHANCEMENT IDEAS:
//
// // Add user profile data
// function generateUserProfile() {
//   return {
//     bio: faker.person.bio(),
//     avatar: faker.image.avatar(),
//     location: faker.location.city(),
//     timezone: faker.date.timeZone(),
//     language: faker.helpers.arrayElement(['en', 'es', 'fr', 'de']),
//   };
// }
//
// // Add user preferences
// function generateUserPreferences() {
//   return {
//     emailNotifications: faker.datatype.boolean(),
//     darkMode: faker.datatype.boolean(),
//     newsletter: faker.datatype.boolean(0.7), // 70% opt-in rate
//   };
// }
//
// // Add business/company data for B2B apps
// function generateCompanyData() {
//   return {
//     companyName: faker.company.name(),
//     companySize: faker.helpers.arrayElement(['1-10', '11-50', '51-200', '200+']),
//     industry: faker.company.buzzNoun(),
//   };
// }

// 🔧 USAGE EXAMPLES:
//
// // Seed database with custom user count
// export async function seedDemoUsers(prismaClient: PrismaClient) {
//   await seedMockUsers(prismaClient, 100); // 100 demo users
// }
//
// // Seed with specific user types
// export async function seedAdminUsers(prismaClient: PrismaClient) {
//   const adminData = generateMockUsersData(5).map(user => ({
//     ...user,
//     isAdmin: true,
//     subscriptionStatus: SubscriptionStatus.ACTIVE
//   }));
//   await Promise.all(adminData.map(data => prismaClient.user.create({ data })));
// }
