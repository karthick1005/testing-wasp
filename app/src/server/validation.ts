// 🔗 FRAMEWORK IMPORTS: Import Wasp framework utilities
import { HttpError } from 'wasp/server';

// 📝 VALIDATION LIBRARY: Import Zod schema validation
import * as z from 'zod';

/**
 * 🛡️ ARGUMENT VALIDATION UTILITY: Type-safe validation for server operations
 * 🔧 TEMPLATE USAGE: Essential for validating API inputs and ensuring data integrity
 * 
 * Key features:
 * - Runtime type validation with Zod schemas
 * - Automatic HTTP error generation for invalid inputs
 * - Type-safe return values with TypeScript inference
 * - Detailed error reporting for debugging
 * - Client-friendly error responses
 * 
 * Benefits:
 * - Prevents invalid data from reaching business logic
 * - Provides clear validation error messages
 * - Ensures API consistency across operations
 * - Type safety at runtime and compile time
 * 
 * Common use cases:
 * - API endpoint input validation
 * - Database operation parameter validation
 * - Form submission validation
 * - External API request validation
 */
export function ensureArgsSchemaOrThrowHttpError<Schema extends z.ZodType>(
  schema: Schema, // 🔧 CHANGE: Define Zod schema for expected input structure
  rawArgs: unknown // Raw input data to validate
): z.infer<Schema> { // Returns typed, validated data
  
  // 🔍 VALIDATION ATTEMPT: Parse input against schema
  const parseResult = schema.safeParse(rawArgs);
  
  // ❌ VALIDATION FAILED: Handle parsing errors
  if (!parseResult.success) {
    // 📝 ERROR LOGGING: Log validation errors for debugging
    console.error('Validation failed:', parseResult.error);
    // 🔧 CHANGE: Enhance logging with context:
    // console.error(`Validation failed for operation:`, { 
    //   schema: schema.description,
    //   errors: parseResult.error.errors,
    //   receivedData: rawArgs 
    // });
    
    // 💥 HTTP ERROR: Throw client-friendly validation error
    throw new HttpError(
      400, // HTTP 400 Bad Request
      'Operation arguments validation failed', // Error message
      { errors: parseResult.error.errors } // Detailed validation errors
    );
    // 🔧 CHANGE: Customize error response:
    // throw new HttpError(400, 'Invalid request data', {
    //   message: 'Please check your input and try again',
    //   validationErrors: parseResult.error.errors,
    //   timestamp: new Date().toISOString()
    // });
    
  } else {
    // ✅ VALIDATION SUCCESS: Return typed, validated data
    return parseResult.data;
  }
}

// 🔧 TEMPLATE USAGE EXAMPLES:
//
// // User creation validation
// const createUserSchema = z.object({
//   email: z.string().email(),
//   password: z.string().min(8),
//   name: z.string().min(1).max(100)
// });
// 
// export const createUser = async (args, context) => {
//   const validatedArgs = ensureArgsSchemaOrThrowHttpError(createUserSchema, args);
//   // validatedArgs is now typed and validated
//   return await createUserInDatabase(validatedArgs);
// };
//
// // Product update validation
// const updateProductSchema = z.object({
//   id: z.string().uuid(),
//   name: z.string().optional(),
//   price: z.number().positive().optional(),
//   category: z.enum(['electronics', 'clothing', 'books']).optional()
// });
//
// export const updateProduct = async (args, context) => {
//   const validatedArgs = ensureArgsSchemaOrThrowHttpError(updateProductSchema, args);
//   return await updateProductInDatabase(validatedArgs);
// };

// 🔧 ENHANCEMENT IDEAS:
// - Add support for nested validation schemas
// - Create validation decorators for automatic validation
// - Implement validation result caching for repeated operations
// - Add custom validation error messages
// - Create validation middleware for automatic application
// - Add sanitization alongside validation
// - Implement field-level validation error mapping
