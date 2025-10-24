"use client";

import Link from "next/link";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";

export default function ResizableNavbarLayout({ children }: { children: React.ReactNode }) {
  return (
    <ResizablePanelGroup direction="horizontal" className="min-h-screen">
      <ResizablePanel defaultSize={22} minSize={16} className="border-r border-black/10 dark:border-white/10 bg-white dark:bg-neutral-950">
        <nav className="h-full flex flex-col p-4 gap-2">
          <div className="text-lg font-semibold mb-2">My Work</div>
          <Link href="/" className="text-sm opacity-80 hover:opacity-100">Home</Link>
          <Link href="/portfolio" className="text-sm opacity-80 hover:opacity-100">Portfolio</Link>
          <div className="mt-4 text-xs uppercase tracking-wide opacity-60">Sections</div>
          <Link href="#apps" className="text-sm opacity-80 hover:opacity-100">Apps</Link>
          <Link href="#design" className="text-sm opacity-80 hover:opacity-100">Design</Link>
          <Link href="#contact" className="text-sm opacity-80 hover:opacity-100">Contact</Link>
          <div className="mt-auto text-xs opacity-60">Drag the divider to resize →</div>
        </nav>
      </ResizablePanel>
      <ResizableHandle withHandle className="bg-transparent" />
      <ResizablePanel defaultSize={78} minSize={40}>
        <main className="min-h-screen">{children}</main>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}


