import React from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export const Route = createFileRoute('/_shop/account/addresses')({
  component: AddressesPage,
});

function AddressesPage() {
  // Mock addresses for now
  const addresses = [
    {
      id: '1',
      isDefault: true,
      firstName: 'Jane',
      lastName: 'Doe',
      address1: '123 Fragrance Ave',
      address2: 'Apt 4B',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      country: 'US',
      phone: '+1 (555) 123-4567',
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-charcoal">Address Book</h2>
        <Button className="flex items-center gap-2">
          <Plus size={16} /> Add New
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {addresses.map((address) => (
          <div key={address.id} className="bg-white p-6 rounded-sm shadow-sm border border-neutral-100 flex flex-col">
            <div className="flex items-start justify-between mb-4">
              <h3 className="font-semibold text-charcoal">
                {address.firstName} {address.lastName}
              </h3>
              {address.isDefault && (
                <Badge variant="default" className="text-[10px]">Default</Badge>
              )}
            </div>
            
            <div className="text-sm text-neutral-600 mb-6 flex-1">
              <p>{address.address1}</p>
              {address.address2 && <p>{address.address2}</p>}
              <p>{address.city}, {address.state} {address.zipCode}</p>
              <p>{address.country}</p>
              <p className="mt-2">{address.phone}</p>
            </div>
            
            <div className="flex items-center gap-3 mt-auto pt-4 border-t border-neutral-100">
              <button className="text-sm font-semibold text-charcoal hover:underline flex items-center gap-1">
                <Edit2 size={14} /> Edit
              </button>
              <button className="text-sm font-semibold text-red-500 hover:underline flex items-center gap-1">
                <Trash2 size={14} /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
