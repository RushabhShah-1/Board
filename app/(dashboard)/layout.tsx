import { NavBar } from "./_components/navbar";
import { OrgSideBar } from "./_components/org-sidebar";
import { SideBar } from "./_components/sidebar";

interface DasboardLayoutProps {
  children: React.ReactNode;
}
const DasboardLayout = ({ children }: DasboardLayoutProps) => {
  return (
    <>
      <main className="h-full">
        <SideBar />
        <div className="pl-[60px] h-full">
          <div className="flex gap-x-3 h-full">
            <OrgSideBar />
            <div className="h-full flex-1">
              <NavBar />
              {children}
            </div>
          </div>
        </div>
      </main>
    </>
  );
};
export default DasboardLayout;
