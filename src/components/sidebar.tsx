"use client"

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LineChart,
  FolderTree,
  NotebookText,
  CalendarDays,
  ListTodo,
  Menu,
  Settings,
} from 'lucide-react';
import { Separator } from "@/components/ui/separator";

const Sidebar = () => {
  const [open, setOpen] = useState(true);
  const pathname = usePathname(); // Mevcut yol bilgisini alır

  // Aktif rotanın belirlenmesi
  const isActive = (path: string) => pathname.startsWith(path);

  const toggleSidebar = () => {
    setOpen(!open);
  };

  return (
    <div className={`hidden left-0 z-10 ${open ? 'w-52' : 'w-14'} flex-col border-r min-h-screen bg-background sm:flex`}>
      <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
        <button
          onClick={toggleSidebar}
          className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 my-5 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-10 md:w-10 md:text-base"
        >
          <Menu className="h-4 w-4 transition-all group-hover:scale-110" />
        </button>
        <Separator />

        <Link
          href="/dashboard/note"
          className={`flex h-9 w-full items-center justify-start rounded-lg transition-colors md:h-8 ${isActive('/dashboard/note') ? 'bg-accent text-accent-foreground' : 'text-muted-foreground hover:text-foreground'}`}
        >
          <NotebookText className="h-5 w-5 ml-2" />
          {open && <span className="ml-3 text-base">Note</span>}
          <span className="sr-only">Note</span>
        </Link>

        <Link
          href="/dashboard/tree-note"
          className={`flex h-9 w-full items-center justify-start rounded-lg transition-colors md:h-8 ${isActive('/dashboard/tree-note') ? 'bg-accent text-accent-foreground' : 'text-muted-foreground hover:text-foreground'}`}
        >
          <FolderTree className="h-5 w-5 ml-2" />
          {open && <span className="ml-3 text-base">Tree Note</span>}
        </Link>

        <Link
          href="/dashboard/todo-list"
          className={`flex h-9 w-full items-center justify-start rounded-lg transition-colors md:h-8 ${isActive('/dashboard/todo-list') ? 'bg-accent text-accent-foreground' : 'text-muted-foreground hover:text-foreground'}`}
        >
          <ListTodo className="h-5 w-5 ml-2" />
          {open && <span className="ml-3 text-base">Todo List</span>}
        </Link>

        <Link
          href="/dashboard/calendar"
          className={`flex h-9 w-full items-center justify-start rounded-lg transition-colors md:h-8 ${isActive('/dashboard/calendar') ? 'bg-accent text-accent-foreground' : 'text-muted-foreground hover:text-foreground'}`}
        >
          <CalendarDays className="h-5 w-5 ml-2" />
          {open && <span className="ml-3 text-base">Calendar Note</span>}
        </Link>

        <Link
          href="/dashboard/analytics"
          className={`flex h-9 w-full items-center justify-start rounded-lg transition-colors md:h-8 ${isActive('/dashboard/analytics') ? 'bg-accent text-accent-foreground' : 'text-muted-foreground hover:text-foreground'}`}
        >
          <LineChart className="h-5 w-5 ml-2" />
          {open && <span className="ml-3 text-base">Analytics</span>}
        </Link>
      </nav>

      <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
        <Link
          href="/dashboard/settings"
          className={`flex h-9 w-full items-center justify-start rounded-lg transition-colors md:h-8 ${isActive('/dashboard/settings') ? 'bg-accent text-accent-foreground' : 'text-muted-foreground hover:text-foreground'}`}
        >
          <Settings className="h-5 w-5 ml-2" />
          {open && <span className="ml-3 text-base">Settings</span>}
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;
