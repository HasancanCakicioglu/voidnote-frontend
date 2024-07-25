"use server";
import {
  FolderTree,
  NotebookText,
  CalendarDays,
  ListTodo,
  Menu,
  LineChart,
  CircleDollarSignIcon,
  SparklesIcon,
  SquareIcon,
  
} from "lucide-react";

import { Button } from "@/components/ui/button";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useTranslations } from "next-intl";
import { Link } from "@/navigations";

const SidebarMobile = () => {
  const t = useTranslations("Sidebar");
  const n = useTranslations("Navbar");
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
              href="/note"
              className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
            >
              <NotebookText className="h-5 w-5" />
              {t("note")}
            </Link>
            <Link
              href="/tree-note"
              className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
            >
              <FolderTree className="h-5 w-5" />
              {t("tree")}
            </Link>
            <Link
              href="/todo-list"
              className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
            >
              <ListTodo className="h-5 w-5" />
              {t("todolist")}
            </Link>
            <Link
              href="/calendar"
              className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
            >
              <CalendarDays className="h-5 w-5" />
              {t("calendar")}
            </Link>
            <Link
              href="/analytics"
              className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
            >
              <LineChart className="h-5 w-5" />
              {t("analytics")}
            </Link>
            <Link
              href="/pricing"
              className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
            >
              <CircleDollarSignIcon className="h-5 w-5" />
              {n("pricing")}
            </Link>
            <Link
              href="/features"
              className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
            >
              <SparklesIcon className="h-5 w-5" />
              {n("features")}
            </Link>
            <Link
              href="/about"
              className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
            >
              <SquareIcon className="h-5 w-5" />
              {n("about")}
            </Link>

          </nav>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default SidebarMobile;
