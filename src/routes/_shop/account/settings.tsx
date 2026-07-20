import React from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuthStore } from '@/store/auth.store';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { api } from '@/lib/axios';
import toast from 'react-hot-toast';

export const Route = createFileRoute('/_shop/account/settings')({
  component: AccountSettingsPage,
});

const profileSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Valid email is required'),
});

const passwordSchema = z.object({
  currentPassword: z.string().min(1, 'Current password is required'),
  newPassword: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string(),
}).refine(data => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

function AccountSettingsPage() {
  const { user, setAuth } = useAuthStore();

  const profileForm = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      email: user?.email || '',
    },
  });

  const passwordForm = useForm({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  });

  const onUpdateProfile = async (data: any) => {
    try {
      // Assuming a PUT /users/me endpoint
      const response = await api.put('/users/me', data);
      setAuth(user ? { ...user, ...data } : null, useAuthStore.getState().token || '');
      toast.success('Profile updated successfully');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to update profile');
    }
  };

  const onUpdatePassword = async (data: any) => {
    try {
      // Assuming a PUT /auth/password endpoint
      await api.put('/auth/password', data);
      toast.success('Password updated successfully');
      passwordForm.reset();
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to update password');
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-charcoal">Account Settings</h2>
      </div>

      <div className="bg-white p-6 sm:p-8 rounded-sm shadow-sm border border-neutral-100 max-w-2xl">
        <h3 className="text-lg font-bold text-charcoal mb-6">Profile Information</h3>
        
        <form onSubmit={profileForm.handleSubmit(onUpdateProfile)} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs uppercase tracking-wider font-semibold text-neutral-500 mb-1 block">First Name</label>
              <Input {...profileForm.register('firstName')} />
              {profileForm.formState.errors.firstName && <span className="text-xs text-red-500">{profileForm.formState.errors.firstName.message as string}</span>}
            </div>
            <div>
              <label className="text-xs uppercase tracking-wider font-semibold text-neutral-500 mb-1 block">Last Name</label>
              <Input {...profileForm.register('lastName')} />
              {profileForm.formState.errors.lastName && <span className="text-xs text-red-500">{profileForm.formState.errors.lastName.message as string}</span>}
            </div>
          </div>
          <div>
            <label className="text-xs uppercase tracking-wider font-semibold text-neutral-500 mb-1 block">Email Address</label>
            <Input {...profileForm.register('email')} disabled />
            <p className="text-xs text-neutral-400 mt-1">To change your email address, please contact support.</p>
          </div>
          <Button type="submit" disabled={profileForm.formState.isSubmitting}>
            {profileForm.formState.isSubmitting ? 'Saving...' : 'Save Changes'}
          </Button>
        </form>
      </div>

      <div className="bg-white p-6 sm:p-8 rounded-sm shadow-sm border border-neutral-100 max-w-2xl">
        <h3 className="text-lg font-bold text-charcoal mb-6">Change Password</h3>
        
        <form onSubmit={passwordForm.handleSubmit(onUpdatePassword)} className="space-y-4">
          <div>
            <label className="text-xs uppercase tracking-wider font-semibold text-neutral-500 mb-1 block">Current Password</label>
            <Input type="password" {...passwordForm.register('currentPassword')} />
            {passwordForm.formState.errors.currentPassword && <span className="text-xs text-red-500">{passwordForm.formState.errors.currentPassword.message as string}</span>}
          </div>
          <div className="pt-2">
            <label className="text-xs uppercase tracking-wider font-semibold text-neutral-500 mb-1 block">New Password</label>
            <Input type="password" {...passwordForm.register('newPassword')} />
            {passwordForm.formState.errors.newPassword && <span className="text-xs text-red-500">{passwordForm.formState.errors.newPassword.message as string}</span>}
          </div>
          <div>
            <label className="text-xs uppercase tracking-wider font-semibold text-neutral-500 mb-1 block">Confirm New Password</label>
            <Input type="password" {...passwordForm.register('confirmPassword')} />
            {passwordForm.formState.errors.confirmPassword && <span className="text-xs text-red-500">{passwordForm.formState.errors.confirmPassword.message as string}</span>}
          </div>
          <Button type="submit" disabled={passwordForm.formState.isSubmitting}>
            {passwordForm.formState.isSubmitting ? 'Updating...' : 'Update Password'}
          </Button>
        </form>
      </div>
    </div>
  );
}
