import { Modal } from '../components/Modal';
import { FormInput, FormTextarea } from '../components/FormFields';
import { useCrud } from '../lib/useCrud';
import { api } from '../lib/api';
import { DataTable, type Column } from '../components/DataTable';

interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  image: string;
  tags: string[];
  published: boolean;
}

const initialForm = { title: '', slug: '', excerpt: '', content: '', author: '', image: '', tags: [], published: false };

const columns: Column<BlogPost>[] = [
  { key: 'id', header: 'ID' },
  {
    key: 'title', header: 'Title',
    render: (item) => <span className="font-medium">{item.title}</span>,
  },
  { key: 'author', header: 'Author' },
  {
    key: 'published', header: 'Status',
    render: (item) => (
      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${item.published ? 'bg-green-900/30 text-green-400' : 'bg-gray-800 text-gray-400'}`}>
        {item.published ? 'Published' : 'Draft'}
      </span>
    ),
  },
];

export default function BlogPage() {
  const crud = useCrud<BlogPost>(api.blog, initialForm);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Blog Posts</h1>
          <p className="text-sm text-gray-400 mt-1">Manage blog content</p>
        </div>
        <button onClick={crud.openCreate} className="px-4 py-2 bg-[#d4a853] hover:bg-[#b8943a] text-black font-medium rounded-lg text-sm transition-colors">
          + Add Post
        </button>
      </div>

      <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
        <DataTable columns={columns} data={crud.items} onEdit={crud.openEdit} onDelete={crud.handleDelete} loading={crud.loading} />
      </div>

      <Modal open={crud.modalOpen} onClose={crud.closeModal} title={crud.editing ? 'Edit Post' : 'Add Post'} size="xl">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <FormInput label="Title" value={crud.form.title as string} onChange={(e) => crud.handleChange('title', e.target.value)} required />
            <FormInput label="Slug" value={crud.form.slug as string} onChange={(e) => crud.handleChange('slug', e.target.value)} required placeholder="post-slug" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <FormInput label="Author" value={crud.form.author as string} onChange={(e) => crud.handleChange('author', e.target.value)} />
            <FormInput label="Image URL" value={crud.form.image as string} onChange={(e) => crud.handleChange('image', e.target.value)} placeholder="https://..." />
          </div>
          <FormTextarea label="Excerpt" value={crud.form.excerpt as string} onChange={(e) => crud.handleChange('excerpt', e.target.value)} />
          <FormTextarea label="Content (HTML)" value={crud.form.content as string} onChange={(e) => crud.handleChange('content', e.target.value)} />
          <FormInput label="Tags (comma-separated)" value={((crud.form.tags as string[]) || []).join(', ')} onChange={(e) => crud.handleChange('tags', e.target.value.split(',').map((t: string) => t.trim()).filter(Boolean))} />
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={crud.form.published as boolean} onChange={(e) => crud.handleChange('published', e.target.checked)} className="accent-[#d4a853]" />
            <span className="text-gray-300">Published</span>
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
