import type { ComponentType, SVGProps } from 'react';
import {
  ArrowLeftRight, BarChart3, Blocks, BookOpen, Bot, Briefcase, Building2, CalendarCheck, Camera,
  Clapperboard, Code2, Gem, Globe, GraduationCap, Headphones, Heart, HeartPulse, Kanban,
  Landmark, LayoutDashboard, MapPin, MessageSquare, Monitor, Music4, Package, Palette,
  PenTool, Plane, Receipt, Search, Share2, Smartphone, Sun, Target, TrendingUp, Truck, Users,
  Video, Wifi, Zap, HelpCircle, Image as LucideImage, Heart as HeartIcon,
} from 'lucide-react';

const iconMap: Record<string, ComponentType<SVGProps<SVGSVGElement>>> = {
  ArrowLeftRight, BarChart3, Blocks, BookOpen, Bot, Briefcase, Building2, CalendarCheck, Camera,
  Clapperboard, Code2, Gem, Globe, GraduationCap, Headphones: Headphones, HeadphonesIcon: Headphones, Heart, HeartPulse, Kanban,
  Landmark, LayoutDashboard, MapPin, MessageSquare, Monitor, Music4, Package, Palette,
  PenTool, Plane, Receipt, Search, Share2, Smartphone, Sun, Target, TrendingUp, Truck, Users,
  Video, Wifi, Zap, HelpCircle, Image: LucideImage,
};

export function getIcon(name: string): ComponentType<SVGProps<SVGSVGElement>> {
  return iconMap[name] || iconMap.HelpCircle;
}
