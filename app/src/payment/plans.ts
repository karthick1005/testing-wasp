// 🔧 VALIDATION: Import Zod for type-safe environment variable validation
import * as z from 'zod';
// 🛠️ UTILITIES: Import server utility functions
import { requireNodeEnvVar } from '../server/utils';

/**
 * 📊 SUBSCRIPTION STATUS ENUM: Possible subscription states
 * 🔧 TEMPLATE USAGE: These status values are used throughout the app for subscription logic
 * Values match common payment provider status names (Stripe, LemonSqueezy)
 */
export enum SubscriptionStatus {
  PastDue = 'past_due', // 🔧 Payment failed, subscription at risk
  CancelAtPeriodEnd = 'cancel_at_period_end', // 🔧 Cancelled but still active until period end
  Active = 'active', // 🔧 Currently active and paid subscription
  Deleted = 'deleted', // 🔧 Subscription completely terminated
}

/**
 * 💳 PAYMENT PLAN IDS: Unique identifiers for each pricing plan
 * 🔧 TEMPLATE USAGE: Add/remove/modify plans here to change your pricing structure
 * These IDs should match your payment processor product/plan IDs
 */
export enum PaymentPlanId {
  Hobby = 'hobby', // 🔧 CHANGE: Basic/starter plan identifier
  Pro = 'pro', // 🔧 CHANGE: Professional/premium plan identifier  
  Credits10 = 'credits10', // 🔧 CHANGE: Credit-based plan identifier
}

/**
 * 🎯 PAYMENT PLAN INTERFACE: Structure for payment plan configuration
 * 🔧 TEMPLATE USAGE: Defines how each plan behaves in your payment system
 */
export interface PaymentPlan {
  // 🔗 PAYMENT PROCESSOR INTEGRATION: Get the actual plan ID from your payment provider
  // E.g. Stripe Price ID, LemonSqueezy Variant ID, etc.
  getPaymentProcessorPlanId: () => string;
  // 💰 PLAN EFFECT: What happens when user purchases this plan
  effect: PaymentPlanEffect;
}

/**
 * ⚡ PAYMENT PLAN EFFECTS: Different types of plan outcomes
 * 🔧 TEMPLATE USAGE: Define what each plan grants the user
 */
export type PaymentPlanEffect = 
  | { kind: 'subscription' } // 🔧 Recurring subscription with ongoing access
  | { kind: 'credits'; amount: number }; // 🔧 One-time credit purchase

/**
 * 🎨 PAYMENT PLANS CONFIGURATION: Map each plan ID to its configuration
 * 🔧 TEMPLATE USAGE: Main configuration for your pricing plans
 * Important: Environment variables must match your payment processor setup
 */
export const paymentPlans: Record<PaymentPlanId, PaymentPlan> = {
  // 🏠 HOBBY PLAN: Entry-level subscription plan
  [PaymentPlanId.Hobby]: {
    // 🔧 CHANGE: Set environment variable PAYMENTS_HOBBY_SUBSCRIPTION_PLAN_ID
    getPaymentProcessorPlanId: () => requireNodeEnvVar('PAYMENTS_HOBBY_SUBSCRIPTION_PLAN_ID'),
    effect: { kind: 'subscription' }, // Grants subscription access
  },
  // 🚀 PRO PLAN: Professional subscription plan
  [PaymentPlanId.Pro]: {
    // 🔧 CHANGE: Set environment variable PAYMENTS_PRO_SUBSCRIPTION_PLAN_ID
    getPaymentProcessorPlanId: () => requireNodeEnvVar('PAYMENTS_PRO_SUBSCRIPTION_PLAN_ID'),
    effect: { kind: 'subscription' }, // Grants subscription access
  },
  // 💰 CREDITS PLAN: One-time credit purchase
  [PaymentPlanId.Credits10]: {
    // 🔧 CHANGE: Set environment variable PAYMENTS_CREDITS_10_PLAN_ID
    getPaymentProcessorPlanId: () => requireNodeEnvVar('PAYMENTS_CREDITS_10_PLAN_ID'),
    effect: { kind: 'credits', amount: 10 }, // Grants 10 credits to user account
  },
};

/**
 * 🏷️ PLAN NAME FORMATTER: Convert plan IDs to human-readable names
 * 🔧 TEMPLATE USAGE: Used in UI to display plan names consistently
 */
export function prettyPaymentPlanName(planId: PaymentPlanId): string {
  const planToName: Record<PaymentPlanId, string> = {
    [PaymentPlanId.Hobby]: 'Hobby', // 🔧 CHANGE: Display name for hobby plan
    [PaymentPlanId.Pro]: 'Pro', // 🔧 CHANGE: Display name for pro plan
    [PaymentPlanId.Credits10]: '10 Credits', // 🔧 CHANGE: Display name for credits plan
  };
  return planToName[planId];
}

/**
 * ✅ PLAN ID VALIDATOR: Parse and validate payment plan IDs
 * 🔧 TEMPLATE USAGE: Used to safely parse plan IDs from external sources
 * Throws error for invalid plan IDs to prevent runtime issues
 */
export function parsePaymentPlanId(planId: string): PaymentPlanId {
  if ((Object.values(PaymentPlanId) as string[]).includes(planId)) {
    return planId as PaymentPlanId;
  } else {
    throw new Error(`Invalid PaymentPlanId: ${planId}`);
    // 🔧 CHANGE: Customize error message if needed
  }
}

/**
 * 🔍 SUBSCRIPTION FILTER: Get only subscription-based payment plans
 * 🔧 TEMPLATE USAGE: Filter plans for subscription-only features
 * Excludes one-time purchase plans (like credits)
 */
export function getSubscriptionPaymentPlanIds(): PaymentPlanId[] {
  return Object.values(PaymentPlanId).filter((planId) => paymentPlans[planId].effect.kind === 'subscription');
}
