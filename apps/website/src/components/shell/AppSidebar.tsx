import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { type LucideIcon } from 'lucide-react';
import {
  ChevronLeft, ChevronRight, Search, Home, Box, Lightbulb,
  Building2, BookOpen, DollarSign, Briefcase, Headphones,
  Settings, HelpCircle, ChevronDown,
  LayoutDashboard, Users, Landmark, Kanban, BarChart3,
  ShoppingCart, Receipt, Package, Truck, CreditCard,
  GraduationCap, HeartPulse, Hotel, Church, Brain,
  Newspaper, Code2, Bookmark, Sparkles, FolderOpen, Bell,
  BarChart2, ShoppingBag, MessageSquare, Grid3X3,
  Plus,
} from 'lucide-react';
import { useShell } from './ShellContext';
import { useInstalledApps } from '@/hooks/useInstalledApps';
import { products } from '@/data/products';

interface NavItem {
  id: string;
  label: string;
  icon: LucideIcon;
  href?: string;
  badge?: number;
  children?: { id: string; label: string; icon: LucideIcon; href: string }[];
}

const mainNav: NavItem[] = [
  { id: 'home', label: 'Home', icon: Home, href: '/' },
  { id: 'ai', label: 'Tesle AI', icon: Brain, href: '/products/ai', badge: 1 },
  { id: 'solutions', label: 'Solutions', icon: Lightbulb, children: [
    { id: 'financial-services', label: 'Financial Services', icon: Landmark, href: '/industries/financial-services' },
    { id: 'healthcare', label: 'Healthcare', icon: HeartPulse, href: '/industries/healthcare' },
    { id: 'education', label: 'Education', icon: GraduationCap, href: '/industries/education' },
    { id: 'retail', label: 'Retail', icon: ShoppingCart, href: '/industries/retail' },
    { id: 'manufacturing', label: 'Manufacturing', icon: Box, href: '/industries/manufacturing' },
    { id: 'construction', label: 'Construction', icon: Box, href: '/industries/construction' },
  ]},
  { id: 'industries', label: 'Industries', icon: Building2, href: '/industries' },
  { id: 'enterprise', label: 'Enterprise', icon: Briefcase, href: '/enterprise' },
  { id: 'workspace', label: 'Workspace', icon: Grid3X3, href: '/workspace', badge: 1 },
];

const secondaryNav: NavItem[] = [
  { id: 'blog', label: 'Blog', icon: Newspaper, href: '/blog' },
  { id: 'portfolio', label: 'Case Studies', icon: Bookmark, href: '/portfolio' },
  { id: 'developers', label: 'Developers', icon: Code2, href: '/developers' },
  { id: 'pricing', label: 'Pricing', icon: DollarSign, href: '/pricing' },
  { id: 'careers', label: 'Careers', icon: Briefcase, href: '/careers' },
  { id: 'contact', label: 'Contact', icon: Headphones, href: '/contact' },
  { id: 'resources', label: 'Resources', icon: BookOpen, href: '/resources' },
];

const productIconMap: Record<string, LucideIcon> = {};
products.forEach((p) => { productIconMap[p.slug] = p.icon; });

