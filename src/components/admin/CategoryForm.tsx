import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const categorySchema = z.object({
  name: z.string().min(1, 'Name is required').max(100),
  slug: z.string().min(1, 'Slug is required').max(100),
  description: z.string().optional(),
});

export type CategoryFormData = z.infer<typeof categorySchema>;

interface CategoryFormProps {
  initialData?: CategoryFormData | null;
  onSubmit: (data: CategoryFormData) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export function CategoryForm({ initialData, onSubmit, onCancel, isLoading }: CategoryFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CategoryFormData>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: '',
      slug: '',
      description: '',
    },
  });

  useEffect(() => {
    if (initialData) {
      reset(initialData);
    } else {
      reset({ name: '', slug: '', description: '' });
    }
  }, [initialData, reset]);

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50 p-4 sm:p-6">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg border border-neutral-100 flex flex-col overflow-hidden">
        <div className="bg-white/90 backdrop-blur-md border-b border-neutral-100 p-6 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-black text-charcoal tracking-tight uppercase">
              {initialData ? 'Edit Category' : 'Add Category'}
            </h2>
          </div>
          <button onClick={onCancel} className="w-10 h-10 flex items-center justify-center text-neutral-400 hover:text-charcoal hover:bg-neutral-100 rounded-full transition-colors">
            <X size={20} strokeWidth={2.5} />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
          <div className="p-6 sm:p-8 space-y-6">
            <div>
              <label className="block text-xs font-bold text-charcoal mb-2 uppercase tracking-wide">Name</label>
              <Input {...register('name')} placeholder="e.g. Eau de Parfum" className="h-12 bg-neutral-50 border-neutral-200 rounded-xl focus-visible:ring-1 focus-visible:ring-charcoal" />
              {errors.name && <p className="text-red-500 text-xs font-semibold mt-1.5">{errors.name.message}</p>}
            </div>

            <div>
              <label className="block text-xs font-bold text-charcoal mb-2 uppercase tracking-wide">Slug</label>
              <Input {...register('slug')} placeholder="e.g. eau-de-parfum" className="h-12 bg-neutral-50 border-neutral-200 rounded-xl focus-visible:ring-1 focus-visible:ring-charcoal" />
              {errors.slug && <p className="text-red-500 text-xs font-semibold mt-1.5">{errors.slug.message}</p>}
            </div>

            <div>
              <label className="block text-xs font-bold text-charcoal mb-2 uppercase tracking-wide">Description <span className="text-neutral-400 font-normal normal-case">(Optional)</span></label>
              <textarea
                {...register('description')}
                rows={3}
                className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-charcoal text-sm transition-all resize-none"
                placeholder="Briefly describe this category..."
              />
              {errors.description && <p className="text-red-500 text-xs font-semibold mt-1.5">{errors.description.message}</p>}
            </div>
          </div>

          <div className="bg-neutral-50/50 border-t border-neutral-100 p-6 flex items-center justify-end gap-3 rounded-b-2xl">
            <Button type="button" variant="outline" onClick={onCancel} className="h-11 px-6 font-bold rounded-xl text-neutral-600 hover:text-black border-neutral-200 shadow-sm hover:bg-neutral-50 transition-colors">
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading} className="h-11 px-8 font-black uppercase tracking-widest bg-black text-white hover:bg-neutral-800 rounded-xl shadow-md transition-all hover:shadow-lg hover:-translate-y-0.5 disabled:opacity-50 disabled:hover:translate-y-0 disabled:hover:shadow-md">
              {isLoading ? 'Saving...' : 'Save Category'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
