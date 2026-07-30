export interface AnalyticsEvent {
  id?: string;
  event: string;
  properties?: Record<string, unknown>;
  userId?: string;
  orgId?: string;
  timestamp?: string;
}
export interface AnalyticsMetric {
  label: string;
  value: number | string;
  change?: string;
  trend?: 'up' | 'down' | 'neutral';
  period?: string;
}
export interface AnalyticsDashboard {
  id: string;
  name: string;
  metrics: AnalyticsMetric[];
  widgets?: string[];
}
