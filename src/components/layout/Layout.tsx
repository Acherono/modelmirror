
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
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
