import { useState, useEffect } from 'react';
import { Upload, Download, File } from 'lucide-react';
import { api } from '../lib/api';

export default function Files() {
  const [files, setFiles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showUpload, setShowUpload] = useState(false);
  const [form, setForm] = useState({ file_name: '', file_url: '', project_id: '' as any });

  const fetchFiles = () => {
    setLoading(true);
    api.files.list()
      .then((data) => setFiles(data as any[]))
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchFiles(); }, []);

  const uploadFile = async () => {
    if (!form.file_name || !form.file_url) return;
    await api.files.create({ ...form, file_size: 0, file_type: '' });
    setForm({ file_name: '', file_url: '', project_id: '' as any });
    setShowUpload(false);
    fetchFiles();
  };

  if (loading) return <div className="flex justify-center py-12"><div className="animate-spin w-6 h-6 border-2 border-[#d4a853] border-t-transparent rounded-full" /></div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Files</h1>
          <p className="text-sm text-gray-400 mt-1">Shared documents and files</p>
        </div>
        <button onClick={() => setShowUpload(!showUpload)}
          className="px-4 py-2 bg-[#d4a853] hover:bg-[#b8943a] text-black font-medium rounded-lg text-sm transition-colors flex items-center gap-2">
          <Upload size={16} /> Upload File
        </button>
      </div>

      {showUpload && (
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-5 mb-6 space-y-4">
          <h3 className="font-semibold">Upload File</h3>
          <input type="text" placeholder="File name" value={form.file_name}
            onChange={(e) => setForm({ ...form, file_name: e.target.value })}
            className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-sm text-white" />
          <input type="url" placeholder="File URL (e.g., Google Drive, Dropbox)" value={form.file_url}
            onChange={(e) => setForm({ ...form, file_url: e.target.value })}
            className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-sm text-white" />
          <div className="flex justify-end gap-3">
            <button onClick={() => setShowUpload(false)} className="px-4 py-2 text-sm text-gray-400 hover:text-white">Cancel</button>
            <button onClick={uploadFile} className="px-4 py-2 bg-[#d4a853] hover:bg-[#b8943a] text-black font-medium rounded-lg text-sm">Upload</button>
          </div>
        </div>
      )}

      <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
        {files.length === 0 ? (
          <div className="text-center py-12 text-gray-500">No files shared yet.</div>
        ) : (
          files.map((f) => (
            <div key={f.id} className="flex items-center justify-between px-5 py-4 border-b border-gray-800/50 last:border-0">
              <div className="flex items-center gap-3">
                <File size={20} className="text-gray-400" />
                <div>
                  <p className="text-sm font-medium">{f.file_name}</p>
                  <p className="text-xs text-gray-500">
                    {f.file_type} · {new Date(f.created_at).toLocaleDateString()}
                    {f.uploaded_by === 'client' ? ' · Uploaded by you' : ' · Uploaded by Tesle'}
                  </p>
                </div>
              </div>
              <a href={f.file_url} target="_blank" rel="noopener noreferrer"
                className="p-2 text-gray-400 hover:text-[#d4a853] transition-colors">
                <Download size={16} />
              </a>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
