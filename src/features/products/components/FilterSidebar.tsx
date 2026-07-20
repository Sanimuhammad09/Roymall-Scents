import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { SlidersHorizontal, X, ChevronDown, Grid3X3, LayoutList } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface FilterSidebarProps {
  filters: Record<string, string>;
  onFilterChange: (key: string, value: string) => void;
  onClearFilters: () => void;
}

const sizes = ['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL'];
const colors = [
  { name: 'Black', hex: '#111' },
  { name: 'Navy', hex: '#1B2A4A' },
  { name: 'Charcoal', hex: '#36454F' },
  { name: 'Burgundy', hex: '#722F37' },
  { name: 'Olive', hex: '#556B2F' },
  { name: 'White', hex: '#FAFAFA' },
  { name: 'Ceil Blue', hex: '#4682B4' },
  { name: 'Wine', hex: '#722F37' },
];
const sortOptions = [
  { label: 'Newest', value: 'newest' },
  { label: 'Price: Low to High', value: 'price_asc' },
  { label: 'Price: High to Low', value: 'price_desc' },
  { label: 'Name: A-Z', value: 'name_asc' },
  { label: 'Name: Z-A', value: 'name_desc' },
];

export function FilterSidebar({ filters, onFilterChange, onClearFilters }: FilterSidebarProps) {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    size: true,
    color: true,
    price: true,
  });

  const toggleSection = (section: string) => {
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const hasActiveFilters = Object.values(filters).some(v => v !== '');

  return (
    <aside className="w-full">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xs font-bold tracking-[0.2em] uppercase text-charcoal flex items-center gap-2">
          <SlidersHorizontal size={16} />
          Filters
        </h3>
        {hasActiveFilters && (
          <button
            onClick={onClearFilters}
            className="text-xs text-neutral-500 hover:text-charcoal underline transition-colors"
          >
            Clear All
          </button>
        )}
      </div>

      {/* Size Filter */}
      <div className="border-t border-neutral-200 py-4">
        <button
          onClick={() => toggleSection('size')}
          className="flex items-center justify-between w-full text-sm font-semibold text-charcoal"
        >
          Size
          <ChevronDown size={16} className={`transition-transform ${openSections.size ? 'rotate-180' : ''}`} />
        </button>
        {openSections.size && (
          <div className="mt-3 flex flex-wrap gap-2">
            {sizes.map(size => (
              <button
                key={size}
                onClick={() => onFilterChange('size', filters.size === size ? '' : size)}
                className={`px-3 py-1.5 text-xs font-medium border transition-colors ${
                  filters.size === size
                    ? 'bg-charcoal text-white border-charcoal'
                    : 'border-neutral-200 text-neutral-600 hover:border-charcoal'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Color Filter */}
      <div className="border-t border-neutral-200 py-4">
        <button
          onClick={() => toggleSection('color')}
          className="flex items-center justify-between w-full text-sm font-semibold text-charcoal"
        >
          Color
          <ChevronDown size={16} className={`transition-transform ${openSections.color ? 'rotate-180' : ''}`} />
        </button>
        {openSections.color && (
          <div className="mt-3 flex flex-wrap gap-2">
            {colors.map(color => (
              <button
                key={color.name}
                onClick={() => onFilterChange('color', filters.color === color.name ? '' : color.name)}
                className={`flex items-center gap-2 px-3 py-1.5 text-xs font-medium border transition-colors ${
                  filters.color === color.name
                    ? 'border-charcoal bg-neutral-50'
                    : 'border-neutral-200 hover:border-charcoal'
                }`}
              >
                <span
                  className="w-3 h-3 rounded-full border border-neutral-300"
                  style={{ backgroundColor: color.hex }}
                />
                {color.name}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Price Filter */}
      <div className="border-t border-neutral-200 py-4">
        <button
          onClick={() => toggleSection('price')}
          className="flex items-center justify-between w-full text-sm font-semibold text-charcoal"
        >
          Price
          <ChevronDown size={16} className={`transition-transform ${openSections.price ? 'rotate-180' : ''}`} />
        </button>
        {openSections.price && (
          <div className="mt-3 flex items-center gap-3">
            <Input
              type="number"
              placeholder="Min"
              value={filters.minPrice || ''}
              onChange={(e) => onFilterChange('minPrice', e.target.value)}
              className="h-9 text-sm"
            />
            <span className="text-neutral-400">—</span>
            <Input
              type="number"
              placeholder="Max"
              value={filters.maxPrice || ''}
              onChange={(e) => onFilterChange('maxPrice', e.target.value)}
              className="h-9 text-sm"
            />
          </div>
        )}
      </div>
    </aside>
  );
}

interface SortBarProps {
  total: number;
  sortBy: string;
  onSortChange: (value: string) => void;
  view: 'grid' | 'list';
  onViewChange: (view: 'grid' | 'list') => void;
}

export function SortBar({ total, sortBy, onSortChange, view, onViewChange }: SortBarProps) {
  return (
    <div className="flex items-center justify-between pb-6 border-b border-neutral-200 mb-8">
      <p className="text-sm text-neutral-500">
        <span className="font-semibold text-charcoal">{total}</span> products
      </p>

      <div className="flex items-center gap-4">
        <div className="hidden sm:flex items-center gap-1">
          <button
            onClick={() => onViewChange('grid')}
            className={`p-1.5 rounded ${view === 'grid' ? 'text-charcoal' : 'text-neutral-300'}`}
          >
            <Grid3X3 size={18} />
          </button>
          <button
            onClick={() => onViewChange('list')}
            className={`p-1.5 rounded ${view === 'list' ? 'text-charcoal' : 'text-neutral-300'}`}
          >
            <LayoutList size={18} />
          </button>
        </div>

        <select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
          className="text-sm border border-neutral-200 bg-transparent rounded-sm px-3 py-2 focus:outline-none focus:border-charcoal cursor-pointer"
        >
          {sortOptions.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </div>
    </div>
  );
}
