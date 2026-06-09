import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { CheckCircle2, Circle } from 'lucide-react';
import { api } from '../lib/api';

export default function ProjectDetail() {
  const { id } = useParams();
  const [project, setProject] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.projects.get(Number(id))
      .then((data) => setProject(data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="flex justify-center py-12"><div className="animate-spin w-6 h-6 border-2 border-[#d4a853] border-t-transparent rounded-full" /></div>;
  if (!project) return <div className="text-center py-12 text-gray-500">Project not found.</div>;

  const completedMilestones = project.milestones?.filter((m: any) => m.completed).length || 0;
  const totalMilestones = project.milestones?.length || 0;

  return (
    <div className="max-w-3xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold">{project.title}</h1>
        <p className="text-sm text-gray-400 mt-1">{project.description}</p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
          <p className="text-xs text-gray-400">Status</p>
          <p className="text-lg font-semibold capitalize">{project.status}</p>
        </div>
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
          <p className="text-xs text-gray-400">Progress</p>
          <p className="text-lg font-semibold">{project.progress}%</p>
        </div>
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
          <p className="text-xs text-gray-400">Milestones</p>
          <p className="text-lg font-semibold">{completedMilestones}/{totalMilestones}</p>
        </div>
      </div>

      <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
        <h2 className="font-semibold mb-4">Milestones</h2>
        {!project.milestones?.length ? (
          <p className="text-sm text-gray-500">No milestones defined.</p>
        ) : (
          <div className="space-y-3">
            {project.milestones.map((m: any) => (
              <div key={m.id} className="flex items-start gap-3">
                {m.completed ? (
                  <CheckCircle2 size={20} className="text-green-400 mt-0.5 flex-shrink-0" />
                ) : (
                  <Circle size={20} className="text-gray-600 mt-0.5 flex-shrink-0" />
                )}
                <div className="flex-1">
                  <p className={`text-sm font-medium ${m.completed ? 'text-gray-400' : ''}`}>{m.title}</p>
                  {m.description && <p className="text-xs text-gray-500">{m.description}</p>}
                  {m.due_date && <p className="text-xs text-gray-600 mt-1">Due: {new Date(m.due_date).toLocaleDateString()}</p>}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {project.budget && (
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
          <h2 className="font-semibold mb-2">Budget</h2>
          <p className="text-2xl font-bold text-[#d4a853]">${Number(project.budget).toLocaleString()}</p>
        </div>
      )}
    </div>
  );
}
