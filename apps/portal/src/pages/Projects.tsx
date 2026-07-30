import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../lib/api';

export default function Projects() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.projects.list()
      .then((data) => setProjects(data as any[]))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="flex justify-center py-12"><div className="animate-spin w-6 h-6 border-2 border-[#d4a853] border-t-transparent rounded-full" /></div>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">My Projects</h1>
      {projects.length === 0 ? (
        <div className="text-center py-12 text-gray-300">No projects assigned yet.</div>
      ) : (
        <div className="grid gap-4">
          {projects.map((p) => (
            <Link key={p.id} to={`/portal/projects/${p.id}`}
              className="bg-gray-900 border border-gray-800 rounded-xl p-5 hover:border-gray-700 transition-colors block">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold">{p.title}</h3>
                  <p className="text-sm text-gray-200 mt-1 line-clamp-2">{p.description}</p>
                </div>
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                  p.status === 'active' ? 'bg-green-900/30 text-green-400' :
                  p.status === 'completed' ? 'bg-blue-900/30 text-blue-400' :
                  'bg-gray-800 text-gray-200'
                }`}>{p.status}</span>
              </div>
              <div className="mt-3">
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-2 bg-gray-800 rounded-full overflow-hidden">
                    <div className="h-full bg-[#d4a853] rounded-full transition-all" style={{ width: `${p.progress}%` }} />
                  </div>
                  <span className="text-xs text-gray-200">{p.progress}%</span>
                </div>
              </div>
              {p.deadline && <p className="text-xs text-gray-300 mt-2">Deadline: {new Date(p.deadline).toLocaleDateString()}</p>}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