export function AppSidebar() {
  const { sidebarCollapsed, toggleSidebar, setCommandPaletteOpen } = useShell();
  const { installed } = useInstalledApps();
  const location = useLocation();
  const collapsed = sidebarCollapsed;

  const isActive = (href?: string) => href ? location.pathname === href || location.pathname.startsWith(href + '/') : false;

  const productsActive = location.pathname.startsWith('/products');

  const installedApps = installed
    .map((slug) => {
      const product = products.find((p) => p.slug === slug);
      if (!product) return null;
      const icon = productIconMap[slug] || Box;
      return { id: slug, label: product.name.replace('Tesle ', ''), desc: product.tagline, icon: icon as unknown as LucideIcon, href: `/products/${slug}` };
    })
    .filter(Boolean) as { id: string; label: string; desc: string; icon: LucideIcon; href: string }[];

  return (
    <aside
className={`hidden lg:flex h-screen flex-col bg-surface border-r border-glass transition-all duration-300 shrink-0 ${
         collapsed ? 'w-[68px]' : 'w-[248px]'
       }`}
    >
      {/* Logo */}
      <div className="flex items-center h-14 px-3 border-b border-glass shrink-0">
        <Link to="/" className="flex items-center min-w-0">
          <div className="w-16 h-16 rounded-lg flex items-center justify-center overflow-hidden shrink-0">
            <img src="/images/tesle-logo.png" alt="Tesle" className="w-full h-full object-contain" />
          </div>
        </Link>
        <button
          onClick={toggleSidebar}
          className="ml-auto p-1.5 rounded-lg text-muted hover:text-text hover:bg-glass-hover transition-colors shrink-0"
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      {/* Search trigger */}
      {!collapsed && (
        <div className="px-3 pt-3 pb-1">
          <button
            onClick={() => setCommandPaletteOpen(true)}
            className="w-full flex items-center gap-2 px-3 py-2 text-sm text-muted bg-glass border border-glass rounded-xl hover:bg-glass-hover hover:text-text transition-colors"
          >
            <Search className="w-4 h-4 shrink-0" />
            <span className="truncate">Search...</span>
            <kbd className="ml-auto text-[10px] px-1.5 py-0.5 bg-bg border border-glass rounded text-muted">⌘K</kbd>
          </button>
        </div>
      )}

      {/* Main Nav */}
      <nav className="flex-1 overflow-y-auto py-2 px-2 space-y-0.5 scrollbar-thin">
        {/* Home */}
        <Link
          to="/"
          className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition-all ${
            location.pathname === '/'
              ? 'bg-accent/10 text-accent'
              : 'text-muted hover:text-text hover:bg-glass-hover'
          }`}
          title={collapsed ? 'Home' : undefined}
        >
          <Home className="w-5 h-5 shrink-0" />
          {!collapsed && <span className="truncate">Home</span>}
        </Link>

        {/* Products section  single link + installed apps */}
        <div>
          <Link
            to="/products"
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition-all ${
              productsActive
                ? 'bg-accent/10 text-accent'
                : 'text-muted hover:text-text hover:bg-glass-hover'
            }`}
            title={collapsed ? 'Products' : undefined}
          >
            <Box className="w-5 h-5 shrink-0" />
            {!collapsed && (
              <>
                <span className="truncate">Products</span>
                <motion.span animate={{ rotate: installedApps.length > 0 ? 0 : 0 }} transition={{ duration: 0.2 }} className="ml-auto">
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform ${productsActive ? 'rotate-180' : ''}`} />
                </motion.span>
              </>
            )}
          </Link>

          {/* Installed apps sub-items */}
          {!collapsed && installedApps.length > 0 && (
            <div className="ml-3 pl-3 border-l border-glass mt-0.5 space-y-0.5">
              {installedApps.map((app) => {
                const isCurrent = location.pathname === app.href;
                return (
                  <Link
                    key={app.id}
                    to={app.href}
                    className={`flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-[13px] transition-colors ${
                      isCurrent
                        ? 'text-accent font-medium bg-accent/5'
                        : 'text-muted hover:text-text hover:bg-glass-hover'
                    }`}
                  >
                    <app.icon className="w-4 h-4 shrink-0" />
                    <div className="min-w-0">
                      <span className="truncate block leading-tight">{app.label}</span>
                      <span className="text-[10px] text-muted/60 truncate block leading-tight">{app.desc}</span>
                    </div>
                  </Link>
                );
              })}
              <Link
                to="/products"
                className="flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-[13px] text-accent/60 hover:text-accent transition-colors"
              >
                <Plus className="w-4 h-4 shrink-0" />
                <span className="truncate">Install more</span>
              </Link>
            </div>
          )}
        </div>

        {mainNav.map((item) => (
          <SidebarItem key={item.id} item={item} collapsed={collapsed} isActive={isActive} location={location} />
        ))}

        <div className="my-2 mx-3 border-t border-glass" />

        <p className={`px-3 pt-2 pb-1 text-[10px] font-semibold text-muted uppercase tracking-wider ${collapsed ? 'hidden' : ''}`}>
          Resources
        </p>
        {secondaryNav.map((item) => (
          <SidebarItem key={item.id} item={item} collapsed={collapsed} isActive={isActive} location={location} />
        ))}
      </nav>

      {/* Bottom */}
      <div className="p-2 border-t border-glass space-y-0.5">
        <Link
          to="/contact"
          className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium text-muted hover:text-text hover:bg-glass-hover transition-all"
          title={collapsed ? 'Get Help' : undefined}
        >
          <HelpCircle className="w-5 h-5 shrink-0" />
          {!collapsed && <span className="truncate">Get Help</span>}
        </Link>
      </div>
    </aside>
  );
}

function SidebarItem({
  item, collapsed, isActive, location,
}: {
  item: NavItem;
  collapsed: boolean;
  isActive: (href?: string) => boolean;
  location: ReturnType<typeof useLocation>;
}) {
  const active = isActive(item.href);
  const hasChildren = item.children && item.children.length > 0;
  const childActive = hasChildren && item.children!.some((c) => location.pathname.startsWith(c.href));
  const [expanded, setExpanded] = useState(childActive);

  if (hasChildren) {
    return (
      <div>
        <button
          onClick={() => setExpanded(!expanded)}
          className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition-all ${
            childActive || expanded
              ? 'bg-accent/10 text-accent'
              : 'text-muted hover:text-text hover:bg-glass-hover'
          }`}
          title={collapsed ? item.label : undefined}
        >
          <item.icon className="w-5 h-5 shrink-0" />
          {!collapsed && (
            <>
              <span className="truncate">{item.label}</span>
              <motion.span animate={{ rotate: expanded ? 180 : 0 }} transition={{ duration: 0.2 }} className="ml-auto">
                <ChevronDown className="w-3.5 h-3.5" />
              </motion.span>
            </>
          )}
          {item.badge !== undefined && item.badge > 0 && (
            <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-accent/20 text-accent ${
              collapsed ? 'absolute -top-0.5 -right-0.5' : 'ml-auto'
            }`}>
              {item.badge}
            </span>
          )}
        </button>
        <AnimatePresence>
          {expanded && !collapsed && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="ml-3 pl-3 border-l border-glass mt-0.5 space-y-0.5">
                {item.children!.map((child) => {
                  const childIsCurrent = location.pathname === child.href;
                  return (
                    <Link
                      key={child.id}
                      to={child.href}
                      className={`flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-[13px] transition-colors ${
                        childIsCurrent
                          ? 'text-accent font-medium bg-accent/5'
                          : 'text-muted hover:text-text hover:bg-glass-hover'
                      }`}
                    >
                      <child.icon className="w-4 h-4 shrink-0" />
                      <span className="truncate">{child.label}</span>
                    </Link>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  return (
    <Link
      to={item.href || '#'}
      className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition-all relative ${
        active
          ? 'bg-accent/10 text-accent'
          : 'text-muted hover:text-text hover:bg-glass-hover'
      }`}
      title={collapsed ? item.label : undefined}
    >
      <item.icon className="w-5 h-5 shrink-0" />
      {!collapsed && <span className="truncate">{item.label}</span>}
      {item.badge !== undefined && item.badge > 0 && (
        <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-accent/20 text-accent ${
          collapsed ? 'absolute -top-0.5 -right-0.5' : 'ml-auto'
        }`}>
          {item.badge}
        </span>
      )}
    </Link>
  );
}
