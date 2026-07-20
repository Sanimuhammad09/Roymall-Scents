import React from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { Bell, Package, Tag, Info } from 'lucide-react';

export const Route = createFileRoute('/_shop/account/notifications')({
  component: NotificationsPage,
});

function NotificationsPage() {
  const notifications = [
    {
      id: '1',
      title: 'Order Shipped',
      message: 'Your order #ORD-A1B2C3D4 has been shipped and is on its way.',
      date: '2 hours ago',
      type: 'order',
      read: false,
    },
    {
      id: '2',
      title: 'Back in Stock',
      message: 'The Leon™ Eau de Parfum is back in stock!',
      date: '1 day ago',
      type: 'promo',
      read: true,
    },
    {
      id: '3',
      title: 'Welcome to Flairvigo',
      message: 'Thanks for creating an account. Enjoy 10% off your first order with code WELCOME10.',
      date: '3 days ago',
      type: 'system',
      read: true,
    }
  ];

  const getIcon = (type: string) => {
    switch(type) {
      case 'order': return <Package size={18} className="text-blue-500" />;
      case 'promo': return <Tag size={18} className="text-green-500" />;
      default: return <Info size={18} className="text-charcoal" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-charcoal">Notifications</h2>
        <button className="text-sm font-medium text-neutral-500 hover:text-charcoal">
          Mark all as read
        </button>
      </div>

      <div className="bg-white rounded-sm shadow-sm border border-neutral-100 overflow-hidden">
        {notifications.length === 0 ? (
          <div className="p-12 text-center text-neutral-500 flex flex-col items-center">
            <Bell size={32} className="mb-4 text-neutral-300" />
            <p>You have no new notifications.</p>
          </div>
        ) : (
          <div className="divide-y divide-neutral-100">
            {notifications.map((notification) => (
              <div 
                key={notification.id} 
                className={`p-6 flex gap-4 transition-colors ${notification.read ? 'bg-white' : 'bg-neutral-50/50'}`}
              >
                <div className="shrink-0 mt-1">
                  {getIcon(notification.type)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className={`font-semibold ${notification.read ? 'text-neutral-700' : 'text-charcoal'}`}>
                      {notification.title}
                    </h3>
                    <span className="text-xs text-neutral-400">{notification.date}</span>
                  </div>
                  <p className="text-sm text-neutral-600">{notification.message}</p>
                </div>
                {!notification.read && (
                  <div className="shrink-0 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
