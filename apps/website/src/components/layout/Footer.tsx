import { Link } from 'react-router-dom';

const footerColumns = [
  {
    title: 'Platform',
    links: [
      { label: 'Enterprise ERP', href: '/services/enterprise-erp' },
      { label: 'Customer CRM', href: '/services/customer-crm' },
      { label: 'Human Resources', href: '/services/human-resources' },
      { label: 'Financial Management', href: '/services/financial-management' },
      { label: 'Project & Portfolio', href: '/services/project-and-portfolio' },
      { label: 'Business Intelligence', href: '/services/business-intelligence' },
    ],
  },
  {
    title: 'Modules',
    links: [
      { label: 'Customer Support', href: '/services/customer-support' },
      { label: 'Supply Chain', href: '/services/supply-chain' },
      { label: 'Payroll & Compliance', href: '/services/payroll-and-compliance' },
      { label: 'Inventory Management', href: '/services/inventory-management' },
      { label: 'Team Collaboration', href: '/services/team-collaboration' },
      { label: 'Platform & API', href: '/services/platform-and-api' },
    ],
  },
  {
    title: 'Solutions',
    links: [
      { label: 'Financial Services', href: '/industries' },
      { label: 'Telecommunications', href: '/industries' },
      { label: 'Retail & E-Commerce', href: '/industries' },
      { label: 'Healthcare', href: '/industries' },
      { label: 'Manufacturing', href: '/industries' },
      { label: 'Government', href: '/industries' },
    ],
  },
  {
    title: 'Developers',
    links: [
      { label: 'API Reference', href: '/developers' },
      { label: 'SDKs & Libraries', href: '/developers' },
      { label: 'Integration Guides', href: '/developers' },
      { label: 'Webhooks', href: '/developers' },
      { label: 'Status Page', href: '/developers' },
      { label: 'Changelog', href: '/developers' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About Us', href: '/about' },
      { label: 'Careers', href: '/careers' },
      { label: 'Pricing', href: '/pricing' },
      { label: 'Case Studies', href: '/portfolio' },
      { label: 'Blog', href: '/blog' },
      { label: 'Contact', href: '/contact' },
    ],
  },
];

const socialLinks = [
  {
    label: 'Twitter / X',
    href: 'https://x.com',
    icon: <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>,
  },
  {
    label: 'GitHub',
    href: 'https://github.com',
    icon: <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>,
  },
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com',
    icon: <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>,
  },
  {
    label: 'YouTube',
    href: 'https://youtube.com',
    icon: <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>,
  },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-glass bg-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 lg:gap-12">
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center gap-2.5 mb-4">
              <img src="/images/tesle-logo.png" alt="Tesle" className="h-8 w-auto" />
            </Link>
            <p className="text-sm text-muted leading-relaxed max-w-xs">
              The AI-native operating system for African businesses. Unifying ERP, CRM, HR, financials, and analytics into one platform.
            </p>
            <div className="flex items-center gap-3 mt-6">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-9 h-9 rounded-lg border border-glass bg-glass flex items-center justify-center text-muted hover:text-accent hover:border-accent/30 transition-colors"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {footerColumns.map((col) => (
            <div key={col.title}>
              <h4 className="text-text text-sm font-semibold mb-4">
                {col.title}
              </h4>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      className="text-sm text-muted hover:text-text transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 pt-8 border-t border-glass flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted">
            &copy; {currentYear} Tesle. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-sm text-muted hover:text-text transition-colors">Privacy Policy</a>
            <span className="text-muted/80">|</span>
            <a href="#" className="text-sm text-muted hover:text-text transition-colors">Terms of Service</a>
            <span className="text-muted/80">|</span>
            <a href="#" className="text-sm text-muted hover:text-text transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
