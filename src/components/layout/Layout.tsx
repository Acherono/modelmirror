
import { ReactNode } from "react";
import { Sidebar } from "./Sidebar";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex flex-col flex-1 ml-[200px] transition-all duration-300">
        <header className="py-4 px-6 flex items-center">
          <img src="/lovable-uploads/4e5a8e0f-1ba3-427e-8f09-56638597edf2.png" alt="GENRI Logo" className="h-12" />
        </header>
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
