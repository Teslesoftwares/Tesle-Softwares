import { useState, useEffect } from 'react';
import { Plus, MessageSquare } from 'lucide-react';
import { api } from '../lib/api';

export default function Tickets() {
  const [tickets, setTickets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ subject: '', description: '', priority: 'medium' });
  const [selected, setSelected] = useState<any>(null);
  const [comment, setComment] = useState('');

  const fetchTickets = () => {
    setLoading(true);
    api.tickets.list()
      .then((data) => setTickets(data as any[]))
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchTickets(); }, []);

  const createTicket = async () => {
    if (!form.subject) return;
    await api.tickets.create(form);
    setForm({ subject: '', description: '', priority: 'medium' });
    setShowForm(false);
    fetchTickets();
  };

  const openTicket = async (ticket: any) => {
    const data = await api.tickets.get(ticket.id);
    setSelected(data);
    setComment('');
  };

  const addComment = async () => {
    if (!comment || !selected) return;
    await api.tickets.addComment(selected.id, comment);
    setComment('');
    openTicket(selected);
  };

  if (loading) return <div className="flex justify-center py-12"><div className="animate-spin w-6 h-6 border-2 border-[#d4a853] border-t-transparent rounded-full" /></div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Support Tickets</h1>
          <p className="text-sm text-gray-400 mt-1">Get help from our team</p>
        </div>
        <button onClick={() => setShowForm(!showForm)}
          className="px-4 py-2 bg-[#d4a853] hover:bg-[#b8943a] text-black font-medium rounded-lg text-sm transition-colors flex items-center gap-2">
          <Plus size={16} /> New Ticket
        </button>
      </div>

      {showForm && (
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-5 mb-6 space-y-4">
          <h3 className="font-semibold">Create Ticket</h3>
          <input type="text" placeholder="Subject" value={form.subject}
            onChange={(e) => setForm({ ...form, subject: e.target.value })}
            className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-sm text-white" />
          <textarea placeholder="Describe your issue..." rows={4} value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-sm text-white resize-y" />
          <select value={form.priority} onChange={(e) => setForm({ ...form, priority: e.target.value })}
            className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-sm text-white">
            <option value="low">Low</option><option value="medium">Medium</option><option value="high">High</option><option value="urgent">Urgent</option>
          </select>
          <div className="flex justify-end gap-3">
            <button onClick={() => setShowForm(false)} className="px-4 py-2 text-sm text-gray-400 hover:text-white">Cancel</button>
            <button onClick={createTicket} className="px-4 py-2 bg-[#d4a853] hover:bg-[#b8943a] text-black font-medium rounded-lg text-sm">Submit</button>
          </div>
        </div>
      )}

      <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
        {tickets.length === 0 ? (
          <div className="text-center py-12 text-gray-500">No tickets yet.</div>
        ) : (
          tickets.map((t) => (
            <div key={t.id} onClick={() => openTicket(t)}
              className="flex items-center justify-between px-5 py-4 border-b border-gray-800/50 last:border-0 hover:bg-gray-800/30 cursor-pointer transition-colors">
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm">{t.subject}</p>
                <p className="text-xs text-gray-400 mt-0.5 truncate">{t.description}</p>
              </div>
              <div className="flex items-center gap-3 ml-4">
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                  t.priority === 'urgent' ? 'bg-red-900/30 text-red-400' :
                  t.priority === 'high' ? 'bg-orange-900/30 text-orange-400' :
                  t.priority === 'medium' ? 'bg-yellow-900/30 text-yellow-400' :
                  'bg-gray-800 text-gray-400'
                }`}>{t.priority}</span>
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                  t.status === 'open' ? 'bg-green-900/30 text-green-400' :
                  t.status === 'in-progress' ? 'bg-blue-900/30 text-blue-400' :
                  t.status === 'resolved' ? 'bg-purple-900/30 text-purple-400' :
                  'bg-gray-800 text-gray-400'
                }`}>{t.status}</span>
              </div>
            </div>
          ))
        )}
      </div>

      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/60" onClick={() => setSelected(null)} />
          <div className="relative bg-gray-900 border border-gray-800 rounded-xl w-full max-w-lg max-h-[80vh] overflow-y-auto">
            <div className="p-4 border-b border-gray-800">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold">{selected.subject}</h3>
                  <p className="text-xs text-gray-400 mt-1">{selected.description}</p>
                </div>
                <button onClick={() => setSelected(null)} className="text-gray-400 hover:text-white text-lg">✕</button>
              </div>
            </div>
            <div className="p-4 space-y-3">
              {selected.comments?.map((c: any) => (
                <div key={c.id} className="flex gap-3">
                  <div className={`mt-1 w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium flex-shrink-0 ${c.is_admin ? 'bg-[#d4a853]/20 text-[#d4a853]' : 'bg-gray-700 text-gray-300'}`}>
                    {c.is_admin ? 'A' : 'C'}
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-gray-400">
                      {c.is_admin ? 'Support Team' : 'You'} · {new Date(c.created_at).toLocaleString()}
                    </p>
                    <p className="text-sm mt-0.5">{c.message}</p>
                  </div>
                </div>
              ))}
              <div className="flex gap-2 pt-2 border-t border-gray-800">
                <input type="text" value={comment} onChange={(e) => setComment(e.target.value)}
                  placeholder="Type a reply..." className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-sm text-white" />
                <button onClick={addComment} className="px-3 py-2 bg-[#d4a853] hover:bg-[#b8943a] text-black rounded-lg text-sm font-medium">
                  <MessageSquare size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
