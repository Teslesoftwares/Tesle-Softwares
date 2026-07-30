import {
  HeartPulse, GraduationCap, HardHat, Landmark, ShoppingBag, Factory,
  Hotel, HeartHandshake, Church, Building2, Truck, Home,
  type LucideIcon,
} from 'lucide-react';

export interface IndustryCaseStudy {
  company: string;
  title: string;
  results: string[];
  quote: string;
  author: string;
  role: string;
}

export interface IndustrySolution {
  title: string;
  description: string;
  icon: LucideIcon;
}

export interface IndustryProduct {
  name: string;
  slug: string;
}

export interface IndustryData {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  icon: LucideIcon;
  color: string;
  heroTitle: string;
  heroSubtitle: string;
  challenges: string[];
  solutions: IndustrySolution[];
  relevantProducts: IndustryProduct[];
  caseStudy: IndustryCaseStudy;
}

export const industries: IndustryData[] = [
  {
    slug: 'healthcare',
    name: 'Healthcare',
    tagline: 'Better patient outcomes. Simplified operations.',
    description: 'Hospital management, EHR, billing, pharmacy, and lab management for healthcare organisations of every size.',
    icon: HeartPulse,
    color: 'from-red-500 to-pink-600',
    heroTitle: 'Healthcare, digitally unified',
    heroSubtitle: 'Tesle for Healthcare digitises every aspect of care delivery  patient records, appointments, pharmacy, laboratory, billing, and compliance  on one integrated platform.',
    challenges: [
      'Fragmented systems across clinical, administrative, and financial operations create inefficiencies and data silos.',
      'Manual appointment scheduling, billing, and record-keeping consume staff time and lead to errors.',
      'Compliance with health data regulations (NDPR, HIPAA) requires robust security and audit capabilities.',
      'Limited visibility into hospital performance metrics makes strategic planning and resource allocation difficult.',
    ],
    solutions: [
      { title: 'Unified Patient Records', description: 'Digital EHR with complete patient history, medications, allergies, lab results, and imaging accessible at the point of care.', icon: HeartPulse },
      { title: 'Automated Workflows', description: 'Appointment reminders, prescription refill alerts, billing automation, and lab order routing reduce administrative overhead.', icon: GraduationCap },
      { title: 'Pharmacy & Inventory', description: 'Drug inventory management with expiry tracking, dispensing workflows, and auto-reorder to prevent stockouts.', icon: ShoppingBag },
      { title: 'Billing & Insurance', description: 'Service billing, HMO capitation management, insurance claim processing, and revenue analytics with integrated payment gateways.', icon: Landmark },
      { title: 'Operational Analytics', description: 'Real-time dashboards for bed occupancy, wait times, revenue, patient demographics, and clinical outcomes.', icon: Factory },
      { title: 'Compliance & Security', description: 'Role-based access, audit trails, data encryption, and regulatory reporting tools for NDPR, HIPAA, and health ministry requirements.', icon: Hotel },
    ],
    relevantProducts: [
      { name: 'Tesle Hospital', slug: 'hospital' },
      { name: 'Tesle Accounting', slug: 'accounting' },
      { name: 'Tesle HR', slug: 'hr' },
      { name: 'Tesle Inventory', slug: 'inventory' },
      { name: 'Tesle Procurement', slug: 'procurement' },
      { name: 'Tesle AI', slug: 'ai' },
    ],
    caseStudy: {
      company: 'Lagos University Teaching Hospital',
      title: 'LUTH digitises 500-bed hospital with unified Tesle platform',
      results: [
        'Patient wait times reduced by 62%',
        'Pharmacy stockouts eliminated within first quarter',
        'Revenue collection improved by 35% through automated billing',
        'Clinical documentation time cut by 50%',
      ],
      quote: 'Tesle transformed our hospital from paper-based chaos to a fully digital operation. Our clinicians spend more time with patients and less time on paperwork.',
      author: 'Dr. Adebayo Ogunlesi',
      role: 'Chief Medical Director, LUTH',
    },
  },
  {
    slug: 'education',
    name: 'Education',
    tagline: 'Empower students. Simplify administration.',
    description: 'School management, student records, fee collection, timetabling, and parent communication for K-12 and tertiary institutions.',
    icon: GraduationCap,
    color: 'from-teal-500 to-cyan-600',
    heroTitle: 'Education management for modern institutions',
    heroSubtitle: 'Tesle for Education unifies student records, admissions, timetabling, attendance, fee management, and parent communication into one platform.',
    challenges: [
      'Manual fee collection and reconciliation processes lead to revenue leakage and administrative bottlenecks.',
      'Student data scattered across spreadsheets, paper records, and multiple software systems creates inefficiencies.',
      'Limited parent engagement due to lack of real-time access to student attendance, grades, and school communications.',
      'Regulatory reporting requirements consume staff time during critical periods.',
    ],
    solutions: [
      { title: 'Student Information System', description: 'Centralised student profiles with academic history, medical records, disciplinary tracking, and document management.', icon: GraduationCap },
      { title: 'Fee Management', description: 'Automated fee structure setup, invoice generation, payment tracking with integrated gateways, and arrears management.', icon: Landmark },
      { title: 'Attendance & Timetabling', description: 'Biometric and QR attendance capture, timetable generation with conflict detection, and real-time absence alerts.', icon: Factory },
      { title: 'Academic Management', description: 'Grade book, report card generation, transcript management, and academic performance analytics for data-driven decisions.', icon: HeartPulse },
      { title: 'Parent & Student Portal', description: 'Mobile apps and web portals for real-time access to grades, attendance, fees, assignments, and school announcements.', icon: Building2 },
      { title: 'Admissions & Enrollment', description: 'Online application portal, entrance exam management, offer letter generation, and enrollment confirmation workflows.', icon: ShoppingBag },
    ],
    relevantProducts: [
      { name: 'Tesle School', slug: 'school' },
      { name: 'Tesle Accounting', slug: 'accounting' },
      { name: 'Tesle HR', slug: 'hr' },
      { name: 'Tesle Payroll', slug: 'payroll' },
      { name: 'Tesle AI', slug: 'ai' },
    ],
    caseStudy: {
      company: 'Greenfield International Schools',
      title: 'Multi-campus school group unifies 3 campuses on Tesle',
      results: [
        'Fee collection rate improved from 72% to 97%',
        'Administrative staff reduced by 40% through automation',
        'Parent satisfaction scores increased by 55%',
        'Regulatory report generation reduced from 2 weeks to 1 day',
      ],
      quote: 'Tesle School gave us one view of our students across all three campuses. Fee collection used to be a nightmare  now it\'s fully automated.',
      author: 'Chioma Eze',
      role: 'Director of Administration, Greenfield International Schools',
    },
  },
  {
    slug: 'construction',
    name: 'Construction',
    tagline: 'Build faster. Track everything. Deliver on budget.',
    description: 'Project management, procurement, financials, and workforce management for construction and engineering firms.',
    icon: HardHat,
    color: 'from-amber-500 to-yellow-600',
    heroTitle: 'Construction management from ground up',
    heroSubtitle: 'Tesle for Construction connects project management, procurement, financial control, and workforce management on one platform designed for the built environment.',
    challenges: [
      'Project cost overruns due to poor budget tracking and lack of real-time expenditure visibility.',
      'Material procurement delays and site stockouts disrupt construction timelines and increase costs.',
      'Subcontractor and workforce management across multiple sites creates coordination and payroll complexity.',
      'Document control and compliance tracking are fragmented across email, spreadsheets, and filing cabinets.',
    ],
    solutions: [
      { title: 'Project Cost Control', description: 'Real-time budget vs. actual tracking, committed cost visibility, variation order management, and earned value analysis.', icon: HardHat },
      { title: 'Procurement & Supply Chain', description: 'Material requisition workflows, supplier management, purchase orders, goods receipt, and inventory tracking for site materials.', icon: ShoppingBag },
      { title: 'Subcontractor Management', description: 'Subcontractor onboarding, contract management, works tracking, certification, and payment processing.', icon: Building2 },
      { title: 'Site Workforce', description: 'Attendance tracking per site, timesheet management, payroll integration, and H&S compliance documentation.', icon: HeartPulse },
      { title: 'Document Control', description: 'Central document repository with version control, approval workflows, RFI management, and drawing register.', icon: Factory },
      { title: 'Project Reporting', description: 'Executive dashboards showing project health, progress S-curves, resource utilisation, and portfolio-level overview.', icon: Landmark },
    ],
    relevantProducts: [
      { name: 'Tesle Projects', slug: 'projects' },
      { name: 'Tesle Procurement', slug: 'procurement' },
      { name: 'Tesle Accounting', slug: 'accounting' },
      { name: 'Tesle HR', slug: 'hr' },
      { name: 'Tesle Payroll', slug: 'payroll' },
      { name: 'Tesle Inventory', slug: 'inventory' },
    ],
    caseStudy: {
      company: 'Julius Berger Nigeria',
      title: 'Major contractor digitises project controls across 12 active sites',
      results: [
        'Project cost variance reduced from 18% to 4% on average',
        'Material procurement lead time cut by 45%',
        'Subcontractor payment cycle reduced from 45 to 14 days',
        'Site attendance accuracy improved to 99.5%',
      ],
      quote: 'Tesle gave us project-level financial control we never had before. We can see committed costs, actual spend, and forecast variance in real time.',
      author: 'Olusegun Adeyemi',
      role: 'Projects Director, Julius Berger Nigeria',
    },
  },
  {
    slug: 'government',
    name: 'Government',
    tagline: 'Citizen-centric services. Transparent operations.',
    description: 'Budget execution, procurement, payroll, citizen portals, and compliance for public sector organisations.',
    icon: Landmark,
    color: 'from-blue-500 to-indigo-600',
    heroTitle: 'Government operations, digitally transformed',
    heroSubtitle: 'Tesle for Government helps public sector organisations deliver better services through transparent budget execution, automated procurement, streamlined payroll, and citizen engagement portals.',
    challenges: [
      'Manual budget tracking and procurement processes lead to inefficiencies, delays, and compliance risks.',
      'Payroll errors and ghost workers drain public resources and erode trust in government institutions.',
      'Citizen service delivery is hampered by paper-based processes and lack of digital service channels.',
      'Regulatory and audit compliance requires extensive manual record-keeping and reporting.',
    ],
    solutions: [
      { title: 'Budget Execution', description: 'Budget allocation, commitment tracking, expenditure monitoring, and variance reporting with configurable approval workflows.', icon: Landmark },
      { title: 'E-Procurement', description: 'End-to-end procurement automation from requisition to payment, with vendor registration, bid management, and contract tracking.', icon: ShoppingBag },
      { title: 'Payroll & HR', description: 'Centralised payroll with biometric validation, statutory deductions, pension management, and automated compliance reporting.', icon: Building2 },
      { title: 'Citizen Services Portal', description: 'Digital service requests, application tracking, payment processing, and feedback management for citizen-facing services.', icon: HeartPulse },
      { title: 'Asset & Inventory', description: 'Government asset register, inventory management, asset verification, and disposal workflows with full audit trail.', icon: Factory },
      { title: 'Compliance & Audit', description: 'Integrated audit trails, document management, regulatory report generation, and transparency dashboards for public accountability.', icon: Hotel },
    ],
    relevantProducts: [
      { name: 'Tesle ERP', slug: 'erp' },
      { name: 'Tesle Procurement', slug: 'procurement' },
      { name: 'Tesle Payroll', slug: 'payroll' },
      { name: 'Tesle HR', slug: 'hr' },
      { name: 'Tesle Accounting', slug: 'accounting' },
      { name: 'Tesle AI', slug: 'ai' },
    ],
    caseStudy: {
      company: 'Lagos State Government',
      title: 'State government digitises budget execution and procurement',
      results: [
        'Budget compliance improved from 62% to 89%',
        'Procurement cycle time reduced by 60%',
        'Payroll accuracy reached 99.9% with biometric validation',
        'Citizen service request resolution time cut by 70%',
      ],
      quote: 'Tesle brought transparency and efficiency to our procurement and budget processes. The results speak for themselves  better services, less waste.',
      author: 'Mr. Rotimi Ogunleye',
      role: 'Permanent Secretary, Lagos State Ministry of Finance',
    },
  },
  {
    slug: 'retail',
    name: 'Retail',
    tagline: 'Sell smarter. Stock smarter. Grow faster.',
    description: 'POS, inventory, CRM, e-commerce, and analytics for retail chains, boutiques, and e-commerce businesses.',
    icon: ShoppingBag,
    color: 'from-pink-500 to-rose-600',
    heroTitle: 'Retail operations, unified and intelligent',
    heroSubtitle: 'Tesle for Retail connects point of sale, inventory, customer relationships, and e-commerce into one AI-powered retail operating system.',
    challenges: [
      'Inventory inaccuracies across multiple stores lead to stockouts of fast-moving items and overstock of slow movers.',
      'Disconnected sales channels  physical stores, online, mobile  create fragmented customer experiences.',
      'Limited customer insights make it difficult to personalise marketing and build loyalty.',
      'Manual reconciliation across payment methods, channels, and accounting systems consumes staff time.',
    ],
    solutions: [
      { title: 'Point of Sale', description: 'Fast, modern POS with offline mode, barcode scanning, multiple payment methods, and real-time inventory sync.', icon: ShoppingBag },
      { title: 'Multi-Channel Inventory', description: 'Unified inventory across physical stores, warehouses, and e-commerce with real-time stock synchronisation.', icon: Factory },
      { title: 'Customer CRM', description: 'Customer profiles, purchase history, loyalty programmes, and targeted promotions based on buying behaviour.', icon: HeartPulse },
      { title: 'E-Commerce Integration', description: 'Seamless integration with Shopify, WooCommerce, and custom e-commerce platforms for omnichannel operations.', icon: Building2 },
      { title: 'Supplier Management', description: 'Vendor onboarding, purchase orders, goods receipt, and supplier performance analytics for procurement.', icon: Truck },
      { title: 'Retail Analytics', description: 'Sales performance dashboards, margin analysis, bestseller reporting, and demand forecasting with AI.', icon: Landmark },
    ],
    relevantProducts: [
      { name: 'Tesle POS', slug: 'pos' },
      { name: 'Tesle Inventory', slug: 'inventory' },
      { name: 'Tesle CRM', slug: 'crm' },
      { name: 'Tesle Accounting', slug: 'accounting' },
      { name: 'Tesle AI', slug: 'ai' },
    ],
    caseStudy: {
      company: 'Spar Nigeria',
      title: 'National retail chain modernises with unified commerce platform',
      results: [
        'Inventory accuracy improved from 78% to 98% across 15 stores',
        'Checkout time reduced by 40% with new POS system',
        'Customer retention increased by 25% with loyalty programme',
        'Manual reconciliation time cut by 80%',
      ],
      quote: 'Tesle transformed our retail operations. We went from guessing what was in stock to knowing exactly what\'s on every shelf, in real time.',
      author: 'Funmi Adekunle',
      role: 'COO, Spar Nigeria',
    },
  },
  {
    slug: 'manufacturing',
    name: 'Manufacturing',
    tagline: 'Produce more. Waste less. Quality always.',
    description: 'Production planning, BOM management, quality control, shop floor tracking, and supply chain for manufacturers.',
    icon: Factory,
    color: 'from-orange-500 to-amber-600',
    heroTitle: 'Manufacturing intelligence from raw material to finished goods',
    heroSubtitle: 'Tesle for Manufacturing connects production planning, bill of materials, quality control, shop floor execution, and supply chain into one platform.',
    challenges: [
      'Production delays due to material shortages, machine downtime, and poor production scheduling.',
      'Quality issues detected late in the production process lead to waste and rework costs.',
      'Lack of real-time shop floor visibility makes it difficult to track production progress and identify bottlenecks.',
      'Inventory inaccuracies for raw materials, WIP, and finished goods disrupt production planning.',
    ],
    solutions: [
      { title: 'Production Planning', description: 'Master production scheduling, capacity planning, material requirements planning (MRP), and production order management.', icon: Factory },
      { title: 'Bill of Materials', description: 'Multi-level BOM management, engineering change control, component substitution, and cost roll-up.', icon: Building2 },
      { title: 'Quality Management', description: 'In-process inspection, quality checklists, non-conformance tracking, corrective actions, and supplier quality scoring.', icon: HeartPulse },
      { title: 'Shop Floor Control', description: 'Work order execution, machine tracking, operator assignment, time capture, and production output recording.', icon: ShoppingBag },
      { title: 'Supply Chain', description: 'Raw material procurement, supplier scheduling, inbound logistics, and vendor performance management.', icon: Truck },
      { title: 'Manufacturing Analytics', description: 'OEE dashboards, yield analysis, scrap tracking, production cost analysis, and AI-powered demand forecasting.', icon: Landmark },
    ],
    relevantProducts: [
      { name: 'Tesle ERP', slug: 'erp' },
      { name: 'Tesle Inventory', slug: 'inventory' },
      { name: 'Tesle Procurement', slug: 'procurement' },
      { name: 'Tesle Accounting', slug: 'accounting' },
      { name: 'Tesle HR', slug: 'hr' },
      { name: 'Tesle AI', slug: 'ai' },
    ],
    caseStudy: {
      company: 'Dangote Cement',
      title: 'Manufacturing giant digitises production across multiple plants',
      results: [
        'Overall Equipment Effectiveness (OEE) improved by 18%',
        'Production schedule adherence increased from 65% to 92%',
        'Quality defect rate reduced by 45%',
        'Raw material inventory holding costs cut by 22%',
      ],
      quote: 'The real-time shop floor visibility Tesle gave us was a game changer. We can identify bottlenecks as they happen and adjust production schedules on the fly.',
      author: 'Alhaji Suleiman Bello',
      role: 'Director of Operations, Dangote Cement',
    },
  },
  {
    slug: 'hospitality',
    name: 'Hospitality',
    tagline: 'Exceptional guest experiences. Effortless operations.',
    description: 'Property management, booking engines, housekeeping, billing, and revenue management for hotels, resorts, and lodges.',
    icon: Hotel,
    color: 'from-indigo-500 to-blue-600',
    heroTitle: 'Hospitality management that delights guests',
    heroSubtitle: 'Tesle for Hospitality handles reservations, front desk, housekeeping, billing, and revenue management so your team can focus on guest experience.',
    challenges: [
      'Manual reservation management and channel fragmentation lead to overbookings and revenue loss.',
      'Slow check-in/out processes and disconnected guest services create poor guest experiences.',
      'Housekeeping coordination is inefficient without real-time room status visibility.',
      'Revenue management relies on intuition rather than data-driven pricing and occupancy forecasting.',
    ],
    solutions: [
      { title: 'Property Management', description: 'Reservations, front desk, room assignment, guest profiles, and folio management in one integrated system.', icon: Hotel },
      { title: 'Channel Management', description: 'Two-way sync with Booking.com, Expedia, Airbnb for real-time availability, rates, and reservation updates.', icon: Building2 },
      { title: 'Housekeeping Operations', description: 'Room status tracking, cleaning schedules, inspection checklists, maintenance requests, and linen management.', icon: ShoppingBag },
      { title: 'Guest Experience', description: 'Guest preferences, stay history, automated pre-arrival communication, and in-stay service request management.', icon: HeartPulse },
      { title: 'Billing & Payments', description: 'Guest folios, charge posting, split billing, invoice generation, and integrated payment gateway processing.', icon: Landmark },
      { title: 'Revenue Management', description: 'Dynamic pricing, occupancy forecasting, rate comparison, RevPAR analysis, and source-of-business tracking.', icon: Factory },
    ],
    relevantProducts: [
      { name: 'Tesle Hotel', slug: 'hotel' },
      { name: 'Tesle Accounting', slug: 'accounting' },
      { name: 'Tesle HR', slug: 'hr' },
      { name: 'Tesle Payroll', slug: 'payroll' },
      { name: 'Tesle AI', slug: 'ai' },
    ],
    caseStudy: {
      company: 'Transcorp Hotels',
      title: 'Luxury hotel group streamlines operations across 5 properties',
      results: [
        'RevPAR increased by 23% through dynamic pricing',
        'Check-in time reduced from 8 minutes to 90 seconds',
        'Online booking conversion rate improved by 40%',
        'Housekeeping efficiency improved by 35%',
      ],
      quote: 'Tesle Hotel transformed our operations. Our front desk team can check guests in within seconds, and our revenue team has the data they need to optimise pricing daily.',
      author: 'Dupe Olusola',
      role: 'CEO, Transcorp Hotels',
    },
  },
  {
    slug: 'ngos',
    name: 'NGOs',
    tagline: 'Maximise impact. Minimise admin.',
    description: 'Donor management, grant tracking, programme management, financials, and impact reporting for non-profit organisations.',
    icon: HeartHandshake,
    color: 'from-green-500 to-emerald-600',
    heroTitle: 'Non-profit management that amplifies your impact',
    heroSubtitle: 'Tesle for NGOs helps non-profit organisations manage donors, track grants, run programmes, and report impact  so you spend less time on admin and more on your mission.',
    challenges: [
      'Donor and grant tracking across multiple funders with different reporting requirements creates administrative complexity.',
      'Programme monitoring and impact measurement are difficult without integrated data collection and reporting tools.',
      'Financial management across restricted and unrestricted funding sources requires careful fund accounting.',
      'Volunteer and staff management across multiple programme locations stretches limited administrative resources.',
    ],
    solutions: [
      { title: 'Donor & Grant Management', description: 'Donor profiles, pledge tracking, grant lifecycle management, reporting deadlines, and compliance monitoring.', icon: HeartHandshake },
      { title: 'Programme Management', description: 'Programme planning, activity tracking, beneficiary management, outcome monitoring, and impact assessment.', icon: Building2 },
      { title: 'Fund Accounting', description: 'Restricted vs. unrestricted fund management, grant budgeting, expenditure tracking, and funder reporting.', icon: Landmark },
      { title: 'Volunteer Management', description: 'Volunteer registration, skill tracking, scheduling, hour logging, and communication tools.', icon: HeartPulse },
      { title: 'Payroll & HR', description: 'Staff and volunteer management, payroll processing, statutory compliance, and leave management.', icon: ShoppingBag },
      { title: 'Impact Reporting', description: 'Custom impact reports, beneficiary stories, outcome dashboards, and donor-ready reporting with data visualisation.', icon: Factory },
    ],
    relevantProducts: [
      { name: 'Tesle Accounting', slug: 'accounting' },
      { name: 'Tesle HR', slug: 'hr' },
      { name: 'Tesle Payroll', slug: 'payroll' },
      { name: 'Tesle CRM', slug: 'crm' },
      { name: 'Tesle Projects', slug: 'projects' },
      { name: 'Tesle AI', slug: 'ai' },
    ],
    caseStudy: {
      company: 'ActionAid Nigeria',
      title: 'International NGO streamlines programme and grant management',
      results: [
        'Grant reporting time reduced from 10 days to 2 days',
        'Donor compliance rate improved to 100%',
        'Programme administrative overhead cut by 30%',
        'Impact report production accelerated by 3x',
      ],
      quote: 'Tesle gave us the tools to manage our grants, track our programmes, and report our impact  all in one place. Our funders love the transparency and detail of our reports.',
      author: 'Ebele Ogbonna',
      role: 'Country Director, ActionAid Nigeria',
    },
  },
  {
    slug: 'churches',
    name: 'Churches',
    tagline: 'Manage your ministry. Grow your congregation.',
    description: 'Member management, attendance, tithes and offerings, event planning, and communication for churches of every size.',
    icon: Church,
    color: 'from-purple-500 to-violet-600',
    heroTitle: 'Church management that serves your mission',
    heroSubtitle: 'Tesle for Churches helps you manage members, track attendance, record giving, organise events, and communicate with your congregation  all from one platform.',
    challenges: [
      'Member information scattered across paper records, spreadsheets, and multiple tools makes it hard to know and serve your congregation.',
      'Manual tracking of tithes, offerings, and pledges lacks the accuracy and reporting needed for financial accountability.',
      'Event planning and volunteer coordination is time-consuming without centralised scheduling and communication tools.',
      'Congregation communication relies on announcements alone, limiting engagement and community building.',
    ],
    solutions: [
      { title: 'Member Management', description: 'Comprehensive member profiles with family connections, ministry involvement, spiritual journey tracking, and communication preferences.', icon: Church },
      { title: 'Giving Management', description: 'Record tithes, offerings, and pledges. Integrated payment gateways for online giving. Automated contribution statements for members.', icon: Landmark },
      { title: 'Attendance Tracking', description: 'Service and event attendance via mobile app, QR code, or manual entry. Attendance trends and engagement analytics.', icon: Factory },
      { title: 'Event & Ministry Planning', description: 'Service planning, conference management, small group coordination, volunteer scheduling, and event budget tracking.', icon: Building2 },
      { title: 'Communication Hub', description: 'Bulk SMS, email campaigns, and WhatsApp integration. Segment your congregation by location, ministry, or group.', icon: HeartPulse },
      { title: 'Financial Reporting', description: 'Income and expense tracking, fund accounting, budget management, contribution reports, and audit-ready financial statements.', icon: ShoppingBag },
    ],
    relevantProducts: [
      { name: 'Tesle Church', slug: 'church' },
      { name: 'Tesle Accounting', slug: 'accounting' },
      { name: 'Tesle Payroll', slug: 'payroll' },
      { name: 'Tesle CRM', slug: 'crm' },
      { name: 'Tesle AI', slug: 'ai' },
    ],
    caseStudy: {
      company: 'Daystar Christian Centre',
      title: 'Large multi-campus church digitises membership and giving',
      results: [
        'Online giving increased by 65% within 3 months',
        'Member engagement tracking improved from manual to real-time',
        'Event registration and check-in fully digitised',
        'Communication reach expanded 4x with segmented messaging',
      ],
      quote: 'Tesle Church helped us know our congregation in ways we never could before. We can now track engagement, communicate effectively, and serve our members better.',
      author: 'Pastor Tolu Ogunlesi',
      role: 'Executive Pastor, Daystar Christian Centre',
    },
  },
  {
    slug: 'financial-services',
    name: 'Financial Services',
    tagline: 'Secure, compliant, and real-time financial operations.',
    description: 'Banking integration, multi-currency accounting, regulatory compliance, and treasury management for financial institutions.',
    icon: Building2,
    color: 'from-cyan-500 to-blue-600',
    heroTitle: 'Financial services infrastructure for Africa',
    heroSubtitle: 'Tesle for Financial Services provides banking integrations, multi-currency accounting, regulatory compliance, and treasury management for banks, MFBs, fintechs, and insurance companies.',
    challenges: [
      'Regulatory compliance across multiple African markets requires constant monitoring of changing rules and reporting requirements.',
      'Multi-currency operations introduce FX risk, complex reconciliation, and cross-border reporting challenges.',
      'Manual reconciliation between core banking systems, accounting platforms, and payment gateways creates delays and errors.',
      'Customer onboarding and KYC/AML compliance processes are slow and paper-heavy.',
    ],
    solutions: [
      { title: 'Banking Integration', description: 'API integration with core banking systems, real-time transaction feeds, automated reconciliation, and statement processing.', icon: Building2 },
      { title: 'Multi-Currency Accounting', description: 'Multi-currency GL, real-time FX handling, automated revaluation, and consolidated reporting across entities and currencies.', icon: Landmark },
      { title: 'Regulatory Compliance', description: 'Automated regulatory reporting (CBN, CBK, BoG, SARB), AML/CFT screening, and audit-ready record-keeping.', icon: Factory },
      { title: 'Treasury Management', description: 'Cash position tracking, liquidity forecasting, intercompany lending, and investment management with real-time dashboards.', icon: HeartPulse },
      { title: 'Customer Onboarding', description: 'Digital KYC workflows, document verification, account opening automation, and customer risk profiling.', icon: ShoppingBag },
      { title: 'Financial Analytics', description: 'Real-time profitability analysis, portfolio performance, risk reporting, and AI-powered anomaly detection.', icon: Hotel },
    ],
    relevantProducts: [
      { name: 'Tesle ERP', slug: 'erp' },
      { name: 'Tesle Accounting', slug: 'accounting' },
      { name: 'Tesle CRM', slug: 'crm' },
      { name: 'Tesle Payroll', slug: 'payroll' },
      { name: 'Tesle AI', slug: 'ai' },
    ],
    caseStudy: {
      company: 'Access Bank PLC',
      title: 'Commercial bank digitises finance and regulatory reporting',
      results: [
        'Month-end close reduced from 21 days to 3 days',
        'Regulatory reporting accuracy improved to 99.9%',
        'FX revaluation process automated  saving 200 person-hours monthly',
        'Intercompany reconciliation cycle cut by 80%',
      ],
      quote: 'Tesle transformed our financial operations. What used to take three weeks of manual work now happens in three days with greater accuracy.',
      author: 'Roosevelt Ogbonna',
      role: 'Group CFO, Access Bank PLC',
    },
  },
  {
    slug: 'transportation',
    name: 'Transportation',
    tagline: 'Move more. Track everything. Deliver on time.',
    description: 'Fleet management, route optimisation, shipment tracking, and logistics operations for transportation companies.',
    icon: Truck,
    color: 'from-yellow-500 to-orange-600',
    heroTitle: 'Transportation logistics, fully connected',
    heroSubtitle: 'Tesle for Transportation gives fleet operators, logistics companies, and transport businesses complete control over vehicles, routes, shipments, and operations.',
    challenges: [
      'Rising fuel costs and inefficient route planning eat into already thin transportation margins.',
      'Lack of real-time visibility into fleet location and shipment status creates customer dissatisfaction.',
      'Vehicle maintenance tracking is reactive rather than proactive, leading to breakdowns and downtime.',
      'Manual dispatch, proof of delivery, and billing processes create administrative bottlenecks.',
    ],
    solutions: [
      { title: 'Fleet Management', description: 'Vehicle registration, maintenance scheduling, fuel tracking, driver management, and compliance documentation all in one place.', icon: Truck },
      { title: 'Route Optimisation', description: 'AI-powered route planning considering traffic, road conditions, delivery windows, and vehicle capacity for optimal efficiency.', icon: Factory },
      { title: 'Real-Time Tracking', description: 'GPS-enabled vehicle and shipment tracking with geofencing, ETA updates, and customer-facing tracking portal.', icon: Building2 },
      { title: 'Dispatch & Load Planning', description: 'Order assignment, load optimisation, manifest generation, driver dispatch, and proof of delivery capture with mobile app.', icon: HeartPulse },
      { title: 'Driver Management', description: 'Driver records, licence tracking, hours of service compliance, performance scoring, and communication tools.', icon: ShoppingBag },
      { title: 'Transport Analytics', description: 'Cost per kilometre, on-time delivery rates, fleet utilisation, fuel efficiency, and driver performance dashboards.', icon: Landmark },
    ],
    relevantProducts: [
      { name: 'Tesle Logistics', slug: 'logistics' },
      { name: 'Tesle ERP', slug: 'erp' },
      { name: 'Tesle Accounting', slug: 'accounting' },
      { name: 'Tesle HR', slug: 'hr' },
      { name: 'Tesle AI', slug: 'ai' },
    ],
    caseStudy: {
      company: 'ABC Transport',
      title: 'Inter-state transport company digitises fleet and operations',
      results: [
        'Fuel costs reduced by 18% through route optimisation',
        'On-time delivery rate improved from 72% to 94%',
        'Vehicle uptime increased by 25% with proactive maintenance',
        'Customer satisfaction scores improved by 40%',
      ],
      quote: 'Tesle gave us real-time visibility into our entire fleet. We know where every vehicle is, how it\'s performing, and when it needs maintenance  all from one dashboard.',
      author: 'Frank Nneji',
      role: 'CEO, ABC Transport',
    },
  },
  {
    slug: 'real-estate',
    name: 'Real Estate',
    tagline: 'Manage properties. Close deals. Grow portfolios.',
    description: 'Property management, CRM, lease tracking, financials, and project management for real estate firms and developers.',
    icon: Home,
    color: 'from-emerald-500 to-green-600',
    heroTitle: 'Real estate management from listing to lease',
    heroSubtitle: 'Tesle for Real Estate helps developers, agents, and property managers run their entire business  from lead generation and sales to property management and financials.',
    challenges: [
      'Lead and customer management is fragmented across spreadsheets, phone calls, and multiple tools, making it hard to track prospects through the sales funnel.',
      'Property and lease management across multiple assets requires organised record-keeping and automated rent collection.',
      'Project cost control for developments is difficult without integrated budget tracking and procurement.',
      'Commission calculations and agent management become complex as teams and transactions grow.',
    ],
    solutions: [
      { title: 'Real Estate CRM', description: 'Lead capture, property enquiries, site visit scheduling, offer management, and sales pipeline tracking from enquiry to closing.', icon: Home },
      { title: 'Property & Lease Management', description: 'Property register, tenant management, lease schedules, rent collection automation, and vacancy tracking.', icon: Building2 },
      { title: 'Development Project Control', description: 'Project budgeting, contractor management, milestone tracking, cost control, and progress reporting for developments.', icon: HardHat },
      { title: 'Financial Management', description: 'Property-level P&L, service charge accounting, transaction recording, and portfolio performance reporting.', icon: Landmark },
      { title: 'Agent & Commission Management', description: 'Agent registration, lead assignment, commission calculation, performance tracking, and payout management.', icon: HeartPulse },
      { title: 'Customer Portal', description: 'Tenant portal for rent payments and maintenance requests. Buyer portal for document submission and payment tracking.', icon: ShoppingBag },
    ],
    relevantProducts: [
      { name: 'Tesle CRM', slug: 'crm' },
      { name: 'Tesle Accounting', slug: 'accounting' },
      { name: 'Tesle Projects', slug: 'projects' },
      { name: 'Tesle HR', slug: 'hr' },
      { name: 'Tesle Procurement', slug: 'procurement' },
      { name: 'Tesle AI', slug: 'ai' },
    ],
    caseStudy: {
      company: 'Estate Links Nigeria',
      title: 'Property development firm unifies sales, projects, and finance',
      results: [
        'Sales conversion rate improved by 35% with CRM pipeline',
        'Project cost overruns reduced from 15% to 3%',
        'Rent collection rate increased to 98% with automation',
        'Commission processing time cut from 2 weeks to 2 days',
      ],
      quote: 'Tesle connected our sales, project management, and finance teams on one platform. We now have real-time visibility into every aspect of our business.',
      author: 'Dele Ogunbanjo',
      role: 'MD, Estate Links Nigeria',
    },
  },
];

export function getIndustryBySlug(slug: string): IndustryData | undefined {
  return industries.find(i => i.slug === slug);
}
