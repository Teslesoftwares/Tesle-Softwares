import type { ComponentType, SVGProps } from 'react';
import {
  ArrowLeftRight, BookOpen, Bot, Building2, CalendarCheck, Camera, Clapperboard, Code2,
  Gem, Globe, GraduationCap, Heart, HeartPulse, MapPin, Monitor, Music4, Package, Palette,
  PenTool, Plane, Search, Share2, Smartphone, Sun, Target, TrendingUp, Video, Wifi, Zap,
  HelpCircle, Image as LucideImage, Heart as HeartIcon,
} from 'lucide-react';

const iconMap: Record<string, ComponentType<SVGProps<SVGSVGElement>>> = {
  ArrowLeftRight, BookOpen, Bot, Building2, CalendarCheck, Camera, Clapperboard, Code2,
  Gem, Globe, GraduationCap, Heart, HeartPulse, MapPin, Monitor, Music4, Package, Palette,
  PenTool, Plane, Search, Share2, Smartphone, Sun, Target, TrendingUp, Video, Wifi, Zap,
  HelpCircle, Image: LucideImage,
};

export function getIcon(name: string): ComponentType<SVGProps<SVGSVGElement>> {
  return iconMap[name] || iconMap.HelpCircle;
}
