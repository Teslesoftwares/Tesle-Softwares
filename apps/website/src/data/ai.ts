/**
 * TESLE AI  Data Layer
 *
 * Defines AI capabilities and prompt templates for every product.
 * Each product has 3-4 capabilities with contextual prompts and
 * mock response generators.
 *
 * Backend integration: Replace mock responses with real API calls:
 *   POST /api/v1/ai/generate  → { product, capability, prompt, context }
 *   GET  /api/v1/ai/capabilities → productAICapabilities
 */

import type { LucideIcon } from 'lucide-react';
import {
  Mail, FileText, ClipboardList, BarChart3, TrendingUp, DollarSign,
  ShoppingCart, Truck, Users, Briefcase, Receipt, Landmark,
  Package, CreditCard, Kanban, GraduationCap, HeartPulse, Church,
  Hotel, Brain, Target, Search, Sparkles, Activity, Clock,
  UserPlus, MessageSquare, PieChart, Share2, Calculator,
  AlertTriangle, Lightbulb, BookOpen, Layers,
} from 'lucide-react';

export interface AICapability {
  id: string;
  name: string;
  description: string;
  promptTemplate: string;
  icon: LucideIcon;
  color: string;
  actionLabel: string;
}

export interface ProductAIConfig {
  productSlug: string;
  productName: string;
  capabilities: AICapability[];
  contextHint: string;
}

function cap(id: string, name: string, desc: string, prompt: string, icon: LucideIcon, color: string, actionLabel: string): AICapability {
  return { id, name, description: desc, promptTemplate: prompt, icon, color, actionLabel };
}

