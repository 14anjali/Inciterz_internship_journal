import { ReactNode } from "react";
import RightNavSidebar from "./RightNavSidebar";

interface LayoutProps {
  children: ReactNode;
}

const AdminLayout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 relative xl:pr-14">{children}</main>
      <RightNavSidebar />
    </div>
  );
};

export default AdminLayout;
