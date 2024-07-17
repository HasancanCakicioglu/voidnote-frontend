import Image from "next/image"
import { Button } from "@/components/ui/button"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import GenerateBreadcrumbs from "@/components/generateBreadcrumbs"
import SidebarMobile from "./sidebarMobile";

type SmallHeaderProps = {
  children?: React.ReactNode; // children props'u ekliyoruz
};

const SmallHeader: React.FC<SmallHeaderProps> = ({ children }) => {
  return (
    <div>
      <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
        <SidebarMobile/>
        <GenerateBreadcrumbs />
        <div className="relative ml-auto flex-1 md:grow-0">
          {children} {/* Children içeriğini burada render ediyoruz */}
        </div>
      </header>
    </div>
  );
};

export default SmallHeader;