export const productAICapabilities: ProductAIConfig[] = [
  {
    productSlug: 'erp',
    productName: 'Tesle ERP',
    contextHint: 'ERP data including finance, supply chain, and operations',
    capabilities: [
      cap('erp-report', 'Generate Business Report', 'Create comprehensive business performance reports', 'Generate a detailed business report covering financial performance, operational efficiency, and key metrics across all departments.', BarChart3, 'from-cyan-500 to-blue-600', 'Generate Report'),
      cap('erp-analyze', 'Analyze Operations', 'Get insights on operational efficiency', 'Analyze our operational data and identify bottlenecks, inefficiencies, and opportunities for improvement across departments.', Activity, 'from-cyan-500 to-blue-600', 'Analyze Operations'),
      cap('erp-forecast', 'Forecast Revenue', 'Predict revenue trends and growth', 'Analyze historical financial data and forecast revenue trends for the next quarter. Highlight growth opportunities and risks.', TrendingUp, 'from-cyan-500 to-blue-600', 'Forecast Revenue'),
      cap('erp-summary', 'Executive Summary', 'Generate executive dashboard summary', 'Create an executive summary of current business performance including revenue, costs, profit margins, and key operational KPIs.', Layers, 'from-cyan-500 to-blue-600', 'Generate Summary'),
    ],
  },
  {
    productSlug: 'crm',
    productName: 'Tesle CRM',
    contextHint: 'CRM data including contacts, deals, and sales pipeline',
    capabilities: [
      cap('crm-email', 'Generate Sales Email', 'Create personalized sales outreach emails', 'Write a professional sales email to a prospect. Include personalization, value proposition, and a clear call to action.', Mail, 'from-emerald-500 to-green-600', 'Generate Email'),
      cap('crm-sentiment', 'Analyze Sentiment', 'Analyze customer sentiment from interactions', 'Analyze recent customer interactions and provide a sentiment analysis report. Highlight positive, neutral, and negative trends.', MessageSquare, 'from-emerald-500 to-green-600', 'Analyze Sentiment'),
      cap('crm-next-actions', 'Suggest Next Actions', 'Get AI recommendations for deals', 'Based on the current sales pipeline, suggest the best next actions for each active deal to maximize close rates.', Target, 'from-emerald-500 to-green-600', 'Suggest Actions'),
      cap('crm-predict', 'Predict Conversion', 'Predict lead conversion probabilities', 'Analyze lead data and predict conversion probabilities. Identify which leads are most likely to convert and suggest prioritization.', TrendingUp, 'from-emerald-500 to-green-600', 'Predict Conversion'),
    ],
  },
  {
    productSlug: 'procurement',
    productName: 'Tesle Procurement',
    contextHint: 'Procurement data including suppliers, purchase orders, and contracts',
    capabilities: [
      cap('proc-rfq', 'Generate RFQ', 'Create request for quotation documents', 'Generate a professional Request for Quotation document including item specifications, quantities, delivery terms, and payment conditions.', ClipboardList, 'from-violet-500 to-purple-600', 'Generate RFQ'),
      cap('proc-compare', 'Compare Quotes', 'Compare supplier quotes side by side', 'Compare the latest supplier quotes and highlight the best options based on price, delivery time, and quality ratings.', Search, 'from-violet-500 to-purple-600', 'Compare Quotes'),
      cap('proc-spend', 'Analyze Spend', 'Analyze procurement spending patterns', 'Analyze procurement spend data and identify cost-saving opportunities, supplier consolidation options, and spending trends.', PieChart, 'from-violet-500 to-purple-600', 'Analyze Spend'),
      cap('proc-contract', 'Summarize Contract', 'Summarize supplier contract terms', 'Summarize the key terms, obligations, and deadlines from supplier contracts in a concise format.', FileText, 'from-violet-500 to-purple-600', 'Summarize Contract'),
    ],
  },
  {
    productSlug: 'hr',
    productName: 'Tesle HR',
    contextHint: 'HR data including employees, job postings, and performance reviews',
    capabilities: [
      cap('hr-jd', 'Generate Job Description', 'Create professional job descriptions', 'Write a detailed job description including role overview, responsibilities, requirements, qualifications, and benefits.', Briefcase, 'from-pink-500 to-rose-600', 'Generate Job Description'),
      cap('hr-offer', 'Draft Offer Letter', 'Generate employment offer letters', 'Generate a professional employment offer letter with salary, benefits, start date, and terms of employment.', FileText, 'from-pink-500 to-rose-600', 'Draft Offer Letter'),
      cap('hr-satisfaction', 'Analyze Satisfaction', 'Analyze employee satisfaction trends', 'Analyze employee feedback and satisfaction survey data. Identify trends, areas of concern, and recommendations for improvement.', Users, 'from-pink-500 to-rose-600', 'Analyze Satisfaction'),
      cap('hr-review', 'Generate Performance Review', 'Create performance review summaries', 'Generate a performance review summary based on employee goals, achievements, and feedback data from the review period.', ClipboardList, 'from-pink-500 to-rose-600', 'Generate Review'),
    ],
  },
  {
    productSlug: 'payroll',
    productName: 'Tesle Payroll',
    contextHint: 'Payroll data including salaries, taxes, and payment history',
    capabilities: [
      cap('payroll-summary', 'Generate Payroll Summary', 'Create payroll period summaries', 'Generate a summary of the latest payroll run including total wages, deductions, taxes, and net pay breakdown.', Receipt, 'from-blue-500 to-indigo-600', 'Generate Summary'),
      cap('payroll-tax', 'Calculate Tax Projections', 'Project tax liabilities and savings', 'Analyze current payroll data and project tax liabilities for the upcoming quarter. Identify potential tax savings opportunities.', Calculator, 'from-blue-500 to-indigo-600', 'Calculate Projections'),
      cap('payroll-anomaly', 'Detect Anomalies', 'Find payroll anomalies and errors', 'Analyze payroll data for anomalies such as unusual overtime patterns, duplicate payments, or unexpected changes in deductions.', AlertTriangle, 'from-blue-500 to-indigo-600', 'Detect Anomalies'),
      cap('payroll-trends', 'Analyze Trends', 'Analyze payroll cost trends', 'Analyze payroll cost trends over time including salary growth, overtime patterns, and department-wise spending.', TrendingUp, 'from-blue-500 to-indigo-600', 'Analyze Trends'),
    ],
  },
  {
    productSlug: 'accounting',
    productName: 'Tesle Accounting',
    contextHint: 'Accounting data including ledgers, financial reports, and transactions',
    capabilities: [
      cap('acct-explain', 'Explain Financial Report', 'Get plain-English explanations of reports', 'Explain the key insights and findings from the latest financial report in simple terms. Include revenue, expenses, profit margins, and cash flow highlights.', Landmark, 'from-amber-500 to-yellow-600', 'Explain Report'),
      cap('acct-journal', 'Generate Journal Entry', 'Create journal entries automatically', 'Generate the appropriate journal entry for the described transaction including debits, credits, and account codes.', FileText, 'from-amber-500 to-yellow-600', 'Generate Entry'),
      cap('acct-reconcile', 'Reconcile Accounts', 'Suggest account reconciliations', 'Analyze account statements and suggest reconciliation matches between ledger entries and bank transactions.', Search, 'from-amber-500 to-yellow-600', 'Reconcile'),
      cap('acct-cashflow', 'Cash Flow Analysis', 'Analyze cash flow trends', 'Analyze cash flow statements and highlight trends, potential shortfalls, and opportunities to improve working capital.', DollarSign, 'from-amber-500 to-yellow-600', 'Analyze Cash Flow'),
    ],
  },
  {
    productSlug: 'inventory',
    productName: 'Tesle Inventory',
    contextHint: 'Inventory data including stock levels, products, and warehouse locations',
    capabilities: [
      cap('inv-predict', 'Predict Stock Shortages', 'Forecast inventory shortages before they happen', 'Analyze inventory levels, sales velocity, and lead times to predict potential stock shortages in the next 30-60 days.', Package, 'from-green-500 to-emerald-600', 'Predict Shortages'),
      cap('inv-optimize', 'Optimize Reorder Points', 'Get optimal reorder point recommendations', 'Calculate optimal reorder points and quantities for each product based on historical demand, lead time variability, and carrying costs.', Target, 'from-green-500 to-emerald-600', 'Optimize Reorder'),
      cap('inv-turnover', 'Analyze Turnover', 'Analyze inventory turnover rates', 'Analyze inventory turnover rates and identify slow-moving items, dead stock risks, and opportunities to optimize carrying costs.', BarChart3, 'from-green-500 to-emerald-600', 'Analyze Turnover'),
      cap('inv-valuation', 'Valuation Report', 'Generate inventory valuation report', 'Generate an inventory valuation report including cost of goods sold, current stock value, and valuation method analysis (FIFO/LIFO/Weighted Average).', DollarSign, 'from-green-500 to-emerald-600', 'Generate Valuation'),
    ],
  },
  {
    productSlug: 'pos',
    productName: 'Tesle POS',
    contextHint: 'POS data including sales transactions, customers, and products',
    capabilities: [
      cap('pos-sales', 'Generate Sales Report', 'Create daily/weekly sales reports', 'Generate a detailed sales report for the specified period including total revenue, transaction count, average order value, and payment method breakdown.', CreditCard, 'from-sky-500 to-cyan-600', 'Generate Report'),
      cap('pos-peak', 'Analyze Peak Hours', 'Identify peak business hours', 'Analyze transaction timestamps to identify peak business hours, slow periods, and opportunities for staffing optimization.', Clock, 'from-sky-500 to-cyan-600', 'Analyze Hours'),
      cap('pos-pricing', 'Recommend Pricing', 'Get AI pricing recommendations', 'Analyze sales data and suggest optimal pricing strategies including bundle deals, volume discounts, and promotional pricing.', DollarSign, 'from-sky-500 to-cyan-600', 'Recommend Pricing'),
      cap('pos-products', 'Top Products Analysis', 'Analyze top-selling products', 'Identify top-selling products, underperformers, and cross-selling opportunities based on transaction data.', TrendingUp, 'from-sky-500 to-cyan-600', 'Analyze Products'),
    ],
  },
  {
    productSlug: 'projects',
    productName: 'Tesle Projects',
    contextHint: 'Project data including tasks, timelines, milestones, and resources',
    capabilities: [
      cap('proj-brief', 'Generate Project Brief', 'Create comprehensive project briefs', 'Generate a detailed project brief including scope, objectives, deliverables, timeline, resource requirements, and success criteria.', Kanban, 'from-red-500 to-orange-600', 'Generate Brief'),
      cap('proj-risks', 'Analyze Timeline Risks', 'Identify project timeline risks', 'Analyze project timeline data and identify potential delays, resource conflicts, and dependencies that could impact delivery dates.', AlertTriangle, 'from-red-500 to-orange-600', 'Analyze Risks'),
      cap('proj-resources', 'Suggest Resource Allocation', 'Get optimal resource allocation', 'Analyze current resource allocation across projects and suggest optimizations to balance workload and improve delivery speed.', Users, 'from-red-500 to-orange-600', 'Optimize Resources'),
      cap('proj-status', 'Status Report', 'Generate project status report', 'Generate a comprehensive project status report including progress against milestones, budget utilization, risks, and next steps.', FileText, 'from-red-500 to-orange-600', 'Generate Report'),
    ],
  },
  {
    productSlug: 'school',
    productName: 'Tesle School',
    contextHint: 'School data including students, classes, grades, and attendance',
    capabilities: [
      cap('school-comments', 'Generate Report Comments', 'Create personalized student report comments', 'Write personalized, constructive report card comments for students based on their performance, behavior, and participation data.', GraduationCap, 'from-teal-500 to-cyan-600', 'Generate Comments'),
      cap('school-lesson', 'Create Lesson Plan', 'Generate AI-powered lesson plans', 'Create a detailed lesson plan including learning objectives, activities, assessment methods, and differentiation strategies.', BookOpen, 'from-teal-500 to-cyan-600', 'Create Lesson Plan'),
      cap('school-performance', 'Analyze Performance', 'Analyze student performance trends', 'Analyze student performance data across subjects and identify trends, at-risk students, and areas needing curriculum improvement.', BarChart3, 'from-teal-500 to-cyan-600', 'Analyze Performance'),
      cap('school-attendance', 'Attendance Insights', 'Get attendance pattern insights', 'Analyze attendance data and identify patterns, chronic absenteeism risks, and recommendations for improvement.', Activity, 'from-teal-500 to-cyan-600', 'Get Insights'),
    ],
  },
  {
    productSlug: 'hospital',
    productName: 'Tesle Hospital',
    contextHint: 'Hospital data including patients, treatments, and clinical records',
    capabilities: [
      cap('hospital-summary', 'Generate Patient Summary', 'Create concise patient summaries', 'Generate a concise patient summary including medical history, current diagnosis, ongoing treatments, medications, and care plan.', HeartPulse, 'from-red-500 to-pink-600', 'Generate Summary'),
      cap('hospital-treatment', 'Suggest Treatment Plan', 'Get AI-assisted treatment suggestions', 'Based on patient symptoms and history, suggest evidence-based treatment options and care pathways for consideration.', Lightbulb, 'from-red-500 to-pink-600', 'Suggest Plan'),
      cap('hospital-clinical', 'Analyze Clinical Data', 'Analyze clinical data patterns', 'Analyze clinical data to identify patterns in patient outcomes, treatment efficacy, and potential areas for clinical improvement.', TrendingUp, 'from-red-500 to-pink-600', 'Analyze Data'),
      cap('hospital-discharge', 'Discharge Summary', 'Generate discharge summary', 'Generate a comprehensive discharge summary including admission details, treatment provided, discharge instructions, and follow-up plan.', FileText, 'from-red-500 to-pink-600', 'Generate Summary'),
    ],
  },
  {
    productSlug: 'church',
    productName: 'Tesle Church',
    contextHint: 'Church data including members, attendance, contributions, and events',
    capabilities: [
      cap('church-attendance', 'Attendance Insights', 'Analyze attendance trends and patterns', 'Analyze attendance data across services and events. Identify growth trends, seasonal patterns, and opportunities for engagement.', Church, 'from-purple-500 to-violet-600', 'Get Insights'),
      cap('church-sermon', 'Sermon Notes', 'Generate sermon outlines and notes', 'Generate a structured sermon outline with key themes, scripture references, discussion questions, and application points.', BookOpen, 'from-purple-500 to-violet-600', 'Generate Notes'),
      cap('church-members', 'Membership Trends', 'Analyze membership growth trends', 'Analyze membership data including new members, engagement levels, and retention rates. Identify growth opportunities.', Users, 'from-purple-500 to-violet-600', 'Analyze Trends'),
      cap('church-giving', 'Giving Analysis', 'Analyze giving and contribution patterns', 'Analyze contribution data and identify giving trends, seasonal patterns, and opportunities for stewardship communication.', DollarSign, 'from-purple-500 to-violet-600', 'Analyze Giving'),
    ],
  },
  {
    productSlug: 'hotel',
    productName: 'Tesle Hotel',
    contextHint: 'Hotel data including reservations, guests, rooms, and housekeeping',
    capabilities: [
      cap('hotel-insights', 'Reservation Insights', 'Analyze booking patterns and trends', 'Analyze reservation data to identify booking trends, peak seasons, guest preferences, and opportunities to increase occupancy.', Hotel, 'from-indigo-500 to-blue-600', 'Get Insights'),
      cap('hotel-pricing', 'Optimize Room Pricing', 'Get dynamic pricing recommendations', 'Analyze occupancy rates, competitor pricing, and seasonal demand to suggest optimal room pricing strategies.', DollarSign, 'from-indigo-500 to-blue-600', 'Optimize Pricing'),
      cap('hotel-feedback', 'Analyze Guest Feedback', 'Analyze guest reviews and feedback', 'Analyze guest feedback and reviews to identify common themes, satisfaction drivers, and areas for improvement.', MessageSquare, 'from-indigo-500 to-blue-600', 'Analyze Feedback'),
      cap('hotel-housekeeping', 'Housekeeping Schedule', 'Optimize housekeeping assignments', 'Analyze occupancy data and suggest optimal housekeeping schedules and staff assignments to improve turnaround time.', Clock, 'from-indigo-500 to-blue-600', 'Optimize Schedule'),
    ],
  },
  {
    productSlug: 'logistics',
    productName: 'Tesle Logistics',
    contextHint: 'Logistics data including shipments, routes, fleet, and deliveries',
    capabilities: [
      cap('logi-routes', 'Optimize Delivery Routes', 'Get optimal route recommendations', 'Analyze delivery addresses, traffic patterns, and shipment volumes to suggest optimal delivery routes that minimize time and fuel costs.', Truck, 'from-orange-500 to-amber-600', 'Optimize Routes'),
      cap('logi-delays', 'Predict Delivery Delays', 'Forecast potential delivery delays', 'Analyze shipment data, weather conditions, and historical performance to predict potential delivery delays and suggest mitigations.', Clock, 'from-orange-500 to-amber-600', 'Predict Delays'),
      cap('logi-fleet', 'Analyze Fleet Efficiency', 'Evaluate fleet performance metrics', 'Analyze fleet utilization data including fuel efficiency, maintenance schedules, driver performance, and cost per mile.', Activity, 'from-orange-500 to-amber-600', 'Analyze Fleet'),
      cap('logi-cost', 'Cost Optimization', 'Find logistics cost savings', 'Analyze logistics costs across transportation, warehousing, and handling. Identify cost-saving opportunities and efficiency improvements.', DollarSign, 'from-orange-500 to-amber-600', 'Optimize Costs'),
    ],
  },
  {
    productSlug: 'ai',
    productName: 'Tesle AI',
    contextHint: 'AI platform data including models, training data, and inference logs',
    capabilities: [
      cap('ai-model', 'Generate Model Spec', 'Create AI model specification documents', 'Generate a detailed AI model specification including architecture, training data requirements, evaluation metrics, and deployment considerations.', Brain, 'from-fuchsia-500 to-purple-600', 'Generate Spec'),
      cap('ai-data', 'Analyze Training Data', 'Evaluate training data quality and coverage', 'Analyze training dataset quality including class balance, data distribution, missing values, and recommendations for improvement.', Layers, 'from-fuchsia-500 to-purple-600', 'Analyze Data'),
      cap('ai-hyperparameters', 'Suggest Hyperparameters', 'Get hyperparameter tuning recommendations', 'Based on model architecture and dataset characteristics, suggest optimal hyperparameters including learning rate, batch size, and regularization.', Target, 'from-fuchsia-500 to-purple-600', 'Suggest Params'),
      cap('ai-pipeline', 'Optimize Pipeline', 'Suggest ML pipeline optimizations', 'Analyze the current ML pipeline and suggest optimizations for data preprocessing, feature engineering, model training, and deployment.', Share2, 'from-fuchsia-500 to-purple-600', 'Optimize Pipeline'),
    ],
  },
];

