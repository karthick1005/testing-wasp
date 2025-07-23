/**
 * 🔐 ENVIRONMENT VARIABLE UTILITY: Safely access required environment variables
 * 🔧 TEMPLATE USAGE: Essential utility for server-side configuration management
 * 
 * Key features:
 * - Type-safe environment variable access
 * - Runtime validation of required variables
 * - Clear error messages for missing configuration
 * - Prevents silent failures in production
 * 
 * Common use cases:
 * - Database connection strings
 * - API keys and secrets
 * - External service URLs
 * - Feature flags and configuration
 * 
 * Security considerations:
 * - Never log sensitive environment variables
 * - Use for server-side only (not client-exposed)
 * - Validate format/type after retrieval
 */
export function requireNodeEnvVar(name: string): string {
  // 📍 ENVIRONMENT ACCESS: Retrieve environment variable value
  const value = process.env[name];
  
  // 🚨 VALIDATION: Ensure required variable exists
  if (value === undefined) {
    // 💥 ERROR HANDLING: Throw descriptive error for missing variables
    throw new Error(`Env var ${name} is undefined`);
    // 🔧 CHANGE: Enhance error message with context:
    // throw new Error(`Required environment variable '${name}' is not set. Please check your .env file or deployment configuration.`);
  } else {
    // ✅ SUCCESS: Return validated environment variable
    return value;
  }
}

// 🔧 TEMPLATE USAGE EXAMPLES:
//
// // Database configuration
// const databaseUrl = requireNodeEnvVar('DATABASE_URL');
// const dbPassword = requireNodeEnvVar('DB_PASSWORD');
//
// // API keys
// const stripeSecretKey = requireNodeEnvVar('STRIPE_SECRET_KEY');
// const googleApiKey = requireNodeEnvVar('GOOGLE_API_KEY');
//
// // Service URLs
// const redisUrl = requireNodeEnvVar('REDIS_URL');
// const mailgunDomain = requireNodeEnvVar('MAILGUN_DOMAIN');
//
// // Application settings
// const jwtSecret = requireNodeEnvVar('JWT_SECRET');
// const appEnvironment = requireNodeEnvVar('NODE_ENV');

// 🔧 ENHANCEMENT IDEAS:
// - Add optional environment variable helper with defaults
// - Create typed environment variable schemas with validation
// - Add environment variable existence checking utilities
// - Implement environment-specific configuration loading
// - Add secure environment variable logging (mask sensitive values)
