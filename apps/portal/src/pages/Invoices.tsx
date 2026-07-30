import { useState, useEffect } from 'react';
import { Receipt, Download } from 'lucide-react';
import { api } from '../lib/api';

export default function Invoices() {
  const [invoices, setInvoices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.invoices.list()
      .then((data) => setInvoices(data as any[]))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="flex justify-center py-12"><div className="animate-spin w-6 h-6 border-2 border-[#d4a853] border-t-transparent rounded-full" /></div>;

  const totalDue = invoices.filter((i) => i.status === 'pending' || i.status === 'overdue').reduce((sum, i) => sum + Number(i.amount), 0);
  const totalPaid = invoices.filter((i) => i.status === 'paid').reduce((sum, i) => sum + Number(i.amount), 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Invoices</h1>
        <p className="text-sm text-gray-200 mt-1">Your billing summary</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
          <p className="text-xs text-gray-200">Total Due</p>
          <p className="text-2xl font-bold text-red-400">${totalDue.toLocaleString()}</p>
        </div>
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
          <p className="text-xs text-gray-200">Total Paid</p>
          <p className="text-2xl font-bold text-green-400">${totalPaid.toLocaleString()}</p>
        </div>
      </div>

      <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
        {invoices.length === 0 ? (
          <div className="text-center py-12 text-gray-300">No invoices yet.</div>
        ) : (
          invoices.map((inv) => (
            <div key={inv.id} className="flex items-center justify-between px-5 py-4 border-b border-gray-800/50 last:border-0">
              <div className="flex items-center gap-3">
                <Receipt size={20} className="text-gray-200" />
                <div>
                  <p className="text-sm font-medium">{inv.invoice_number}</p>
                  <p className="text-xs text-gray-300">{inv.description || 'No description'} · Due {new Date(inv.due_date).toLocaleDateString()}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="text-sm font-bold">${Number(inv.amount).toLocaleString()}</p>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                    inv.status === 'paid' ? 'bg-green-900/30 text-green-400' :
                    inv.status === 'overdue' ? 'bg-red-900/30 text-red-400' :
                    inv.status === 'pending' ? 'bg-yellow-900/30 text-yellow-400' :
                    'bg-gray-800 text-gray-200'
                  }`}>{inv.status}</span>
                </div>
                <Download size={16} className="text-gray-300" />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
