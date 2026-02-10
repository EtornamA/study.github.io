import React from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { GlobalSearchDialog } from '@/components/search/GlobalSearchDialog';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAppStore } from '@/store/useAppStore';

export function MainLayout() {
  const { sidebarOpen, toggleSidebar } = useAppStore();

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <GlobalSearchDialog />
      {/* Mobile Menu Button */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-50 sm:hidden"
        onClick={toggleSidebar}
      >
        <Menu className="h-5 w-5" />
      </Button>
      <main
        className={cn(
          "min-h-screen transition-all duration-300 bg-background",
          "ml-0 sm:ml-16 md:ml-64",
          sidebarOpen && "md:ml-64"
        )}
      >
        <div className="container mx-auto px-4 sm:px-6 py-4 sm:py-6 md:py-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
