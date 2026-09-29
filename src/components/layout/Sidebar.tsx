'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
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
  Sparkles, 
  ShieldCheck,
  Building2,
  User
} from 'lucide-react';

export const Sidebar: React.FC = () => {
  const pathname = usePathname();
  const { user, logout, switchRole } = useAuth();

  const userNavItems = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Agent', href: '/agent', icon: Cpu, highlight: true },
    { name: 'Tasks', href: '/tasks', icon: ListTodo },
    { name: 'Workflows', href: '/workflows', icon: GitFork },
    { name: 'Integrations', href: '/integrations', icon: Blocks },
    { name: 'Activity', href: '/activity', icon: Activity },
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
    <aside className="w-64 bg-zinc-950 border-r border-zinc-800 flex flex-col justify-between h-screen sticky top-0 shrink-0 select-none z-30">
      <div>
        {/* Logo & Brand Header */}
        <div className="p-5 border-b border-zinc-800/80 flex items-center justify-between">
          <Link href="/dashboard" className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-xl bg-red-gradient p-0.5 shadow-red-glow group-hover:shadow-red-glow-lg transition-all duration-300">
              <div className="w-full h-full bg-zinc-950 rounded-[10px] flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-red-500 group-hover:scale-110 transition-transform" />
              </div>
            </div>
            <div>
              <span className="text-lg font-extrabold tracking-tight text-white group-hover:text-red-400 transition-colors">
                Nexa<span className="text-red-500">Agent</span>
              </span>
              <span className="block text-[10px] font-mono text-zinc-500 uppercase tracking-widest -mt-1">
                Autonomous AI Platform
              </span>
            </div>
          </Link>
        </div>

        {/* User Workspace Section */}
        <nav className="p-3 space-y-1">
          <div className="px-3 py-1 text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-widest">
            Workspace Nav
          </div>

          {userNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname?.startsWith(`${item.href}`));
            
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 ${
                  isActive
                    ? 'bg-gradient-to-r from-red-950/80 to-zinc-900 text-white border border-red-800/60 shadow-red-glow font-bold'
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-900/60 hover:border-zinc-800/50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-red-400' : 'text-zinc-400'}`} />
                  <span>{item.name}</span>
                </div>
                {item.highlight && (
                  <span className="text-[10px] font-mono font-bold bg-red-600 text-white px-2 py-0.5 rounded-full uppercase tracking-wider">
                    Core
                  </span>
                )}
              </Link>
            );
          })}

          {/* Client Admin Navigation Section */}
          {isClientAdmin && (
            <div className="pt-4 space-y-1">
              <div className="px-3 py-1 text-[10px] font-mono font-bold text-red-400 uppercase tracking-widest flex items-center gap-1.5">
                <ShieldCheck className="w-3 h-3 text-red-500" /> Client Admin
              </div>

              {adminNavItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center gap-3 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all duration-200 ${
                      isActive
                        ? 'bg-red-950/60 text-red-200 border border-red-800/60 shadow-red-glow font-bold'
                        : 'text-zinc-400 hover:text-white hover:bg-zinc-900/60'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isActive ? 'text-red-400' : 'text-zinc-500'}`} />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </div>
          )}
        </nav>
      </div>

      {/* Footer Profile & Role Switcher */}
      <div className="p-3 border-t border-zinc-800/80 space-y-3 bg-zinc-950/80">
        {user?.organizationName && (
          <div className="p-2.5 rounded-lg bg-zinc-900/80 border border-zinc-800 flex items-center justify-between">
            <div className="flex items-center gap-2 overflow-hidden">
              <Building2 className="w-4 h-4 text-red-500 shrink-0" />
              <div className="truncate">
                <div className="text-xs font-semibold text-zinc-200 truncate">{user.organizationName}</div>
                <div className="text-[10px] text-zinc-500 capitalize">{user.role.replace('_', ' ')} Account</div>
              </div>
            </div>

            <button
              onClick={() => switchRole(user.role === 'client_admin' ? 'user' : 'client_admin')}
              title="Click to toggle between USER and CLIENT_ADMIN roles"
              className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-800 hover:bg-red-950 hover:text-red-300 text-zinc-300 border border-zinc-700 hover:border-red-600 transition-colors"
            >
              Toggle Role
            </button>
          </div>
        )}

        <div className="flex items-center justify-between p-2 rounded-lg hover:bg-zinc-900/60 transition-colors">
          <Link href="/profile" className="flex items-center gap-3 overflow-hidden group">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-red-600 to-rose-400 flex items-center justify-center text-white font-bold text-xs shrink-0 shadow-red-glow">
              {user?.fullName?.charAt(0) || 'A'}
            </div>
            <div className="truncate">
              <div className="text-xs font-semibold text-white group-hover:text-red-400 transition-colors truncate">{user?.fullName || 'Alex Vance'}</div>
              <div className="text-[10px] text-zinc-400 truncate">{user?.email || 'alex@enterprise.com'}</div>
            </div>
          </Link>

          <button
            onClick={logout}
            title="Sign out"
            className="p-1.5 text-zinc-500 hover:text-red-400 hover:bg-red-950/50 rounded-lg transition-colors"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
};
