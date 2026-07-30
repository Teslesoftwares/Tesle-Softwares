import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Check, Plus } from 'lucide-react';
import { SEO } from '@/components/layout/SEO';
import { products } from '@/data/products';
import { useInstalledApps } from '@/hooks/useInstalledApps';

const container = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.03 } },
};

const item = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

export default function Products() {
  const { isInstalled, install, uninstall } = useInstalledApps();

  return (
    <main className="h-full overflow-hidden">
      <SEO title="Products" description="Explore the complete Tesle product ecosystem  ERP, CRM, HR, Accounting, Inventory, POS, Projects, and more." />

      <div className="h-full flex flex-col items-center justify-center px-4 sm:px-6 py-20">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center mb-6 sm:mb-8">
          <span className="inline-block text-xs font-semibold tracking-widest uppercase text-accent mb-3 px-4 py-1.5 rounded-full border border-accent/20 bg-accent/5">
            Products
          </span>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-text">
            The complete <span className="text-gradient">Tesle ecosystem</span>
          </h1>
          <p className="mt-2 text-sm text-muted max-w-lg mx-auto">
            Install the apps you need. They'll appear in your sidebar for quick access.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-3 sm:grid-cols-5 gap-3 sm:gap-4 max-w-3xl w-full"
        >
          {products.map((product) => {
            const Icon = product.icon;
            const installed = isInstalled(product.slug);
            return (
              <motion.div key={product.slug} variants={item} className="relative group/card">
                <Link
                  to={`/products/${product.slug}`}
                  className="flex flex-col items-center text-center p-4 sm:p-5 rounded-2xl bg-white/[0.04] border border-white/[0.06] backdrop-blur-md hover:bg-white/[0.08] hover:border-white/[0.12] hover:shadow-lg transition-all duration-300 cursor-pointer"
                >
                  <div
                    className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl flex items-center justify-center mb-2 transition-transform duration-300 group-hover/card:scale-110"
                    style={{
                      backgroundColor: product.hex,
                      boxShadow: `0 3px 12px ${product.hex}30`,
                    }}
                  >
                    <Icon className="w-7 h-7 sm:w-8 sm:h-8 text-white" strokeWidth={1.8} />
                  </div>
                  <h3 className="text-sm font-semibold text-text leading-tight">
                    {product.name.replace('Tesle ', '')}
                  </h3>
                </Link>

                {/* Install/Uninstall button */}
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    installed ? uninstall(product.slug) : install(product.slug);
                  }}
                  className={`absolute -top-1.5 -right-1.5 w-6 h-6 rounded-full flex items-center justify-center text-white text-xs transition-all duration-200 shadow-md hover:scale-110 ${
                    installed
                      ? 'bg-emerald-500 hover:bg-red-500'
                      : 'bg-accent hover:bg-accent-dark'
                  }`}
                  title={installed ? 'Uninstall' : 'Install'}
                >
                  {installed ? <Check className="w-3 h-3" strokeWidth={3} /> : <Plus className="w-3 h-3" strokeWidth={3} />}
                </button>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </main>
  );
}
