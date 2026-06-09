import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Code, Image, FileText, MessageSquare, Briefcase, Users,
  TrendingUp, Clock,
} from 'lucide-react';
import { api } from '../lib/api';
import { StatsCard } from '../components/StatsCard';

type DashboardData = {
  stats: Record<string, number>;
  leadsByStatus: { status: string; count: number }[];
  recentLeads: { id: number; name: string; email: string; company: string; interest: string; status: string; created_at: string }[];
  recentBlog: { id: number; title: string; slug: string; published: boolean; created_at: string }[];
};

const statConfig: { key: string; label: string; icon: React.ReactNode; color: string }[] = [
  { key: 'services', label: 'Services', icon: <Code size={22} />, color: 'text-blue-400' },
  { key: 'portfolio', label: 'Portfolio', icon: <Image size={22} />, color: 'text-purple-400' },
  { key: 'blogPosts', label: 'Blog Posts', icon: <FileText size={22} />, color: 'text-green-400' },
  { key: 'testimonials', label: 'Testimonials', icon: <MessageSquare size={22} />, color: 'text-yellow-400' },
  { key: 'careers', label: 'Careers', icon: <Briefcase size={22} />, color: 'text-cyan-400' },
  { key: 'totalLeads', label: 'Total Leads', icon: <Users size={22} />, color: 'text-pink-400' },
];

export default function Dashboard() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.dashboard.stats()
      .then((d) => setData(d as DashboardData))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin w-8 h-8 border-2 border-[#d4a853] border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-sm text-gray-400 mt-1">Overview of your site</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {statConfig.map((s) => (
          <StatsCard key={s.key} label={s.label} value={data?.stats[s.key] ?? 0} icon={s.icon} color={s.color} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Leads */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold flex items-center gap-2">
              <Clock size={16} className="text-gray-400" />
              Recent Leads
            </h2>
            <Link to="/admin/leads" className="text-xs text-[#d4a853] hover:underline">View All</Link>
          </div>
          <div className="space-y-3">
            {data?.recentLeads.map((lead) => (
              <div key={lead.id} className="flex items-center justify-between py-2 border-b border-gray-800/50 last:border-0">
                <div>
                  <p className="text-sm font-medium">{lead.name}</p>
                  <p className="text-xs text-gray-400">{lead.email}{lead.company ? ` · ${lead.company}` : ''}</p>
                </div>
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                  lead.status === 'new' ? 'bg-green-900/30 text-green-400' :
                  lead.status === 'contacted' ? 'bg-blue-900/30 text-blue-400' :
                  lead.status === 'qualified' ? 'bg-purple-900/30 text-purple-400' :
                  'bg-gray-800 text-gray-400'
                }`}>
                  {lead.status}
                </span>
              </div>
            ))}
            {!data?.recentLeads.length && <p className="text-sm text-gray-500">No leads yet.</p>}
          </div>
        </div>

        {/* Recent Blog Posts */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold flex items-center gap-2">
              <TrendingUp size={16} className="text-gray-400" />
              Recent Blog Posts
            </h2>
            <Link to="/admin/blog" className="text-xs text-[#d4a853] hover:underline">View All</Link>
          </div>
          <div className="space-y-3">
            {data?.recentBlog.map((post) => (
              <div key={post.id} className="flex items-center justify-between py-2 border-b border-gray-800/50 last:border-0">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{post.title}</p>
                </div>
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ml-3 ${
                  post.published ? 'bg-green-900/30 text-green-400' : 'bg-gray-800 text-gray-400'
                }`}>
                  {post.published ? 'Published' : 'Draft'}
                </span>
              </div>
            ))}
            {!data?.recentBlog.length && <p className="text-sm text-gray-500">No posts yet.</p>}
          </div>
        </div>
      </div>

      {/* Leads by Status */}
      {data?.leadsByStatus && data.leadsByStatus.length > 0 && (
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
          <h2 className="font-semibold mb-4">Leads by Status</h2>
          <div className="flex gap-3 flex-wrap">
            {data.leadsByStatus.map((item) => (
              <div key={item.status} className="bg-gray-800 px-4 py-2 rounded-lg text-sm">
                <span className="text-gray-400 capitalize">{item.status}:</span>{' '}
                <span className="font-bold text-[#d4a853]">{item.count}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
