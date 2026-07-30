import { motion } from 'framer-motion';
import { InfinityIcon } from 'lucide-react';

const clients = [
  { name: 'Transcorp Africa', sector: 'Conglomerate' },
  { name: 'Pivot Financial Services', sector: 'Banking' },
  { name: 'East Africa Logistics', sector: 'Supply Chain' },
  { name: 'West African Banking Corp', sector: 'Financial Services' },
  { name: 'Titan Healthcare', sector: 'Healthcare' },
  { name: 'Metropolitan Insurance Group', sector: 'Insurance' },
  { name: 'Nile Telecom', sector: 'Telecommunications' },
  { name: 'Sahara Manufacturing', sector: 'Manufacturing' },
  { name: 'Lagos Retail Group', sector: 'Retail' },
  { name: 'Cape Education Trust', sector: 'Education' },
  { name: 'AfriGovernment Services', sector: 'Public Sector' },
  { name: 'Kalahari Hospitality', sector: 'Hospitality' },
];

export default function TrustedClients() {
  return (
    <section className="relative py-8 sm:py-12 border-t border-glass">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center text-xs sm:text-sm text-muted tracking-widest uppercase mb-8"
        >
          Trusted by 200+ organisations across 15 African countries
        </motion.p>

        {/* Horizontal scroll carousel */}
        <div
          className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-2 scrollbar-none"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          <style>{`div::-webkit-scrollbar{display:none}`}</style>
          {clients.map((client, i) => (
            <motion.div
              key={client.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04, duration: 0.4 }}
              className="flex-shrink-0 snap-start w-[calc(50%-0.5rem)] md:w-[calc(25%-0.75rem)]"
            >
              <div className="flex flex-col items-center justify-center p-5 sm:p-6 rounded-xl card hover:card-hover transition-all duration-300 group cursor-pointer border border-glass hover:border-accent/20">
                <div className="w-12 h-12 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-lg font-bold text-accent/90 group-hover:text-accent transition-colors">
                    {client.name[0]}
                  </span>
                </div>
                <span className="text-sm font-medium text-text/80 group-hover:text-text transition-colors text-center">
                  {client.name}
                </span>
                <span className="text-xs text-muted mt-1 text-center">{client.sector}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Scroll hint dots */}
        <div className="flex items-center justify-center gap-1.5 mt-6">
          {Array.from({ length: Math.ceil(clients.length / 2) }).map((_, i) => (
            <span key={i} className="w-1.5 h-1.5 rounded-full bg-glass" />
          ))}
          <InfinityIcon className="w-3 h-3 text-accent/40 ml-2" />
        </div>
      </div>
    </section>
  );
}
