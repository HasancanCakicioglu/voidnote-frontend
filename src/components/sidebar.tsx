"use client"

import React, { useState } from 'react';
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
import { useTranslations } from 'next-intl';
import { Link } from '@/navigations';

const Sidebar = () => {
  const [open, setOpen] = useState(true);
  const pathname = usePathname(); // Mevcut yol bilgisini alır

  const t = useTranslations("Sidebar")

  const isActive = (path: string) => {
    // Split pathname and check if the current path matches
    const segments = pathname.split("/");
    // Ensure that segments have enough parts and match
    return segments.length > 2 && "/"+segments[2] === path;
  };

  const toggleSidebar = () => {
    setOpen(!open);
  };

  return (
    <div className={`hidden md:flex flex-shrink-0 ${open ? 'w-52' : 'w-14'} flex-col border-r bg-background transition-width duration-200 h-full `}>
      <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
        <button
          onClick={toggleSidebar}
          className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 my-5 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-10 md:w-10 md:text-base"
        >
          <Menu className="h-4 w-4 transition-all group-hover:scale-110" />
        </button>
        <Separator />

        <Link
          href="/note"
          className={`flex h-9 w-full items-center justify-start rounded-lg transition-colors md:h-8 ${isActive('/note') ? 'bg-accent text-accent-foreground' : 'text-muted-foreground hover:text-foreground'}`}
        >
          <NotebookText className="h-5 w-5 ml-2" />
          {open && <span className="ml-3 text-base">{t("note")}</span>}
          <span className="sr-only">Note</span>
        </Link>

        <Link
          href="/tree-note"
          className={`flex h-9 w-full items-center justify-start rounded-lg transition-colors md:h-8 ${isActive('/tree-note') ? 'bg-accent text-accent-foreground' : 'text-muted-foreground hover:text-foreground'}`}
        >
          <FolderTree className="h-5 w-5 ml-2" />
          {open && <span className="ml-3 text-base">{t("tree")}</span>}
        </Link>

        <Link
          href="/todo-list"
          className={`flex h-9 w-full items-center justify-start rounded-lg transition-colors md:h-8 ${isActive('/todo-list') ? 'bg-accent text-accent-foreground' : 'text-muted-foreground hover:text-foreground'}`}
        >
          <ListTodo className="h-5 w-5 ml-2" />
          {open && <span className="ml-3 text-base">{t("todolist")}</span>}
        </Link>

        <Link
          href="/calendar"
          className={`flex h-9 w-full items-center justify-start rounded-lg transition-colors md:h-8 ${isActive('/calendar') ? 'bg-accent text-accent-foreground' : 'text-muted-foreground hover:text-foreground'}`}
        >
          <CalendarDays className="h-5 w-5 ml-2" />
          {open && <span className="ml-3 text-base">{t("calendar")}</span>}
        </Link>

        <Link
          href="/analytics"
          className={`flex h-9 w-full items-center justify-start rounded-lg transition-colors md:h-8 ${isActive('/analytics') ? 'bg-accent text-accent-foreground' : 'text-muted-foreground hover:text-foreground'}`}
        >
          <LineChart className="h-5 w-5 ml-2" />
          {open && <span className="ml-3 text-base">{t("analytics")}</span>}
        </Link>
      </nav>

      <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
        <Link
          href="/settings"
          className={`flex h-9 w-full items-center justify-start rounded-lg transition-colors md:h-8 ${isActive('/settings') ? 'bg-accent text-accent-foreground' : 'text-muted-foreground hover:text-foreground'}`}
        >
          <Settings className="h-5 w-5 ml-2" />
          {open && <span className="ml-3 text-base">{t("settings")}</span>}
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;
