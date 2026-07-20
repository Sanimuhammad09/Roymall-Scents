import React, { useState } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/axios';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CategoryForm, CategoryFormData } from '@/components/admin/CategoryForm';
import toast from 'react-hot-toast';

export const Route = createFileRoute('/admin/categories')({
  component: AdminCategoriesPage,
});

function AdminCategoriesPage() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<any>(null);
  const queryClient = useQueryClient();

  const { data: response, isLoading } = useQuery({
    queryKey: ['admin-categories'],
    queryFn: async () => {
      const { data } = await api.get('/categories');
      return data.data || data;
    },
  });

  const createMutation = useMutation({
    mutationFn: async (data: CategoryFormData) => {
      const res = await api.post('/categories', data);
      return res.data;
    },
    onSuccess: () => {
      toast.success('Category created successfully');
      setIsFormOpen(false);
      queryClient.invalidateQueries({ queryKey: ['admin-categories'] });
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to create category');
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: CategoryFormData }) => {
      const res = await api.put(`/categories/${id}`, data);
      return res.data;
    },
    onSuccess: () => {
      toast.success('Category updated successfully');
      setEditingCategory(null);
      setIsFormOpen(false);
      queryClient.invalidateQueries({ queryKey: ['admin-categories'] });
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to update category');
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      await api.delete(`/categories/${id}`);
    },
    onSuccess: () => {
      toast.success('Category deleted successfully');
      queryClient.invalidateQueries({ queryKey: ['admin-categories'] });
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to delete category');
    },
  });

  const handleSubmit = (data: CategoryFormData) => {
    if (editingCategory) {
      updateMutation.mutate({ id: editingCategory.id, data });
    } else {
      createMutation.mutate(data);
    }
  };

  const handleEdit = (category: any) => {
    setEditingCategory(category);
    setIsFormOpen(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      deleteMutation.mutate(id);
    }
  };

  const categories = response?.data || [];

  if (isLoading) {
    return <div className="p-8">Loading categories...</div>;
  }

  return (
    <div className="space-y-8 max-w-[1600px] mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-charcoal tracking-tight uppercase">Categories</h1>
          <p className="text-sm font-medium text-neutral-500 mt-1 tracking-wide">Manage product categories and collections</p>
        </div>
        <Button 
          onClick={() => {
            setEditingCategory(null);
            setIsFormOpen(true);
          }}
          className="flex items-center gap-2 font-bold uppercase tracking-wide bg-charcoal hover:bg-black text-white px-6 h-11 rounded-xl transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
        >
          <Plus size={18} /> Add Category
        </Button>
      </div>

      <div className="bg-white rounded-2xl border border-neutral-100 overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-[13px]">
            <thead className="bg-neutral-50/80 border-b border-neutral-100 text-neutral-400 font-black uppercase tracking-[0.15em] text-[10px]">
              <tr>
                <th className="px-6 py-5 whitespace-nowrap">Name</th>
                <th className="px-6 py-5 whitespace-nowrap">Slug</th>
                <th className="px-6 py-5">Description</th>
                <th className="px-6 py-5 text-right whitespace-nowrap">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {categories.map((category: any) => (
                <tr key={category.id} className="hover:bg-neutral-50/80 transition-colors group">
                  <td className="px-6 py-4 font-bold text-charcoal">{category.name}</td>
                  <td className="px-6 py-4 text-neutral-500 font-medium bg-neutral-50/50 rounded-md px-2 py-1 ml-4 inline-block mt-3 border border-neutral-100">{category.slug}</td>
                  <td className="px-6 py-4 text-neutral-500 truncate max-w-[250px] font-medium">{category.description || '-'}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                        onClick={() => handleEdit(category)}
                        className="p-2 text-neutral-400 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button 
                        onClick={() => handleDelete(category.id)}
                        disabled={deleteMutation.isPending}
                        className="p-2 text-neutral-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {categories.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-neutral-500 font-medium">
                    No categories found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {isFormOpen && (
        <CategoryForm
          initialData={editingCategory}
          onSubmit={handleSubmit}
          onCancel={() => {
            setIsFormOpen(false);
            setEditingCategory(null);
          }}
          isLoading={createMutation.isPending || updateMutation.isPending}
        />
      )}
    </div>
  );
}
