import { createRootRoute, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import { Toaster } from 'react-hot-toast';
import { CartDrawer } from '@/features/cart/components/CartDrawer';

export const Route = createRootRoute({
  component: () => (
    <>
      <Outlet />
      <CartDrawer />
      <Toaster position="bottom-right" />
      {import.meta.env.DEV && <TanStackRouterDevtools />}
    </>
  ),
});
