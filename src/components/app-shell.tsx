"use client";

import { useState } from "react";
import { Sidebar } from "@/components/sidebar";
import { Header } from "@/components/header";
import { ToastProvider } from "@/components/ui/toast";
import { cn } from "@/lib/utils";

export function AppShell({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <ToastProvider>
      <div className="flex h-screen w-screen overflow-hidden">
        <Sidebar collapsed={collapsed} onToggle={() => setCollapsed((c) => !c)} />
        <div
          className={cn(
            "flex flex-1 flex-col min-w-0 transition-all duration-300"
          )}
        >
          <Header />
          <main className="flex-1 overflow-y-auto overflow-x-hidden">
            <div className="mx-auto w-full max-w-[1600px] px-6 py-6 md:px-8 md:py-8">
              {children}
            </div>
          </main>
        </div>
      </div>
    </ToastProvider>
  );
}
