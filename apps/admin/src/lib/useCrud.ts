import { useState, useEffect, useCallback } from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type CrudItem = { id: number; [key: string]: any };

export function useCrud<T extends CrudItem>(
  apiClient: {
    list: () => Promise<unknown[]>;
    create: (data: Record<string, unknown>) => Promise<unknown>;
    update: (id: number, data: Record<string, unknown>) => Promise<unknown>;
    delete: (id: number) => Promise<{ deleted: boolean }>;
  },
  initialForm: Record<string, unknown> = {}
) {
  const [items, setItems] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<T | null>(null);
  const [form, setForm] = useState<Record<string, unknown>>(initialForm);
  const [saving, setSaving] = useState(false);

  const fetch = useCallback(async () => {
    try {
      const data = (await apiClient.list()) as T[];
      setItems(data);
    } catch (err) {
      console.error('Fetch error:', err);
    } finally {
      setLoading(false);
    }
  }, [apiClient]);

  useEffect(() => { fetch(); }, [fetch]);

  const openCreate = () => {
    setEditing(null);
    setForm({ ...initialForm });
    setModalOpen(true);
  };

  const openEdit = (item: T) => {
    setEditing(item);
    setForm({ ...item });
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditing(null);
  };

  const handleChange = (key: string, value: unknown) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      if (editing) {
        const updated = (await apiClient.update(editing.id, form)) as T;
        setItems((prev) => prev.map((i) => (i.id === editing.id ? updated : i)));
      } else {
        const created = (await apiClient.create(form)) as T;
        setItems((prev) => [created, ...prev]);
      }
      closeModal();
    } catch (err) {
      console.error('Save error:', err);
      alert('Failed to save. Check console for details.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (item: T) => {
    if (!window.confirm('Are you sure you want to delete this item?')) return;
    try {
      await apiClient.delete(item.id);
      setItems((prev) => prev.filter((i) => i.id !== item.id));
    } catch (err) {
      console.error('Delete error:', err);
      alert('Failed to delete.');
    }
  };

  return {
    items, loading, modalOpen, editing, form, saving,
    openCreate, openEdit, closeModal, handleChange, handleSave, handleDelete, fetch,
  };
}
