'use client';

import { useAuth } from './auth-context';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { BarChart3, Package, LogOut, Menu, X, Sparkles } from 'lucide-react';
import { useState } from 'react';

export function Sidebar() {
  const { user, logout, isManager } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  const menuItems = [
    {
      name: 'Dashboard',
      icon: BarChart3,
      href: '/dashboard',
      visible: isManager,
    },
    {
      name: 'Products',
      icon: Package,
      href: '/products',
      visible: true,
    },
    {
      name: 'Analytics',
      icon: Package,
      href: '/analytics',
      visible: isManager,
    },
    {
      name: 'Orders',
      icon: Package,
      href: '/orders',
      visible: true,
    },
  ];

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-primary text-primary-foreground hover:scale-110 transition-transform"
      >
        {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      <aside
        className={cn(
          'fixed lg:static top-0 left-0 h-screen w-64 bg-sidebar border-r border-sidebar-border transition-all duration-300 z-40',
          'flex flex-col',
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        )}
      >
        <div className="p-6 border-b border-sidebar-border bg-gradient-to-r from-sidebar-primary/10 to-sidebar-accent/10 animate-fade-in">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-sidebar-primary/20 rounded-lg">
              <Sparkles className="w-5 h-5 text-sidebar-primary animate-float" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-sidebar-foreground bg-gradient-to-r from-sidebar-primary to-sidebar-accent bg-clip-text text-transparent">
                Sloozify
              </h1>
              <p className="text-xs text-sidebar-accent-foreground/70">
                Smart Inventory
              </p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {menuItems.map(
            (item, index) =>
              item.visible && (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    'flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 animate-slide-in',
                    'text-sidebar-foreground hover:bg-sidebar-accent/10 hover:scale-105',
                    pathname === item.href &&
                      'bg-sidebar-primary text-sidebar-primary-foreground shadow-lg'
                  )}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium">{item.name}</span>
                </Link>
              )
          )}
        </nav>

        <div className="border-t border-sidebar-border p-4 space-y-3 bg-sidebar-accent/5">
          <div className="px-2 py-2 animate-fade-in">
            <p className="text-xs text-sidebar-accent-foreground/70 uppercase tracking-wider">
              Logged in as
            </p>
            <p className="text-sm font-semibold text-sidebar-foreground truncate">
              {user?.name}
            </p>
            <p className="text-xs text-sidebar-accent-foreground/70 mt-1">
              {user?.role === 'manager' ? '👔 Manager' : '📦 Store Keeper'}
            </p>
          </div>
          <button
            onClick={handleLogout}
            className={cn(
              'w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg',
              'bg-destructive/10 text-destructive hover:bg-destructive/20',
              'transition-all duration-200 font-medium hover:scale-105'
            )}
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </aside>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 lg:hidden z-30 animate-fade-in"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
