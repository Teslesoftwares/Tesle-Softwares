import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  LayoutDashboard, Users, ShoppingCart, Briefcase, Receipt, Landmark,
  Package, CreditCard, Kanban, GraduationCap, HeartPulse, Church,
  Hotel, Truck, Brain, ArrowRight,
} from 'lucide-react';

const products = [
  { slug: 'erp', name: 'ERP', icon: LayoutDashboard, color: 'from-cyan-400 to-blue-500', desc: 'Finance, operations & supply chain' },
  { slug: 'crm', name: 'CRM', icon: Users, color: 'from-violet-400 to-purple-600', desc: 'Sales & customer relationships' },
  { slug: 'hr', name: 'HR', icon: Briefcase, color: 'from-pink-400 to-rose-600', desc: 'Human resource management' },
  { slug: 'accounting', name: 'Accounting', icon: Landmark, color: 'from-emerald-400 to-green-600', desc: 'GL, AP/AR & reporting' },
  { slug: 'payroll', name: 'Payroll', icon: Receipt, color: 'from-amber-400 to-orange-500', desc: 'Multi-country payroll' },
  { slug: 'inventory', name: 'Inventory', icon: Package, color: 'from-teal-400 to-cyan-600', desc: 'Multi-warehouse control' },
  { slug: 'procurement', name: 'Procurement', icon: ShoppingCart, color: 'from-blue-400 to-indigo-500', desc: 'Sourcing & purchase mgmt' },
  { slug: 'projects', name: 'Projects', icon: Kanban, color: 'from-orange-400 to-red-500', desc: 'Agile boards & planning' },
  { slug: 'pos', name: 'POS', icon: CreditCard, color: 'from-fuchsia-400 to-pink-500', desc: 'Point of sale & payments' },
  { slug: 'logistics', name: 'Logistics', icon: Truck, color: 'from-sky-400 to-blue-500', desc: 'Fleet & delivery tracking' },
  { slug: 'school', name: 'School', icon: GraduationCap, color: 'from-lime-400 to-green-500', desc: 'Education management' },
  { slug: 'hospital', name: 'Hospital', icon: HeartPulse, color: 'from-red-400 to-rose-600', desc: 'Healthcare & EHR' },
  { slug: 'hotel', name: 'Hotel', icon: Hotel, color: 'from-indigo-400 to-violet-500', desc: 'Hospitality PMS' },
  { slug: 'church', name: 'Church', icon: Church, color: 'from-yellow-400 to-amber-500', desc: 'Ministry management' },
  { slug: 'ai', name: 'AI', icon: Brain, color: 'from-accent to-accent-dark', desc: 'Cross-product intelligence', badge: 'New' },
];

export function ProductGrid() {
  return (
    <section className="py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-center mb-8"
        >
          <h2 className="heading text-2xl sm:text-3xl text-text">
            All products. <span className="text-gradient">One platform.</span>
          </h2>
          <p className="mt-2 text-sm text-muted max-w-xl mx-auto">
            15 integrated modules  replace 10+ disconnected tools with one AI-powered system.
          </p>
        </motion.div>

        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-5 gap-3 sm:gap-4">
          {products.map((product, i) => {
            const Icon = product.icon;
            return (
              <motion.div
                key={product.slug}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ delay: i * 0.03, duration: 0.3 }}
              >
                <Link
                  to={`/products/${product.slug}`}
                  className="group flex flex-col items-center gap-2.5 p-4 sm:p-5 rounded-2xl bg-surface border border-glass hover:border-accent/20 hover:shadow-lg hover:shadow-accent/5 transition-all duration-200"
                >
                  <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br ${product.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-200`}>
                    <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                  </div>
                  <div className="text-center">
                    <span className="text-xs sm:text-sm font-semibold text-text block">{product.name}</span>
                    <span className="text-[10px] sm:text-xs text-muted hidden sm:block mt-0.5">{product.desc}</span>
                  </div>
                  {product.badge && (
                    <span className="absolute top-2 right-2 text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-accent text-white">
                      {product.badge}
                    </span>
                  )}
                </Link>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-6 text-center"
        >
          <Link
            to="/products"
            className="inline-flex items-center gap-2 text-sm font-semibold text-accent hover:text-accent/80 transition-colors"
          >
            View all products <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
