import { useState, useEffect } from 'react';
import { Modal } from '../components/Modal';
import { FormSelect } from '../components/FormFields';
import { api } from '../lib/api';
import { DataTable, type Column } from '../components/DataTable';

interface Lead {
  id: number;
  name: string;
  email: string;
  company: string;
  phone: string;
  interest: string;
  message: string;
  source: string;
  status: string;
  created_at: string;
}

const statusColors: Record<string, string> = {
  new: 'bg-green-900/30 text-green-400',
  contacted: 'bg-blue-900/30 text-blue-400',
  qualified: 'bg-purple-900/30 text-purple-400',
  lost: 'bg-red-900/30 text-red-400',
  closed: 'bg-gray-800 text-gray-400',
};

const columns: Column<Lead>[] = [
  { key: 'id', header: 'ID' },
  { key: 'name', header: 'Name' },
  { key: 'email', header: 'Email' },
  { key: 'company', header: 'Company' },
  { key: 'interest', header: 'Interest' },
  {
    key: 'status', header: 'Status',
    render: (item) => (
      <span className={`text-xs px-2 py-0.5 rounded-full font-medium capitalize ${statusColors[item.status] || 'bg-gray-800 text-gray-400'}`}>
        {item.status}
      </span>
    ),
  },
  {
    key: 'created_at', header: 'Date',
    render: (item) => new Date(item.created_at).toLocaleDateString(),
  },
];

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Lead | null>(null);
  const [statusUpdating, setStatusUpdating] = useState<number | null>(null);

  const fetch = () => {
    setLoading(true);
    api.leads.list()
      .then((data) => setLeads(data as Lead[]))
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetch(); }, []);

  const handleStatusChange = async (id: number, status: string) => {
    setStatusUpdating(id);
    try {
      const updated = await api.leads.updateStatus(id, status) as Lead;
      setLeads((prev) => prev.map((l) => (l.id === id ? updated : l)));
    } catch (err) {
      console.error(err);
    } finally {
      setStatusUpdating(null);
    }
  };

  const handleDelete = async (item: Lead) => {
    if (!window.confirm('Delete this lead?')) return;
    try {
      await api.leads.delete(item.id);
      setLeads((prev) => prev.filter((l) => l.id !== item.id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Leads</h1>
          <p className="text-sm text-gray-400 mt-1">Manage incoming leads and inquiries</p>
        </div>
        <span className="text-sm text-gray-400">{leads.length} total</span>
      </div>

      <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
        <DataTable columns={columns} data={leads} onEdit={setSelected} onDelete={handleDelete} loading={loading} />
      </div>

      <Modal open={!!selected} onClose={() => setSelected(null)} title="Lead Details">
        {selected && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-400 text-xs">Name</p>
                <p className="font-medium">{selected.name}</p>
              </div>
              <div>
                <p className="text-gray-400 text-xs">Email</p>
                <p className="font-medium">{selected.email}</p>
              </div>
              <div>
                <p className="text-gray-400 text-xs">Company</p>
                <p className="font-medium">{selected.company || '—'}</p>
              </div>
              <div>
                <p className="text-gray-400 text-xs">Phone</p>
                <p className="font-medium">{selected.phone || '—'}</p>
              </div>
              <div>
                <p className="text-gray-400 text-xs">Interest</p>
                <p className="font-medium">{selected.interest || '—'}</p>
              </div>
              <div>
                <p className="text-gray-400 text-xs">Source</p>
                <p className="font-medium">{selected.source || '—'}</p>
              </div>
              <div>
                <p className="text-gray-400 text-xs">Date</p>
                <p className="font-medium">{new Date(selected.created_at).toLocaleString()}</p>
              </div>
              <div>
                <p className="text-gray-400 text-xs">Status</p>
                <FormSelect
                  label=""
                  value={selected.status}
                  onChange={(e) => handleStatusChange(selected.id, e.target.value)}
                >
                  <option value="new">New</option>
                  <option value="contacted">Contacted</option>
                  <option value="qualified">Qualified</option>
                  <option value="lost">Lost</option>
                  <option value="closed">Closed</option>
                </FormSelect>
                {statusUpdating === selected.id && <span className="text-xs text-gray-400 ml-2">Updating...</span>}
              </div>
            </div>
            {selected.message && (
              <div>
                <p className="text-gray-400 text-xs mb-1">Message</p>
                <p className="text-sm bg-gray-800 rounded-lg p-3">{selected.message}</p>
              </div>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
}
