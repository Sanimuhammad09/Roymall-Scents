import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { X, Plus, Trash2, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { z } from 'zod';

const variantSchema = z.object({
  sku: z.string().min(1, 'SKU is required'),
  color: z.string().min(1, 'Color is required'),
  size: z.string().min(1, 'Size is required'),
  inventory: z.number().min(0, 'Inventory must be positive'),
  priceOffset: z.number().default(0),
});

const imageSchema = z.object({
  url: z.string().url('Invalid URL'),
  alt: z.string().optional(),
  isMain: z.boolean().default(false),
});

const productSchema = z.object({
  name: z.string().min(1, 'Product name is required').max(200),
  slug: z.string().min(1, 'Slug is required'),
  description: z.string().min(1, 'Description is required'),
  basePrice: z.number().min(0, 'Price must be positive'),
  categoryId: z.string().min(1, 'Category is required'),
  fabricDetails: z.string().optional(),
  careInstructions: z.string().optional(),
  isFeatured: z.boolean().default(false),
  variants: z.array(variantSchema).min(1, 'At least one variant is required'),
  images: z.array(imageSchema).min(1, 'At least one image is required'),
});

type ProductFormData = z.infer<typeof productSchema>;

interface ProductFormProps {
  onSubmit: (data: ProductFormData) => void;
  onCancel: () => void;
  categories: Array<{ id: string; name: string }>;
  isLoading?: boolean;
  initialData?: any;
}

export function ProductForm({ onSubmit, onCancel, categories, isLoading, initialData }: ProductFormProps) {
  const [variants, setVariants] = useState(initialData?.variants?.length ? initialData.variants : [{ sku: '', color: '', size: '', inventory: 0, priceOffset: 0 }]);
  const [images, setImages] = useState(initialData?.images?.length ? initialData.images : [{ url: '', alt: '', isMain: true }]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: initialData ? {
      name: initialData.name,
      slug: initialData.slug,
      description: initialData.description,
      basePrice: initialData.basePrice,
      categoryId: initialData.categoryId,
      fabricDetails: initialData.fabricDetails || '',
      careInstructions: initialData.careInstructions || '',
      isFeatured: initialData.isFeatured || false,
      variants,
      images,
    } : {
      variants,
      images,
    },
  });

  const addVariant = () => {
    setVariants([...variants, { sku: '', color: '', size: '', inventory: 0, priceOffset: 0 }]);
  };

  const removeVariant = (index: number) => {
    setVariants(variants.filter((_, i) => i !== index));
  };

  const updateVariant = (index: number, field: string, value: any) => {
    const updated = [...variants];
    updated[index] = { ...updated[index], [field]: value };
    setVariants(updated);
  };

  const addImage = () => {
    setImages([...images, { url: '', alt: '', isMain: false }]);
  };

  const removeImage = (index: number) => {
    const updated = images.filter((_, i) => i !== index);
    if (updated.length > 0 && !updated.some(img => img.isMain)) {
      updated[0].isMain = true;
    }
    setImages(updated);
  };

  const updateImage = (index: number, field: string, value: any) => {
    const updated = [...images];
    if (field === 'isMain') {
      updated.forEach((img, i) => img.isMain = i === index);
    } else {
      updated[index] = { ...updated[index], [field]: value };
    }
    setImages(updated);
  };

  const onFormSubmit = (data: ProductFormData) => {
    onSubmit({ ...data, variants, images });
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50 p-4 sm:p-6 sm:py-10">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto border border-neutral-100 flex flex-col">
        <div className="sticky top-0 bg-white/90 backdrop-blur-md border-b border-neutral-100 p-6 flex items-center justify-between z-10">
          <div>
            <h2 className="text-2xl font-black text-charcoal tracking-tight uppercase">{initialData ? 'Edit Product' : 'Add New Product'}</h2>
            <p className="text-sm font-medium text-neutral-500 mt-1">{initialData ? 'Update product details and inventory' : 'Create a new product for your catalog'}</p>
          </div>
          <button
            onClick={onCancel}
            className="w-10 h-10 flex items-center justify-center text-neutral-400 hover:text-charcoal hover:bg-neutral-100 rounded-full transition-colors"
          >
            <X size={20} strokeWidth={2.5} />
          </button>
        </div>

        <form onSubmit={handleSubmit(onFormSubmit)} className="flex flex-col relative">
          <div className="p-6 sm:p-8 space-y-10">
          {/* Basic Information */}
          <div className="space-y-6">
            <h3 className="text-sm font-bold text-neutral-400 uppercase tracking-widest border-b border-neutral-100 pb-2">Basic Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-charcoal mb-2 uppercase tracking-wide">Product Name</label>
                <Input {...register('name')} placeholder="e.g. Velvet Rose Eau de Parfum" className="h-12 bg-neutral-50 border-neutral-200 rounded-xl focus-visible:ring-1 focus-visible:ring-charcoal" />
                {errors.name && <p className="text-red-500 text-xs font-semibold mt-1.5">{errors.name.message}</p>}
              </div>
              <div>
                <label className="block text-xs font-bold text-charcoal mb-2 uppercase tracking-wide">Slug</label>
                <Input {...register('slug')} placeholder="the-premium-cotton-tee" className="h-12 bg-neutral-50 border-neutral-200 rounded-xl focus-visible:ring-1 focus-visible:ring-charcoal" />
                {errors.slug && <p className="text-red-500 text-xs font-semibold mt-1.5">{errors.slug.message}</p>}
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-charcoal mb-2 uppercase tracking-wide">Description</label>
              <textarea
                {...register('description')}
                rows={4}
                className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-charcoal text-sm transition-all"
                placeholder="Write a compelling product description..."
              />
              {errors.description && <p className="text-red-500 text-xs font-semibold mt-1.5">{errors.description.message}</p>}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-charcoal mb-2 uppercase tracking-wide">Base Price (₦)</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 font-medium">₦</span>
                  <Input type="number" step="0.01" {...register('basePrice', { valueAsNumber: true })} className="pl-8 h-12 bg-neutral-50 border-neutral-200 rounded-xl focus-visible:ring-1 focus-visible:ring-charcoal" />
                </div>
                {errors.basePrice && <p className="text-red-500 text-xs font-semibold mt-1.5">{errors.basePrice.message}</p>}
              </div>
              <div>
                <label className="block text-xs font-bold text-charcoal mb-2 uppercase tracking-wide">Category</label>
                <select {...register('categoryId')} className="w-full px-4 h-12 bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-charcoal text-sm transition-all appearance-none cursor-pointer">
                  <option value="" disabled className="text-neutral-400">Select a category</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
                {errors.categoryId && <p className="text-red-500 text-xs font-semibold mt-1.5">{errors.categoryId.message}</p>}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-charcoal mb-2 uppercase tracking-wide">Scent Notes <span className="text-neutral-400 font-normal normal-case">(Optional)</span></label>
                <Input {...register('fabricDetails')} placeholder="e.g. Top Notes: Rose. Heart Notes: Oud." className="h-12 bg-neutral-50 border-neutral-200 rounded-xl" />
              </div>
              <div>
                <label className="block text-xs font-bold text-charcoal mb-2 uppercase tracking-wide">Ingredients & Storage <span className="text-neutral-400 font-normal normal-case">(Optional)</span></label>
                <Input {...register('careInstructions')} placeholder="e.g. Store in a cool, dry place. Contains Alcohol Denat." className="h-12 bg-neutral-50 border-neutral-200 rounded-xl" />
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 bg-neutral-50 border border-neutral-100 rounded-xl">
              <input type="checkbox" id="isFeatured" {...register('isFeatured')} className="w-5 h-5 rounded border-neutral-300 text-charcoal focus:ring-charcoal" />
              <label htmlFor="isFeatured" className="text-sm font-bold text-charcoal cursor-pointer">Featured Product</label>
            </div>
          </div>

          {/* Variants */}
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-neutral-100 pb-2">
              <h3 className="text-sm font-bold text-neutral-400 uppercase tracking-widest">Variants & Stock</h3>
              <Button type="button" onClick={addVariant} size="sm" variant="outline" className="h-8 rounded-lg font-bold text-xs uppercase tracking-wide bg-white shadow-sm border-neutral-200 hover:bg-neutral-50">
                <Plus size={14} className="mr-1.5" /> Add Variant
              </Button>
            </div>
            <div className="space-y-4">
              {variants.map((variant, index) => (
                <div key={index} className="bg-white border border-neutral-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow group relative">
                  <div className="absolute -top-3 -left-3 w-6 h-6 bg-charcoal text-white text-xs font-bold rounded-full flex items-center justify-center shadow-md">
                    {index + 1}
                  </div>
                  {variants.length > 1 && (
                    <button type="button" onClick={() => removeVariant(index)} className="absolute -top-3 -right-3 w-7 h-7 bg-white border border-neutral-200 text-neutral-400 hover:text-red-500 hover:border-red-200 rounded-full flex items-center justify-center shadow-sm transition-colors opacity-0 group-hover:opacity-100">
                      <Trash2 size={14} />
                    </button>
                  )}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2">
                    <div>
                      <label className="block text-[10px] font-black text-neutral-400 mb-1.5 uppercase tracking-widest">SKU</label>
                      <Input value={variant.sku} onChange={(e) => updateVariant(index, 'sku', e.target.value)} placeholder="e.g. W-VROSE-50" className="h-10 bg-neutral-50 border-neutral-200 text-sm" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-neutral-400 mb-1.5 uppercase tracking-widest">Bottle Style / Color</label>
                      <Input value={variant.color} onChange={(e) => updateVariant(index, 'color', e.target.value)} placeholder="e.g. Rose Gold" className="h-10 bg-neutral-50 border-neutral-200 text-sm" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-neutral-400 mb-1.5 uppercase tracking-widest">Size / Volume</label>
                      <Input value={variant.size} onChange={(e) => updateVariant(index, 'size', e.target.value)} placeholder="e.g. 50ml" className="h-10 bg-neutral-50 border-neutral-200 text-sm" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-neutral-400 mb-1.5 uppercase tracking-widest">Inventory</label>
                      <Input type="number" value={variant.inventory} onChange={(e) => updateVariant(index, 'inventory', parseInt(e.target.value) || 0)} placeholder="0" className="h-10 bg-neutral-50 border-neutral-200 text-sm" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Images */}
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-neutral-100 pb-2">
              <h3 className="text-sm font-bold text-neutral-400 uppercase tracking-widest">Images</h3>
              <Button type="button" onClick={addImage} size="sm" variant="outline" className="h-8 rounded-lg font-bold text-xs uppercase tracking-wide bg-white shadow-sm border-neutral-200 hover:bg-neutral-50">
                <Plus size={14} className="mr-1.5" /> Add Image
              </Button>
            </div>
            <div className="space-y-4">
              {images.map((image, index) => (
                <div key={index} className="bg-white border border-neutral-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow group relative">
                  <div className="absolute -top-3 -left-3 w-6 h-6 bg-charcoal text-white text-xs font-bold rounded-full flex items-center justify-center shadow-md">
                    {index + 1}
                  </div>
                  {images.length > 1 && (
                    <button type="button" onClick={() => removeImage(index)} className="absolute -top-3 -right-3 w-7 h-7 bg-white border border-neutral-200 text-neutral-400 hover:text-red-500 hover:border-red-200 rounded-full flex items-center justify-center shadow-sm transition-colors opacity-0 group-hover:opacity-100">
                      <Trash2 size={14} />
                    </button>
                  )}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-2">
                    <div>
                      <label className="block text-[10px] font-black text-neutral-400 mb-1.5 uppercase tracking-widest">Image URL</label>
                      <Input value={image.url} onChange={(e) => updateImage(index, 'url', e.target.value)} placeholder="https://..." className="h-10 bg-neutral-50 border-neutral-200 text-sm" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-neutral-400 mb-1.5 uppercase tracking-widest">Alt Text <span className="text-neutral-400 font-normal normal-case">(Optional)</span></label>
                      <Input value={image.alt} onChange={(e) => updateImage(index, 'alt', e.target.value)} placeholder="A stylish premium..." className="h-10 bg-neutral-50 border-neutral-200 text-sm" />
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-neutral-100 flex items-center gap-2">
                    <input
                      type="radio"
                      id={`main-img-${index}`}
                      checked={image.isMain}
                      onChange={(e) => updateImage(index, 'isMain', e.target.checked)}
                      className="w-4 h-4 text-charcoal focus:ring-charcoal"
                    />
                    <label htmlFor={`main-img-${index}`} className={`text-sm font-bold cursor-pointer ${image.isMain ? 'text-charcoal' : 'text-neutral-400'}`}>Set as Main Image</label>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="sticky bottom-0 bg-white border-t border-neutral-100 p-6 flex items-center justify-end gap-3 z-20 rounded-b-2xl shadow-[0_-4px_20px_-10px_rgba(0,0,0,0.1)]">
            <Button type="button" variant="outline" onClick={onCancel} className="h-11 px-6 font-bold rounded-xl text-neutral-600 hover:text-black border-neutral-200 shadow-sm hover:bg-neutral-50 transition-colors">
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading} className="h-11 px-8 font-black uppercase tracking-widest bg-black text-white hover:bg-neutral-800 rounded-xl shadow-md transition-all hover:shadow-lg hover:-translate-y-0.5 disabled:opacity-50 disabled:hover:translate-y-0 disabled:hover:shadow-md">
              {isLoading ? (initialData ? 'Updating...' : 'Creating...') : (initialData ? 'Update Product' : 'Create Product')}
            </Button>
          </div>
          </div>
        </form>
      </div>
    </div>
  );
}
