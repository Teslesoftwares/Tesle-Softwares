import { motion } from 'framer-motion';
import { Shield, Lock, Key, FileCheck, Eye, Server } from 'lucide-react';
import { SectionTitle } from '@/components/ui/SectionTitle';

const items = [
  { icon: Shield, title: 'SOC 2 Type II', description: 'Certified for security, availability, and confidentiality. Independently audited annually by a licensed CPA firm.' },
  { icon: Lock, title: 'End-to-End Encryption', description: 'AES-256 encryption at rest and TLS 1.3 in transit. All data encrypted with customer-managed keys option.' },
  { icon: Key, title: 'Access Control', description: 'Role-based access control (RBAC) with granular permissions, multi-factor authentication, and session management.' },
  { icon: FileCheck, title: 'Compliance Framework', description: 'Pre-configured for GDPR, NDPR (Nigeria), POPIA (South Africa), and Data Protection Acts across African markets.' },
  { icon: Eye, title: 'Audit Trail', description: 'Immutable audit logs capturing every action across the platform. Exportable for regulatory reporting and forensic analysis.' },
  { icon: Server, title: 'Data Residency', description: 'Deploy on AWS, Azure, or GCP with data residency in Africa. On-premises options available for regulated industries.' },
];

export default function SecurityCompliance() {
  return (
    <section id="security" className="relative py-24 sm:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/[0.02] to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
        <SectionTitle
          label="Security & Compliance"
          title="Enterprise-grade protection. Built-in compliance."
          subtitle="Your data is protected by world-class security infrastructure, certifications, and controls that meet the strictest regulatory requirements."
        />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8 }}
          className="mt-16 sm:mt-20 grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {items.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ delay: i * 0.06, duration: 0.5 }}
                className="group relative p-6 rounded-2xl card hover:bg-glass-hover transition-all duration-500 border border-glass hover:border-accent/20"
              >
                <div className="w-12 h-12 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Icon className="w-6 h-6 text-accent" />
                </div>
                <h3 className="text-base font-semibold text-text mb-2">{item.title}</h3>
                <p className="text-sm text-muted leading-relaxed">{item.description}</p>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-16 p-6 rounded-2xl glass border border-accent/10 text-center max-w-3xl mx-auto"
        >
          <p className="text-sm text-muted">
            Tesle undergoes annual SOC 2 Type II audits, quarterly penetration testing, and continuous vulnerability scanning.
            <br />
            <span className="text-accent font-medium">Download our security whitepaper or request a compliance report.</span>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