export function getAICapabilities(productSlug: string): AICapability[] {
  return productAICapabilities.find((p) => p.productSlug === productSlug)?.capabilities ?? [];
}

export function getProductAIConfig(productSlug: string): ProductAIConfig | undefined {
  return productAICapabilities.find((p) => p.productSlug === productSlug);
}

export function getAllCapabilityIds(): string[] {
  return productAICapabilities.flatMap((p) => p.capabilities.map((c) => c.id));
}

export function getCapabilityById(id: string): AICapability | undefined {
  for (const product of productAICapabilities) {
    const found = product.capabilities.find((c) => c.id === id);
    if (found) return found;
  }
  return undefined;
}

export interface AIMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  capabilityId?: string;
  timestamp: number;
}

let messageCounter = 0;
export function createUserMessage(content: string, capabilityId?: string): AIMessage {
  return { id: `msg_${++messageCounter}`, role: 'user', content, capabilityId, timestamp: Date.now() };
}
export function createAssistantMessage(content: string, capabilityId?: string): AIMessage {
  return { id: `msg_${++messageCounter}`, role: 'assistant', content, capabilityId, timestamp: Date.now() };
}

const mockResponses: Record<string, string[]> = {
  'erp-report': [
    '## Quarterly Business Performance Report\n\n**Executive Summary:**\nQ2 2026 shows strong performance across all key metrics. Revenue grew 18.4% YoY to $4.2M, gross margin improved to 72.3%, and operational efficiency scored 94/100.\n\n**Key Highlights:**\n- **Revenue:** $4,238,500 (+18.4% YoY)\n- **Gross Margin:** 72.3% (+3.1pp)\n- **Operating Expenses:** $1,892,400 (+8.2%)\n- **Net Profit:** $1,146,200 (+22.7%)\n- **Cash Flow:** $892,400 positive\n\n**Recommendations:**\n1. Increase R&D investment in AI capabilities\n2. Optimize supply chain costs to improve margins further\n3. Expand into 2 new markets in West Africa',
  ],
  'erp-analyze': [
    '## Operational Analysis Results\n\n**Overall Efficiency Score: 87/100**\n\n**Department Analysis:**\n- **Finance:** 92/100  Strong, automated processes working well\n- **Supply Chain:** 78/100  Inventory holding costs are 12% above target\n- **HR:** 85/100  Hiring cycle time improved but retention needs attention\n- **Operations:** 90/100  Production efficiency at 94%\n\n**Bottlenecks Identified:**\n1. **Procurement-to-Pay cycle** averaging 18 days (target: 12)\n2. **Inventory reconciliation** takes 3 days due to manual processes\n3. **Cross-department data silos** in sales forecasting\n\n**Recommended Actions:**\n- Automate procurement approval workflows\n- Implement real-time inventory tracking\n- Deploy integrated sales forecasting across departments',
  ],
  'crm-email': [
    '## Generated Sales Email\n\n**Subject:** Helping [Company Name] Streamline Operations\n\nHi [Prospect Name],\n\nI hope this message finds you well. I noticed that [Company Name] has been growing rapidly, and I wanted to share how Tesle ERP has helped similar businesses streamline their operations while cutting costs by an average of 23%.\n\nWith Tesle, you get:\n- **Unified platform** connecting finance, HR, inventory, and sales\n- **AI-powered automation** that reduces manual work by 40%\n- **Real-time analytics** for data-driven decisions\n\nWould you be open to a 15-minute call this week to explore if Tesle is a good fit?\n\nBest regards,\n[Your Name]\n\n---\n*Personalization tip: Mention a specific challenge their industry faces based on your research.*',
  ],
  'crm-sentiment': [
    '## Customer Sentiment Analysis\n\n**Overall Sentiment Score: 78/100 (Positive)**\n\n**Distribution:**\n- 😊 Positive: 62%\n- 😐 Neutral: 28%\n- 😟 Negative: 10%\n\n**Key Themes:**\n- **Product Quality:** 4.5/5  Consistently praised\n- **Customer Support:** 4.2/5  Response time improved\n- **Pricing:** 3.8/5  Some concerns about premium tier\n- **Onboarding:** 4.0/5  Documentation needs improvement\n\n**Trending Topics (Last 30 Days):**\n1. Integration capabilities (+15% mentions)\n2. Mobile app experience (+8%)\n3. API documentation requests\n\n**Action Items:**\n- Address pricing concerns in customer communication\n- Improve onboarding documentation with video tutorials\n- Highlight integration success stories',
  ],
  'proc-rfq': [
    '## Request for Quotation\n\n**RFQ-2026-{NUMBER}**\n\n**Date:** {current_date}\n\n**To:** [Supplier Name]\n\n**Subject:** Request for Quotation  [Product Category]\n\nDear Supplier,\n\nWe invite you to submit a quotation for the following items:\n\n| # | Item Description | Quantity | Unit | Delivery Required |\n|---|-----------------|----------|------|-------------------|\n| 1 | [Item Name] | [Qty] | [Unit] | [Date] |\n| 2 | [Item Name] | [Qty] | [Unit] | [Date] |\n\n**Terms & Conditions:**\n- **Delivery:** FOB [Location]\n- **Payment:** Net 30 days\n- **Validity:** Quote valid for 14 days\n- **Warranty:** Minimum 12 months\n\nPlease submit your quotation by [Deadline].\n\nRegards,\nProcurement Department\nTesle Technologies',
  ],
  'proc-compare': [
    '## Supplier Quote Comparison\n\n**Category:** Office Equipment & Supplies\n\n| Criteria | Supplier A | Supplier B | Supplier C |\n|----------|-----------|-----------|-----------|\n| **Price** | $12,450 | $11,800 ✅ | $13,200 |\n| **Delivery** | 5-7 days ✅ | 7-10 days | 4-6 days ✅ |\n| **Quality Rating** | 4.5/5 | 4.2/5 | 4.8/5 ✅ |\n| **Warranty** | 24 months ✅ | 12 months | 18 months |\n| **Payment Terms** | Net 30 | Net 45 ✅ | Net 15 |\n\n**⭐ Recommendation:** Supplier B offers the best value with the lowest price and favorable payment terms. However, if quality is your top priority and budget allows, Supplier C is the premium choice.\n\n**Estimated Savings vs Budget:** $1,200 (9.2%)',
  ],
  'hr-jd': [
    '## Job Description: Senior Software Engineer\n\n**Location:** Remote / Accra, Ghana\n**Type:** Full-time\n**Department:** Engineering\n\n### About the Role\nWe are looking for a Senior Software Engineer to join our growing team. You will architect and build scalable systems that power our enterprise SaaS platform.\n\n### Responsibilities\n- Design, build, and maintain high-performance backend services\n- Collaborate with product managers and designers on feature development\n- Mentor junior engineers and conduct code reviews\n- Participate in architecture decisions and technical planning\n- Write comprehensive tests and documentation\n\n### Requirements\n- 5+ years of experience in software development\n- Strong proficiency in TypeScript/Node.js and React\n- Experience with PostgreSQL, Redis, and cloud platforms (AWS/GCP)\n- Understanding of microservices architecture and RESTful APIs\n- Excellent problem-solving and communication skills\n\n### Benefits\n- Competitive salary + equity package\n- Flexible remote work policy\n- Health insurance and wellness benefits\n- Annual learning & development budget\n- 25 days paid time off',
  ],
  'acct-explain': [
    '## Financial Report Explained\n\nHere\'s what your latest financial report is telling you:\n\n### Revenue\nTotal revenue of **$4.2M** is up 18.4% from last quarter  driven primarily by new enterprise clients in the healthcare sector.\n\n### Expenses\nOperating expenses of **$1.89M** increased 8.2%, mainly due to:\n- R&D investment (+15%) in AI capabilities\n- Sales team expansion (+12%)\n- Cloud infrastructure costs (+22%  scalable with growth)\n\n### Profitability\n**Net profit margin of 27%** is healthy and above industry average (18-22%).\n\n### Cash Flow\nPositive operating cash flow of **$892K** indicates strong business fundamentals.\n\n### Red Flags 🚩\n- Accounts receivable aging: 15% over 60 days (up from 10%)\n- Cost of goods sold increasing faster than revenue\n\n### Recommendations\n1. Implement stricter payment terms for overdue accounts\n2. Review supplier contracts to negotiate better rates\n3. Consider hedging against currency fluctuations for international transactions',
  ],
  'inv-predict': [
    '## Stock Shortage Prediction Report\n\n**Risk Period: Next 30 Days**\n\n| Product | Current Stock | Daily Usage | Days Remaining | Risk Level |\n|---------|-------------|-------------|----------------|------------|\n| Widget Pro X1 | 240 | 28 | 8.6 | 🔴 Critical |\n| Component A-200 | 580 | 22 | 26.4 | 🟡 Moderate |\n| Raw Material B5 | 1,200 | 15 | 80.0 | 🟢 Low |\n| Packaging Type C | 340 | 35 | 9.7 | 🔴 Critical |\n\n### Critical Alerts ⚠️\n1. **Widget Pro X1**  Will run out in 8 days. Place reorder immediately.\n2. **Packaging Type C**  Only 9 days of stock remaining. Lead time is 14 days.\n\n### Recommended Actions\n- Place urgent reorder for Widget Pro X1 (min 500 units)\n- Increase safety stock for Packaging Type C from 7 to 14 days\n- Review supplier lead times for Component A-200 to avoid escalation',
  ],
  'pos-sales': [
    '## Daily Sales Report\n\n**Date:** {current_date}\n\n| Metric | Value | vs Target |\n|--------|-------|-----------|\n| **Total Revenue** | $8,450 | +12.3% ✅ |\n| **Transactions** | 142 | +8.4% |\n| **Avg Order Value** | $59.50 | +3.6% |\n| **Items Sold** | 387 | +15.2% |\n\n### Payment Breakdown\n- 💳 Card: 58% ($4,901)\n- 📱 Mobile Money: 32% ($2,704)\n- 💵 Cash: 10% ($845)\n\n### Peak Hours\n- **Busiest:** 12:00-14:00 (34 transactions)\n- **Second Peak:** 17:00-19:00 (28 transactions)\n\n### Top Products Today\n1. Premium Coffee Blend  42 units\n2. Breakfast Sandwich  38 units\n3. Fresh Juice  31 units',
  ],
  'school-comments': [
    '## Student Report Comments\n\n### Ama Serwaa  Mathematics\n*Ama has shown remarkable improvement this term. Her grasp of algebraic concepts has strengthened significantly, and she consistently demonstrates problem-solving skills. She actively participates in class discussions and helps peers understand challenging topics. To continue growing, I encourage Ama to tackle more advanced problems independently and explore math competitions.*\n\n### Kofi Mensah  English Language\n*Kofi is a creative writer with a vivid imagination. His essays show strong narrative structure and rich vocabulary. This term, he has worked hard on grammar consistency and has made noticeable progress. I encourage Kofi to read more diverse literature to expand his perspective and continue developing his analytical writing skills.*\n\n### Adwoa Boateng  Science\n*Adwoa displays natural curiosity and enthusiasm in science class. She asks insightful questions and excels during hands-on experiments. Her lab reports are thorough and well-organized. To reach her full potential, Adwoa should focus on connecting theoretical concepts to experimental observations more consistently.*',
  ],
  'hospital-summary': [
    '## Patient Summary\n\n**Patient:** John Mensah\n**DOB:** 15/03/1978 (48 yrs)\n**MRN:** TES-2024-08421\n**Admitted:** 28/06/2026\n\n### Current Diagnosis\n- Acute exacerbation of chronic obstructive pulmonary disease (COPD)\n- Type 2 diabetes mellitus (poorly controlled)\n- Hypertension\n\n### Vitals (Last 24h)\n| Vital | Value | Status |\n|-------|-------|--------|\n| BP | 145/92 | ⚠️ Elevated |\n| HR | 88 bpm | ✅ Normal |\n| SpO2 | 94% | ⚠️ On 2L O2 |\n| Temp | 37.2°C | ✅ Normal |\n\n### Medications\n1. Salbutamol nebulizer 5mg QID\n2. Metformin 1000mg BID\n3. Lisinopril 10mg daily\n\n### Care Plan\n- Continue respiratory therapy\n- Monitor blood glucose 4x daily\n- Endocrine consult for diabetes management\n- Chest physiotherapy daily\n- Target discharge: 03/07/2026',
  ],
  'church-attendance': [
    '## Attendance Insights  Q2 2026\n\n### Overview\n- **Average Weekly Attendance:** 847 (+12% vs Q1)\n- **Total First-Time Visitors:** 124 (+28%)\n- **Member Retention Rate:** 91%\n\n### Service Trends\n| Service | Avg Attendance | Trend |\n|---------|---------------|-------|\n| Sunday 1st Service | 312 | 📈 +8% |\n| Sunday 2nd Service | 428 | 📈 +15% |\n| Wednesday Bible Study | 107 | 📈 +5% |\n\n### Insights 💡\n1. **Growth driver:** New community outreach programs are attracting young families\n2. **Opportunity:** Wednesday attendance has room to grow  consider childcare options\n3. **Seasonal pattern:** Expect 15-20% dip during August (holiday season)\n\n### Recommendations\n- Launch a "Next Steps" program for first-time visitors\n- Consider adding a Saturday evening service to accommodate demand\n- Develop a digital engagement strategy for members who travel during holidays',
  ],
  'hotel-insights': [
    '## Reservation Insights  June 2026\n\n### Performance Metrics\n- **Occupancy Rate:** 78% (+5% vs last year)\n- **Average Daily Rate (ADR):** $245 (+8%)\n- **Revenue Per Available Room (RevPAR):** $191 (+12%)\n- **Average Length of Stay:** 3.2 nights\n\n### Booking Trends\n| Channel | Bookings | % of Total |\n|---------|----------|------------|\n| Direct Website | 182 | 38% |\n| Booking.com | 124 | 26% |\n| Expedia | 96 | 20% |\n| Corporate | 48 | 10% |\n| Walk-in | 29 | 6% |\n\n### Guest Preferences\n- **Room Type:** Deluxe Suites are most popular (42% of bookings)\n- **Amenities:** Pool access (+35%), Spa services (+28%)\n- **Dietary:** 24% of guests request vegetarian/vegan options\n\n### Recommendations\n- Increase direct booking incentives to reduce OTA commissions\n- Consider renovating standard rooms to capture more premium bookings',
  ],
  'logi-routes': [
    '## Optimized Delivery Routes\n\n### Route Optimization Results\n**Optimization Target:** Minimize total distance and delivery time\n**Fleet:** 12 vehicles\n**Deliveries Today:** 86 stops\n\n### Recommended Routes\n\n**Route A  Accra Central (12 stops)**\n- Total Distance: 38 km (was 52 km)  **27% reduction**\n- Estimated Time: 2.5 hrs\n- Fuel Cost: ~$18\n- Driver: Assigned to Kofi\n\n**Route B  Tema Industrial (8 stops)**\n- Total Distance: 64 km (was 88 km)  **27% reduction**\n- Estimated Time: 3.2 hrs\n- Fuel Cost: ~$29\n- Driver: Assigned to Ama\n\n### Summary Savings\n- **Total Distance:** 412 km → 298 km (-27.7%)\n- **Fuel Cost:** $184 → $133 (-27.7%)\n- **Time:** 26.5 hrs → 19.8 hrs (-25.3%)\n- **CO₂ Emissions:** 115 kg → 83 kg (-27.7%)',
  ],
  'ai-model': [
    '## AI Model Specification\n\n### Model Overview\n- **Name:** Tesle Intent Classifier v2\n- **Type:** Multi-class text classification\n- **Architecture:** Transformer-based (BERT-base)\n\n### Training Configuration\n| Parameter | Value |\n|-----------|-------|\n| **Base Model** | bert-base-uncased |\n| **Max Sequence Length** | 128 tokens |\n| **Batch Size** | 32 |\n| **Learning Rate** | 2e-5 |\n| **Warmup Steps** | 500 |\n| **Epochs** | 5 |\n| **Optimizer** | AdamW |\n| **Weight Decay** | 0.01 |\n\n### Dataset Requirements\n- **Minimum samples:** 10,000 per class\n- **Train/Val/Test Split:** 80/10/10\n- **Label Balance:** Stratified sampling recommended\n\n### Evaluation Metrics\n- **Accuracy:** Target ≥ 92%\n- **F1 Score:** Target ≥ 0.90\n- **Latency:** < 100ms per prediction\n- **Throughput:** ≥ 100 req/s on 1 GPU',
  ],
};

export function generateMockResponse(capabilityId: string, _userMessage: string): string {
  const responses = mockResponses[capabilityId];
  if (!responses || responses.length === 0) {
    return `I've analyzed your request regarding **${capabilityId}**. Based on the available data, here are the key findings:\n\n1. Your data shows normal patterns with some areas for optimization\n2. I recommend reviewing the metrics regularly for better insights\n3. Set up automated alerts to stay informed about significant changes\n\nWould you like me to dive deeper into any specific aspect?`;
  }
  return responses[Math.floor(Math.random() * responses.length)];
}
