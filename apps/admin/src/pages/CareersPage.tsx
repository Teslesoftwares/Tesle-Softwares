import { Modal } from '../components/Modal';
import { FormInput, FormTextarea, FormSelect } from '../components/FormFields';
import { useCrud } from '../lib/useCrud';
import { api } from '../lib/api';
import { DataTable, type Column } from '../components/DataTable';

interface Career {
  id: number;
  title: string;
  slug: string;
  department: string;
  type: string;
  location: string;
  description: string;
  requirements: string[];
  salary_range: string;
  published: boolean;
}

const initialForm = { title: '', slug: '', department: '', type: 'full-time', location: '', description: '', requirements: [], salary_range: '', published: false };

const typeColors: Record<string, string> = {
  'full-time': 'bg-blue-900/30 text-blue-400',
  'part-time': 'bg-purple-900/30 text-purple-400',
  'contract': 'bg-orange-900/30 text-orange-400',
  'internship': 'bg-green-900/30 text-green-400',
};

const columns: Column<Career>[] = [
  { key: 'id', header: 'ID' },
  { key: 'title', header: 'Title' },
  { key: 'department', header: 'Department' },
  {
    key: 'type', header: 'Type',
    render: (item) => (
      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${typeColors[item.type] || 'bg-gray-800 text-gray-200'}`}>
        {item.type}
      </span>
    ),
  },
  { key: 'location', header: 'Location' },
  {
    key: 'published', header: 'Status',
    render: (item) => (
      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${item.published ? 'bg-green-900/30 text-green-400' : 'bg-gray-800 text-gray-200'}`}>
        {item.published ? 'Published' : 'Draft'}
      </span>
    ),
  },
];

export default function CareersPage() {
  const crud = useCrud<Career>(api.careers, initialForm);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Careers</h1>
          <p className="text-sm text-gray-200 mt-1">Manage job openings</p>
        </div>
        <button onClick={crud.openCreate} className="px-4 py-2 bg-[#d4a853] hover:bg-[#b8943a] text-black font-medium rounded-lg text-sm transition-colors">
          + Add Position
        </button>
      </div>

      <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
        <DataTable columns={columns} data={crud.items} onEdit={crud.openEdit} onDelete={crud.handleDelete} loading={crud.loading} />
      </div>

      <Modal open={crud.modalOpen} onClose={crud.closeModal} title={crud.editing ? 'Edit Position' : 'Add Position'} size="xl">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <FormInput label="Title" value={crud.form.title as string} onChange={(e) => crud.handleChange('title', e.target.value)} required />
            <FormInput label="Slug" value={crud.form.slug as string} onChange={(e) => crud.handleChange('slug', e.target.value)} required placeholder="job-slug" />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <FormInput label="Department" value={crud.form.department as string} onChange={(e) => crud.handleChange('department', e.target.value)} />
            <FormSelect label="Type" value={crud.form.type as string} onChange={(e) => crud.handleChange('type', e.target.value)}>
              <option value="full-time">Full Time</option>
              <option value="part-time">Part Time</option>
              <option value="contract">Contract</option>
              <option value="internship">Internship</option>
            </FormSelect>
            <FormInput label="Location" value={crud.form.location as string} onChange={(e) => crud.handleChange('location', e.target.value)} />
          </div>
          <FormTextarea label="Description" value={crud.form.description as string} onChange={(e) => crud.handleChange('description', e.target.value)} />
          <FormInput label="Salary Range" value={crud.form.salary_range as string} onChange={(e) => crud.handleChange('salary_range', e.target.value)} placeholder="$50,000 - $80,000" />
          <FormInput label="Requirements (comma-separated)" value={((crud.form.requirements as string[]) || []).join(', ')} onChange={(e) => crud.handleChange('requirements', e.target.value.split(',').map((t: string) => t.trim()).filter(Boolean))} />
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={crud.form.published as boolean} onChange={(e) => crud.handleChange('published', e.target.checked)} className="accent-[#d4a853]" />
            <span className="text-gray-200">Published</span>
          </label>
          <div className="flex justify-end gap-3 pt-2">
            <button onClick={crud.closeModal} className="px-4 py-2 text-sm text-gray-200 hover:text-white transition-colors">Cancel</button>
            <button onClick={crud.handleSave} disabled={crud.saving} className="px-4 py-2 bg-[#d4a853] hover:bg-[#b8943a] text-black font-medium rounded-lg text-sm transition-colors disabled:opacity-50">
              {crud.saving ? 'Saving...' : crud.editing ? 'Update' : 'Create'}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
