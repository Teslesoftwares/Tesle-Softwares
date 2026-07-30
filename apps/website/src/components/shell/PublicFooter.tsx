import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';

const footerLinks = {
  Products: [
    { label: 'ERP', href: '/products/erp' },
    { label: 'CRM', href: '/products/crm' },
    { label: 'HR', href: '/products/hr' },
    { label: 'Accounting', href: '/products/accounting' },
    { label: 'POS', href: '/products/pos' },
    { label: 'All Products', href: '/products' },
  ],
  Company: [
    { label: 'About Us', href: '/about' },
    { label: 'Careers', href: '/careers' },
    { label: 'Blog', href: '/blog' },
    { label: 'Case Studies', href: '/portfolio' },
    { label: 'Contact', href: '/contact' },
  ],
  Resources: [
    { label: 'Developers', href: '/developers' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'Enterprise', href: '/enterprise' },
    { label: 'Solutions', href: '/solutions' },
    { label: 'Industries', href: '/industries' },
  ],
};

export function PublicFooter() {
  return (
    <footer className="border-t border-glass bg-surface/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
        <div className="grid grid-cols-5 gap-4 sm:gap-6">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center mb-4">
              <div className="w-24 h-24 rounded-lg flex items-center justify-center overflow-hidden">
                <img src="/images/tesle-logo.png" alt="Tesle" className="w-full h-full object-contain" />
              </div>
            </Link>
            <p className="text-sm text-muted leading-relaxed mb-4">
              The AI-native operating system for African businesses. Unified ERP, CRM, HR, and more.
            </p>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-sm font-semibold text-text uppercase tracking-wider mb-3">{title}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link to={link.href} className="text-sm text-muted hover:text-accent transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold text-text uppercase tracking-wider mb-3">Contact</h4>
            <div className="space-y-3">
              <a href="mailto:hello@teslesoftwares.com" className="flex items-center gap-2 text-sm text-muted hover:text-accent transition-colors">
                <Mail className="w-4 h-4" /> hello@teslesoftwares.com
              </a>
              <a href="tel:+233538387208" className="flex items-center gap-2 text-sm text-muted hover:text-accent transition-colors">
                <Phone className="w-4 h-4" /> +23353 838 7208
              </a>
              <div className="flex items-center gap-2 text-sm text-muted">
                <MapPin className="w-4 h-4" /> Accra, Ghana
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-glass flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-sm text-muted">
            &copy; {new Date().getFullYear()} Tesle Technologies. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a href="#" className="text-sm text-muted hover:text-accent transition-colors">Privacy</a>
            <a href="#" className="text-sm text-muted hover:text-accent transition-colors">Terms</a>
            <a href="#" className="text-sm text-muted hover:text-accent transition-colors">Security</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
