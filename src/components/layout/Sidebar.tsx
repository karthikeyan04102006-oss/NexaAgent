'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Logo } from '@/components/ui/Logo';
import { Button } from '@/components/ui/Button';
import { 
  LayoutDashboard, 
  Cpu, 
  ListTodo, 
  GitFork, 
  Blocks, 
  Activity, 
  BarChart3, 
  Users, 
  Settings, 
  LogOut, 
  ShieldCheck,
  Building2,
  User
} from 'lucide-react';

export const Sidebar: React.FC = () => {
  const pathname = usePathname();
  const { user, logout, switchRole } = useAuth();

  const userNavItems = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Agent Execution', href: '/agent', icon: Cpu, highlight: true },
    { name: 'Tasks', href: '/tasks', icon: ListTodo },
    { name: 'Workflows', href: '/workflows', icon: GitFork },
    { name: 'Integrations', href: '/integrations', icon: Blocks },
    { name: 'Activity Stream', href: '/activity', icon: Activity },
    { name: 'Profile', href: '/profile', icon: User },
    { name: 'Settings', href: '/settings', icon: Settings },
  ];

  const adminNavItems = [
    { name: 'Client Overview', href: '/client', icon: Building2 },
    { name: 'Team Roster', href: '/client/team', icon: Users },
    { name: 'Org Analytics', href: '/client/analytics', icon: BarChart3 },
    { name: 'Org Settings', href: '/client/settings', icon: Settings },
  ];

  const isClientAdmin = user?.role === 'client_admin';

  return (
    <aside className="w-64 bg-[#FAF9FC] border-r border-[#E7E3EC] flex flex-col justify-between h-screen sticky top-0 shrink-0 select-none z-30">
      <div>
        {/* Logo & Brand Header */}
        <div className="p-5 border-b border-[#E7E3EC] flex items-center justify-between">
          <Link href="/dashboard" className="flex items-center gap-3 group">
            <Logo size={32} showWordmark={true} variant="editorial" />
          </Link>
        </div>

        {/* User Workspace Section */}
        <nav className="p-4 space-y-1">
          <div className="px-3 py-1.5 text-[9px] font-mono uppercase tracking-widest text-[#A78BFA] font-semibold">
            WORKSPACE
          </div>

          {userNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname?.startsWith(`${item.href}`));
            
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center justify-between px-3.5 py-2 rounded-md text-xs tracking-tight transition-all duration-150 ${
                  isActive
                    ? 'bg-[#FFFFFF] text-[#17151C] border-l-2 border-[#A78BFA] font-semibold shadow-subtle'
                    : 'text-[#696572] hover:text-[#17151C] hover:bg-[#FAF9FC]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#A78BFA]' : 'text-[#96919F]'}`} />
                  <span>{item.name}</span>
                </div>
                {item.highlight && (
                  <span className="text-[9px] font-mono font-semibold text-[#6D5BA6] bg-[#DDD6FE]/40 border border-[#A78BFA]/30 px-1.5 py-0.2 rounded-full uppercase tracking-wider">
                    Core
                  </span>
                )}
              </Link>
            );
          })}

          {/* Client Admin Navigation Section */}
          {isClientAdmin && (
            <div className="pt-4 space-y-1">
              <div className="px-3 py-1.5 text-[9px] font-mono font-semibold text-[#A78BFA] uppercase tracking-widest flex items-center gap-1.5">
                <ShieldCheck className="w-3 h-3 text-[#A78BFA]" /> CLIENT ADMIN
              </div>

              {adminNavItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center gap-3 px-3.5 py-2 rounded-md text-xs tracking-tight transition-all duration-150 ${
                      isActive
                        ? 'bg-[#FFFFFF] text-[#17151C] border-l-2 border-[#A78BFA] font-semibold shadow-subtle'
                        : 'text-[#696572] hover:text-[#17151C] hover:bg-[#FAF9FC]'
                    }`}
                  >
                    <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#A78BFA]' : 'text-[#96919F]'}`} />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </div>
          )}
        </nav>
      </div>

      {/* Footer Profile & Role Switcher */}
      <div className="p-4 border-t border-[#E7E3EC] space-y-3 bg-[#FAF9FC]">
        {user?.organizationName && (
          <div className="p-2.5 rounded-md bg-[#FFFFFF] border border-[#E7E3EC] flex items-center justify-between">
            <div className="flex items-center gap-2 overflow-hidden">
              <Building2 className="w-3.5 h-3.5 text-[#A78BFA] shrink-0" />
              <div className="truncate">
                <div className="text-xs font-semibold text-[#17151C] truncate">{user.organizationName}</div>
                <div className="text-[10px] text-[#696572] capitalize">{user.role.replace('_', ' ')}</div>
              </div>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => switchRole(user.role === 'client_admin' ? 'user' : 'client_admin')}
              title="Click to toggle between USER and CLIENT_ADMIN roles"
              className="text-[9px] h-6 px-2 py-0 font-mono"
            >
              Toggle
            </Button>
          </div>
        )}

        <div className="flex items-center justify-between p-2 rounded-md hover:bg-[#FFFFFF] dark:hover:bg-[#16161D] transition-colors">
          <Link href="/profile" className="flex items-center gap-3 overflow-hidden group">
            <div className="w-7 h-7 rounded-full bg-[#17151C] dark:bg-[#A78BFA] text-[#FAF9FC] dark:text-[#100D16] font-bold text-xs flex items-center justify-center shrink-0">
              {user?.fullName?.charAt(0) || 'A'}
            </div>
            <div className="truncate">
              <div className="text-xs font-semibold text-[#17151C] dark:text-[#F5F3FF] group-hover:text-[#6D5BA6] dark:group-hover:text-[#C4B5FD] transition-colors truncate">{user?.fullName || 'Alex Vance'}</div>
              <div className="text-[10px] text-[#696572] dark:text-[#A7A3B2] truncate">{user?.email || 'alex@enterprise.com'}</div>
            </div>
          </Link>

          <Button
            variant="ghost"
            size="icon"
            onClick={logout}
            title="Sign out"
            aria-label="Sign out"
            className="w-7 h-7 p-0"
          >
            <LogOut className="w-3.5 h-3.5" />
          </Button>
        </div>
      </div>
    </aside>
  );
};

