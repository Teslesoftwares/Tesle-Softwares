import { Modal } from '../components/Modal';
import { FormInput, FormTextarea } from '../components/FormFields';
import { useCrud } from '../lib/useCrud';
import { api } from '../lib/api';
import { DataTable, type Column } from '../components/DataTable';

interface PortfolioItem {
  id: number;
  title: string;
  slug: string;
  description: string;
  client: string;
  category: string;
  images: string[];
  tags: string[];
  completed_date: string;
  url: string;
}

const initialForm = { title: '', slug: '', description: '', client: '', category: '', images: [], tags: [], completed_date: '', url: '' };

const columns: Column<PortfolioItem>[] = [
  { key: 'id', header: 'ID' },
  { key: 'title', header: 'Title' },
  { key: 'client', header: 'Client' },
  { key: 'category', header: 'Category' },
  { key: 'completed_date', header: 'Date' },
];

export default function PortfolioPage() {
  const crud = useCrud<PortfolioItem>(api.portfolio, initialForm);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Portfolio</h1>
          <p className="text-sm text-gray-200 mt-1">Manage portfolio projects</p>
        </div>
        <button onClick={crud.openCreate} className="px-4 py-2 bg-[#d4a853] hover:bg-[#b8943a] text-black font-medium rounded-lg text-sm transition-colors">
          + Add Project
        </button>
      </div>

      <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
        <DataTable columns={columns} data={crud.items} onEdit={crud.openEdit} onDelete={crud.handleDelete} loading={crud.loading} />
      </div>

      <Modal open={crud.modalOpen} onClose={crud.closeModal} title={crud.editing ? 'Edit Project' : 'Add Project'} size="xl">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <FormInput label="Title" value={crud.form.title as string} onChange={(e) => crud.handleChange('title', e.target.value)} required />
            <FormInput label="Slug" value={crud.form.slug as string} onChange={(e) => crud.handleChange('slug', e.target.value)} required placeholder="project-slug" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <FormInput label="Client" value={crud.form.client as string} onChange={(e) => crud.handleChange('client', e.target.value)} />
            <FormInput label="Category" value={crud.form.category as string} onChange={(e) => crud.handleChange('category', e.target.value)} />
          </div>
          <FormTextarea label="Description" value={crud.form.description as string} onChange={(e) => crud.handleChange('description', e.target.value)} />
          <div className="grid grid-cols-2 gap-4">
            <FormInput label="Completed Date" type="date" value={crud.form.completed_date as string} onChange={(e) => crud.handleChange('completed_date', e.target.value)} />
            <FormInput label="URL" value={crud.form.url as string} onChange={(e) => crud.handleChange('url', e.target.value)} placeholder="https://..." />
          </div>
          <FormInput label="Tags (comma-separated)" value={((crud.form.tags as string[]) || []).join(', ')} onChange={(e) => crud.handleChange('tags', e.target.value.split(',').map((t: string) => t.trim()).filter(Boolean))} />
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
