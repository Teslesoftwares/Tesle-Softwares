import { Modal } from '../components/Modal';
import { FormInput, FormTextarea } from '../components/FormFields';
import { useCrud } from '../lib/useCrud';
import { api } from '../lib/api';
import { DataTable, type Column } from '../components/DataTable';

interface Service {
  id: number;
  title: string;
  slug: string;
  description: string;
  icon: string;
  order: number;
}

const initialForm = { title: '', slug: '', description: '', icon: '', order: 0 };

const columns: Column<Service>[] = [
  { key: 'id', header: 'ID' },
  { key: 'title', header: 'Title' },
  { key: 'slug', header: 'Slug' },
  { key: 'icon', header: 'Icon' },
  { key: 'order', header: 'Order' },
];

export default function ServicesPage() {
  const crud = useCrud<Service>(api.services, initialForm);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Services</h1>
          <p className="text-sm text-gray-200 mt-1">Manage your service offerings</p>
        </div>
        <button onClick={crud.openCreate} className="px-4 py-2 bg-[#d4a853] hover:bg-[#b8943a] text-black font-medium rounded-lg text-sm transition-colors">
          + Add Service
        </button>
      </div>

      <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
        <DataTable columns={columns} data={crud.items} onEdit={crud.openEdit} onDelete={crud.handleDelete} loading={crud.loading} />
      </div>

      <Modal open={crud.modalOpen} onClose={crud.closeModal} title={crud.editing ? 'Edit Service' : 'Add Service'}>
        <div className="space-y-4">
          <FormInput label="Title" value={crud.form.title as string} onChange={(e) => crud.handleChange('title', e.target.value)} required />
          <FormInput label="Slug" value={crud.form.slug as string} onChange={(e) => crud.handleChange('slug', e.target.value)} required placeholder="my-service-slug" />
          <FormTextarea label="Description" value={crud.form.description as string} onChange={(e) => crud.handleChange('description', e.target.value)} />
          <FormInput label="Icon" value={crud.form.icon as string} onChange={(e) => crud.handleChange('icon', e.target.value)} placeholder="Icon name (e.g., Code)" />
          <FormInput label="Order" type="number" value={crud.form.order as number} onChange={(e) => crud.handleChange('order', parseInt(e.target.value) || 0)} />
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
