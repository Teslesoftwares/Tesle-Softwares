import { motion } from 'framer-motion';
import { Brain, Sparkles, BarChart3, Bot, Search, Workflow } from 'lucide-react';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { ExpandableCard } from '@/components/ui/ExpandableCard';

const capabilities = [
  { icon: Brain, title: 'Smart CRM', description: 'AI-powered lead scoring, sentiment analysis, next-best-action recommendations, and automated follow-ups that turn prospects into loyal customers.' },
  { icon: BarChart3, title: 'Predictive ERP', description: 'Forecast demand, optimise inventory levels, predict cash flow, and detect anomalies before they impact your business  all from within your ERP.' },
  { icon: Bot, title: 'Intelligent Payroll', description: 'Auto-calculate statutory deductions across 15+ African markets, flag compliance risks, and generate payslips  with zero manual data entry.' },
  { icon: Sparkles, title: 'AI Finance', description: 'Automate reconciliations, categorise transactions, generate real-time financial reports, and get multi-entity consolidation in minutes, not weeks.' },
  { icon: Search, title: 'Smart Supply Chain', description: 'AI-driven demand planning, supplier risk scoring, route optimisation, and automated procurement that reduces costs and improves delivery reliability.' },
  { icon: Workflow, title: 'Auto HR', description: 'Automated recruitment screening, performance insights, attrition prediction, and personalised learning recommendations for your workforce.' },
];

export default function AIEverywhere() {
  return (
    <section id="ai" className="relative py-24 sm:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/[0.02] to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
        <SectionTitle
          label="AI Everywhere"
          title="Artificial intelligence, embedded in every module"
          subtitle="Tesle isn't a platform with an AI add-on. Every module  from CRM to supply chain  is infused with machine learning that automates work and surfaces intelligence."
        />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8 }}
          className="mt-16 sm:mt-20 grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
        >
          {capabilities.map((cap, i) => {
            const Icon = cap.icon;
            return (
              <motion.div
                key={cap.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ delay: i * 0.06, duration: 0.5 }}
              >
                <ExpandableCard className="!p-5">
                  <div className="w-11 h-11 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Icon className="w-5 h-5 text-accent" />
                  </div>
                  <h3 className="text-base font-semibold text-text mb-2">{cap.title}</h3>
                  <p className="text-sm text-muted leading-relaxed">{cap.description}</p>
                </ExpandableCard>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
