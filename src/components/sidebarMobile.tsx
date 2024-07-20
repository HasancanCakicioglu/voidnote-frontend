import Link from "next/link"
import {
    LineChart,
    FolderTree,
    NotebookText,
    CalendarDays,
    ListTodo,
    Menu,
    Settings,
  
  } from 'lucide-react';


import { Button } from "@/components/ui/button"


import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"



const SidebarMobile = () => {
    return (
        <div className="flex md:hidden">
            <Sheet>
            <SheetTrigger asChild>
              <Button size="icon" variant="outline" className="md:hidden mt-2 ml-2">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="md:max-w-xs">
              <nav className="grid gap-6 text-lg font-medium">
                <Link
                  href="#"
                  className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
                >
                  <Menu className="h-5 w-5 transition-all group-hover:scale-110" />
                  <span className="sr-only">Menu</span>
                </Link>
                <Link
                  href="/dashboard/note"
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                >
                  <NotebookText className="h-5 w-5" />
                  Note
                </Link>
                <Link
                  href="/dashboard/tree-note"
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                >
                  <FolderTree className="h-5 w-5" />
                  Tree Note
                </Link>
                <Link
                  href="/dashboard/todo-list"
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                >
                  <ListTodo className="h-5 w-5" />
                  Todo List
                </Link>
                <Link
                  href="/dashboard/calendar"
                  className="flex items-center gap-4 px-2.5 text-foreground"
                >
                  <CalendarDays className="h-5 w-5" />
                  Calendar Note
                </Link>

                <Link
                  href="/dashboard/settings"
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                >
                  <Settings className="h-5 w-5" />
                  Settings
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
    );
};

export default SidebarMobile;