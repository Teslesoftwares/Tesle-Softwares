import { useState, useEffect } from 'react';
import { Calendar, Plus, Clock, Video } from 'lucide-react';
import { api } from '../lib/api';

export default function Meetings() {
  const [meetings, setMeetings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: '', description: '', meeting_date: '', duration: 30, meeting_url: '' });

  const fetchMeetings = () => {
    setLoading(true);
    api.meetings.list()
      .then((data) => setMeetings(data as any[]))
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchMeetings(); }, []);

  const createMeeting = async () => {
    if (!form.title || !form.meeting_date) return;
    await api.meetings.create({ ...form, meeting_date: new Date(form.meeting_date).toISOString() });
    setForm({ title: '', description: '', meeting_date: '', duration: 30, meeting_url: '' });
    setShowForm(false);
    fetchMeetings();
  };

  if (loading) return <div className="flex justify-center py-12"><div className="animate-spin w-6 h-6 border-2 border-[#d4a853] border-t-transparent rounded-full" /></div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Meetings</h1>
          <p className="text-sm text-gray-200 mt-1">Schedule and manage meetings</p>
        </div>
        <button onClick={() => setShowForm(!showForm)}
          className="px-4 py-2 bg-[#d4a853] hover:bg-[#b8943a] text-black font-medium rounded-lg text-sm transition-colors flex items-center gap-2">
          <Plus size={16} /> Schedule Meeting
        </button>
      </div>

      {showForm && (
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-5 mb-6 space-y-4">
          <h3 className="font-semibold">Schedule Meeting</h3>
          <input type="text" placeholder="Meeting title" value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-sm text-white" />
          <textarea placeholder="Description (optional)" rows={3} value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-sm text-white resize-y" />
          <div className="grid grid-cols-2 gap-4">
            <input type="datetime-local" value={form.meeting_date}
              onChange={(e) => setForm({ ...form, meeting_date: e.target.value })}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-sm text-white" />
            <input type="number" placeholder="Duration (min)" value={form.duration}
              onChange={(e) => setForm({ ...form, duration: parseInt(e.target.value) || 30 })}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-sm text-white" />
          </div>
          <input type="url" placeholder="Meeting link (optional)" value={form.meeting_url}
            onChange={(e) => setForm({ ...form, meeting_url: e.target.value })}
            className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-sm text-white" />
          <div className="flex justify-end gap-3">
            <button onClick={() => setShowForm(false)} className="px-4 py-2 text-sm text-gray-200 hover:text-white">Cancel</button>
            <button onClick={createMeeting} className="px-4 py-2 bg-[#d4a853] hover:bg-[#b8943a] text-black font-medium rounded-lg text-sm">Schedule</button>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {meetings.length === 0 ? (
          <div className="text-center py-12 text-gray-300">No meetings scheduled.</div>
        ) : (
          meetings.map((m) => (
            <div key={m.id} className="bg-gray-900 border border-gray-800 rounded-xl p-5">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <Calendar size={20} className="text-[#d4a853] mt-0.5" />
                  <div>
                    <h3 className="font-semibold">{m.title}</h3>
                    {m.description && <p className="text-sm text-gray-200 mt-1">{m.description}</p>}
                    <div className="flex items-center gap-4 mt-2 text-xs text-gray-300">
                      <span className="flex items-center gap-1"><Clock size={12} /> {new Date(m.meeting_date).toLocaleString()}</span>
                      <span>{m.duration} min</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                    m.status === 'scheduled' ? 'bg-green-900/30 text-green-400' :
                    m.status === 'completed' ? 'bg-blue-900/30 text-blue-400' :
                    m.status === 'cancelled' ? 'bg-red-900/30 text-red-400' :
                    'bg-gray-800 text-gray-200'
                  }`}>{m.status}</span>
                  {m.meeting_url && (
                    <a href={m.meeting_url} target="_blank" rel="noopener noreferrer"
                      className="p-2 bg-[#d4a853]/10 text-[#d4a853] rounded-lg hover:bg-[#d4a853]/20 transition-colors">
                      <Video size={16} />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
