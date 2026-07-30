import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { cn } from '@/utils/cn';

const faqs = [
  {
    question: 'What is Tesle and how does it work?',
    answer: 'Tesle is the AI-native operating system for African businesses  a unified platform that replaces 10+ disconnected tools with one integrated system. It includes ERP, CRM, HRM, Financials, Analytics, Project Management, Inventory, Supply Chain, Payroll, and Collaboration modules  all sharing the same data, workflows, and user interface. You subscribe to the modules you need and your team accesses everything through a single login.'
  },
  {
    question: 'How is Tesle different from using separate tools like QuickBooks, Salesforce, and spreadsheets?',
    answer: 'Most businesses run on fragmented systems: QuickBooks for accounting, Salesforce for CRM, spreadsheets for tracking, and separate tools for payroll, HR, and project management. This creates data silos, manual workflows, and reconciliation nightmares. Tesle replaces all of them with one unified platform  every department sees the same real-time data, workflows are automated across modules, and AI provides insights that no single tool could generate on its own.'
  },
  {
    question: 'How long does deployment take?',
    answer: 'Small teams on the Starter plan can be up and running in minutes. Business and Enterprise deployments typically take 4–8 weeks, depending on the number of modules, data migration needs, and custom integrations. We follow a proven 4-phase framework: Discovery, Configuration & Integration, Testing & Compliance, and Go-Live. Your dedicated implementation manager keeps everything on track.'
  },
  {
    question: 'What does "AI-native" mean?',
    answer: 'AI-native means artificial intelligence is built into the foundation of the platform  not bolted on as an afterthought. Every Tesle module includes AI features: smart lead scoring in CRM, predictive forecasting in Financials, demand planning in Supply Chain, automated reconciliation in ERP, resume parsing in HRM, and natural language queries in Analytics. Our AI models are continuously trained on anonymised usage patterns to get smarter over time.'
  },
  {
    question: 'Do you offer on-premise deployment?',
    answer: 'Yes. Tesle Enterprise supports on-premise deployment in your data centre, private cloud, or air-gapped environment. This is ideal for regulated industries like banking, government, and healthcare where data sovereignty is critical. We support Kubernetes-based deployments with full operational handover to your IT team.'
  },
  {
    question: 'Is Tesle suitable for my industry?',
    answer: 'Tesle serves organisations across every major industry: financial services, telecommunications, retail, healthcare, manufacturing, logistics, education, government, and hospitality. With 12 configurable modules and a low-code platform builder, we adapt to your specific workflows regardless of sector. We also offer pre-built industry templates and compliance packages.'
  },
  {
    question: 'How do you handle data security and compliance?',
    answer: 'Security is fundamental to everything we build. Tesle is SOC 2 compliant with end-to-end encryption (AES-256 at rest, TLS 1.3 in transit), SSO/SAML authentication, role-based access control, immutable audit logs, and GDPR readiness. Enterprise customers get dedicated infrastructure, advanced security controls, and custom data residency configurations. We undergo annual penetration testing by independent security firms.'
  },
  {
    question: 'What kind of support do you offer?',
    answer: 'All plans include email and chat support. Business plans add priority SLA with 4-hour response. Enterprise plans include a dedicated customer success manager, 24/7 premium support with 1-hour response, quarterly business reviews, and direct access to our engineering team. We also provide extensive documentation, video tutorials, and a community forum.'
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="relative py-24 sm:py-32">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <SectionTitle
          label="FAQ"
          title="Questions? We have answers."
          subtitle="Everything you need to know about Tesle  from deployment to security, pricing to compliance."
        />

        <div className="mt-16 space-y-3">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ delay: i * 0.05, duration: 0.4 }}
                className={cn(
                  'rounded-2xl transition-all duration-300',
                  isOpen
                    ? 'glass bg-white/[0.05]'
                    : 'glass hover:glass'
                )}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="w-full flex items-center justify-between p-5 sm:p-6 text-left"
                >
                  <span className="text-sm sm:text-base font-medium text-text pr-4">
                    {faq.question}
                  </span>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex-shrink-0 w-6 h-6 rounded-full bg-glass flex items-center justify-center"
                  >
                    <ChevronDown className="w-4 h-4 text-muted" />
                  </motion.div>
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <p className="px-5 sm:px-6 pb-5 sm:pb-6 text-sm sm:text-base text-muted leading-relaxed">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
