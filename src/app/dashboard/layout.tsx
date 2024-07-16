import Sidebar from '@/components/sidebar';
import SidebarMobile from '@/components/sidebarMobile';
import React from 'react';

export default function DashboardLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex flex-grow overflow-hidden">
      <Sidebar />
      <SidebarMobile />
      <div className="flex flex-grow">
        {children}
      </div>
    </div>
  );
}
