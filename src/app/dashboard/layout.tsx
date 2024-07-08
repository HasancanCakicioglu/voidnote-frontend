
import Sidebar from '@/components/sidebar';
import SidebarMobile from '@/components/sidebarMobile';
import React from 'react';


export default function DashboardLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>){
  return (
    <div className="flex">
      <Sidebar />
      <SidebarMobile />
      <div className="flex-1">
      {children}
      </div>
    </div>
  );
};

