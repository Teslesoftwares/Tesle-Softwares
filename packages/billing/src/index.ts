export interface SubscriptionPlan {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  currency: string;
  interval: 'monthly' | 'yearly' | 'one-time';
  features: string[];
  limits?: Record<string, number>;
}
export interface Subscription {
  id: string;
  orgId: string;
  planId: string;
  status: 'active' | 'past_due' | 'canceled' | 'trialing';
  currentPeriodStart: string;
  currentPeriodEnd: string;
  trialEnd?: string;
}
export interface Invoice {
  id: string;
  subscriptionId: string;
  amount: number;
  currency: string;
  status: 'paid' | 'open' | 'overdue' | 'void';
  dueDate: string;
  paidAt?: string;
  lineItems: { description: string; amount: number }[];
}
