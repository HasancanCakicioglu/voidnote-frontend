import GenerateBreadcrumbs from "@/components/generateBreadcrumbs"


type SmallHeaderProps = {
  children?: React.ReactNode; // children props'u ekliyoruz
};

const SmallHeader: React.FC<SmallHeaderProps> = ({ children }) => {
  return (
    <div>
      <header className="hidden md:flex sticky top-0 z-30 h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
        <GenerateBreadcrumbs />
        <div className="relative ml-auto flex-1 md:grow-0">
          {children} {/* Children içeriğini burada render ediyoruz */}
        </div>
      </header>
    </div>
  );
};

export default SmallHeader;
