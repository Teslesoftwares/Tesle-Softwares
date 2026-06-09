import { motion } from 'framer-motion';

const clients = [
  { name: 'Nexus Retail', sector: 'E-Commerce' },
  { name: 'HealthSync', sector: 'Health Tech' },
  { name: 'Pinnacle Brands', sector: 'Consumer Goods' },
  { name: 'CloudBase', sector: 'SaaS' },
  { name: 'Quantum Finance', sector: 'Fintech' },
  { name: 'GreenLeaf Energy', sector: 'Clean Energy' },
  { name: 'MetroLogistics', sector: 'Supply Chain' },
  { name: 'Apex Media', sector: 'Media & Entertainment' },
];

export default function TrustedClients() {
  return (
    <section className="relative py-16 sm:py-20 border-t border-white/[0.03]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center text-xs sm:text-sm text-muted tracking-widest uppercase mb-10"
        >
          Trusted by innovative companies
        </motion.p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-10">
          {clients.map((client, i) => (
            <motion.div
              key={client.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: i * 0.05, duration: 0.4 }}
              className="flex flex-col items-center justify-center p-4 sm:p-6 rounded-xl glass hover:bg-white/[0.03] transition-colors group"
            >
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent/10 to-purple/10 border border-white/[0.06] flex items-center justify-center mb-3">
                <span className="text-lg font-bold text-accent">{client.name[0]}</span>
              </div>
              <span className="text-sm font-medium text-white/80 group-hover:text-white transition-colors">
                {client.name}
              </span>
              <span className="text-xs text-muted mt-0.5">{client.sector}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
