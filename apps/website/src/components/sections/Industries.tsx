import { motion } from 'framer-motion';
import {
  Building2, Landmark, HeartPulse, GraduationCap,
  ShoppingBag, Truck, Hotel, TowerControl,
} from 'lucide-react';
import { SectionTitle } from '@/components/ui/SectionTitle';

const industries = [
  { icon: Landmark, title: 'Financial Services', description: 'Core banking integrations, multi-currency accounting, regulatory compliance (CBN, CBK, BoG, SARB), and real-time treasury management for banks, MFBs, and fintechs.' },
  { icon: Building2, title: 'Telecommunications', description: 'Subscriber management, billing integration, network asset tracking, field service automation, and regulatory reporting for mobile network operators and ISPs.' },
  { icon: ShoppingBag, title: 'Retail & Commerce', description: 'Omnichannel inventory management, POS integration, supplier portals, demand forecasting, and loyalty programme management for retail chains and e-commerce.' },
  { icon: HeartPulse, title: 'Healthcare', description: 'Hospital management systems, patient records (EMR/EHR), telemedicine integration, pharmacy inventory, billing, and HIPAA-compliant data handling.' },
  { icon: Truck, title: 'Logistics & Transport', description: 'Fleet management, route optimisation, warehouse management, last-mile delivery tracking, and real-time shipment visibility for logistics providers.' },
  { icon: GraduationCap, title: 'Education', description: 'Student information systems, learning management, fee management, admissions automation, accreditation compliance, and alumni portals for universities and schools.' },
  { icon: Hotel, title: 'Hospitality', description: 'Property management (PMS), booking engine integration, revenue management, housekeeping automation, and guest experience platforms for hotels and resorts.' },
  { icon: TowerControl, title: 'Government & Public Sector', description: 'Budget execution, procurement automation, citizen portals, payroll for civil service, project tracking, and IFMIS integration for government agencies.' },
];

export default function Industries() {
  return (
    <section id="industries" className="relative py-24 sm:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/[0.02] to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
        <SectionTitle
          label="Industry Solutions"
          title="Tailored for every sector"
          subtitle="Tesle serves organisations across financial services, telecommunications, retail, healthcare, manufacturing, logistics, education, government, and hospitality  with configurable modules for every industry."
        />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8 }}
          className="mt-16 sm:mt-20 grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
        >
          {industries.map((industry, i) => {
            const Icon = industry.icon;
            return (
              <motion.div
                key={industry.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ delay: i * 0.06, duration: 0.5 }}
                className="group relative p-5 sm:p-6 rounded-2xl card hover:card-hover transition-all duration-500 border border-glass hover:border-accent/20"
              >
                <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Icon className="w-5 h-5 text-accent" />
                </div>
                <h3 className="text-base font-semibold text-text mb-2">{industry.title}</h3>
                <p className="text-sm text-muted leading-relaxed">{industry.description}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
