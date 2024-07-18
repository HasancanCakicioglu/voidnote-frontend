import Sidebar from '@/components/sidebar';
import React from 'react';

export default function DashboardLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex flex-grow">
      <Sidebar />
      <div className="flex flex-grow">
        {children}
      </div>
    </div>
  );
}
