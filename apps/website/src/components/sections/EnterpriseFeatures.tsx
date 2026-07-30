import { motion } from 'framer-motion';
import { Shield, Server, Users, Clock, Headphones, Cpu } from 'lucide-react';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { ExpandableCard } from '@/components/ui/ExpandableCard';

const features = [
  { icon: Shield, title: 'Enterprise Security', description: 'SOC 2 Type II certified. End-to-end encryption, RBAC, audit trails, data residency controls, and regular penetration testing by third-party firms.' },
  { icon: Server, title: 'Dedicated Infrastructure', description: 'Single-tenant or dedicated cloud deployment options with multi-region redundancy, automated failover, and guaranteed 99.9% uptime SLA.' },
  { icon: Users, title: 'SSO & Identity', description: 'SAML 2.0, OAuth 2.0, OpenID Connect. Integrate with Okta, Azure AD, Google Workspace, and any SAML-compliant identity provider.' },
  { icon: Clock, title: '99.9% Uptime SLA', description: 'Enterprise-grade infrastructure with automated failover, real-time monitoring, and financially backed uptime guarantees for mission-critical operations.' },
  { icon: Headphones, title: '24/7 Premium Support', description: 'Dedicated account managers, implementation engineers, and around-the-clock technical support with 15-minute critical response SLA.' },
  { icon: Cpu, title: 'Custom AI Models', description: 'Train proprietary AI models on your organisation\'s data. Custom NLP, predictive algorithms, and automation tailored to your industry.' },
];

export default function EnterpriseFeatures() {
  return (
    <section id="enterprise" className="relative py-24 sm:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/[0.02] to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
        <SectionTitle
          label="Enterprise Features"
          title="Built for scale. Secured for compliance."
          subtitle="Tesle meets the security, performance, and compliance requirements of Africa's largest organisations and regulated industries."
        />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8 }}
          className="mt-16 sm:mt-20 grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
        >
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ delay: i * 0.06, duration: 0.5 }}
              >
                <ExpandableCard className="!p-5">
                  <div className="w-11 h-11 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Icon className="w-5 h-5 text-accent" />
                  </div>
                  <h3 className="text-base font-semibold text-text mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted leading-relaxed">{feature.description}</p>
                </ExpandableCard>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
