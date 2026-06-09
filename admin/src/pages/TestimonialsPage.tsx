import { Modal } from '../components/Modal';
import { FormInput, FormTextarea } from '../components/FormFields';
import { useCrud } from '../lib/useCrud';
import { api } from '../lib/api';
import { DataTable, type Column } from '../components/DataTable';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  content: string;
  avatar: string;
  rating: number;
  featured: boolean;
  order: number;
}

const initialForm = { name: '', role: '', company: '', content: '', avatar: '', rating: 5, featured: false, order: 0 };

const columns: Column<Testimonial>[] = [
  { key: 'id', header: 'ID' },
  { key: 'name', header: 'Name' },
  { key: 'company', header: 'Company' },
  { key: 'rating', header: 'Rating' },
  {
    key: 'featured', header: 'Featured',
    render: (item) => item.featured ? <span className="text-[#d4a853]">★ Yes</span> : <span className="text-gray-600">—</span>,
  },
];

export default function TestimonialsPage() {
  const crud = useCrud<Testimonial>(api.testimonials, initialForm);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Testimonials</h1>
          <p className="text-sm text-gray-400 mt-1">Manage client testimonials</p>
        </div>
        <button onClick={crud.openCreate} className="px-4 py-2 bg-[#d4a853] hover:bg-[#b8943a] text-black font-medium rounded-lg text-sm transition-colors">
          + Add Testimonial
        </button>
      </div>

      <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
        <DataTable columns={columns} data={crud.items} onEdit={crud.openEdit} onDelete={crud.handleDelete} loading={crud.loading} />
      </div>

      <Modal open={crud.modalOpen} onClose={crud.closeModal} title={crud.editing ? 'Edit Testimonial' : 'Add Testimonial'} size="lg">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <FormInput label="Name" value={crud.form.name as string} onChange={(e) => crud.handleChange('name', e.target.value)} required />
            <FormInput label="Role" value={crud.form.role as string} onChange={(e) => crud.handleChange('role', e.target.value)} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <FormInput label="Company" value={crud.form.company as string} onChange={(e) => crud.handleChange('company', e.target.value)} />
            <FormInput label="Avatar URL" value={crud.form.avatar as string} onChange={(e) => crud.handleChange('avatar', e.target.value)} />
          </div>
          <FormTextarea label="Content" value={crud.form.content as string} onChange={(e) => crud.handleChange('content', e.target.value)} required />
          <div className="grid grid-cols-2 gap-4">
            <FormInput label="Rating (1-5)" type="number" min={1} max={5} value={crud.form.rating as number} onChange={(e) => crud.handleChange('rating', parseInt(e.target.value) || 5)} />
            <FormInput label="Order" type="number" value={crud.form.order as number} onChange={(e) => crud.handleChange('order', parseInt(e.target.value) || 0)} />
          </div>
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={crud.form.featured as boolean} onChange={(e) => crud.handleChange('featured', e.target.checked)} className="accent-[#d4a853]" />
            <span className="text-gray-300">Featured</span>
          </label>
          <div className="flex justify-end gap-3 pt-2">
            <button onClick={crud.closeModal} className="px-4 py-2 text-sm text-gray-400 hover:text-white transition-colors">Cancel</button>
            <button onClick={crud.handleSave} disabled={crud.saving} className="px-4 py-2 bg-[#d4a853] hover:bg-[#b8943a] text-black font-medium rounded-lg text-sm transition-colors disabled:opacity-50">
              {crud.saving ? 'Saving...' : crud.editing ? 'Update' : 'Create'}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
