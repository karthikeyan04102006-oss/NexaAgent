'use client';

import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useAgent } from '@/context/AgentContext';
import { useTheme } from '@/context/ThemeContext';
import { Search, Bell, Shield, Sun, Moon, Laptop } from 'lucide-react';
import Link from 'next/link';
import { ThemeSwitcher } from '@/components/ui/ThemeSwitcher';
import { Button } from '@/components/ui/Button';

export const TopBar: React.FC = () => {
  const { user } = useAuth();
  const { notifications, markNotificationAsRead } = useAgent();
  const { theme, setTheme } = useTheme();
  const [showNotifs, setShowNotifs] = useState<boolean>(false);

  const unreadCount = notifications.filter(n => !n.read).length;

  const toggleTheme = () => {
    if (theme === 'light') setTheme('dark');
    else if (theme === 'dark') setTheme('system');
    else setTheme('light');
  };

  return (
    <header className="h-16 bg-[#FAF9FC]/90 backdrop-blur-md border-b border-[#E7E3EC] px-8 flex items-center justify-between sticky top-0 z-20">
      {/* Search Bar */}
      <div className="relative max-w-md w-full">
        <Search className="w-3.5 h-3.5 text-[#96919F] absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          placeholder="Search agent goals, tasks, tools..."
          className="w-full bg-[#FFFFFF] border border-[#E7E3EC] rounded-md pl-9 pr-4 py-1.5 text-xs text-[#17151C] placeholder-[#96919F] focus:outline-none focus:border-[#A78BFA] focus:ring-1 focus:ring-[#A78BFA] transition-all"
        />
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-4">
        {/* Role Badge indicator */}
        <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-[10px] bg-[#FAF9FC] dark:bg-[#111116] border border-[#E7E3EC] dark:border-[#23222B] text-[10px] font-mono tracking-widest uppercase text-[#696572] dark:text-[#A7A3B2] font-semibold">
          <Shield className="w-3 h-3 text-[#A78BFA]" />
          <span>{user?.role?.replace('_', ' ') || 'User'}</span>
        </div>

        {/* Professional Theme Switcher */}
        <ThemeSwitcher />

        {/* Notifications Center Toggle & Popover */}
        <div className="relative">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setShowNotifs(!showNotifs)}
            aria-label="Toggle notifications"
            className="relative"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-[#A78BFA] animate-ping"></span>
            )}
            {unreadCount > 0 && (
              <span className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-[#A78BFA]"></span>
            )}
          </Button>

          {/* Notifications Drawer */}
          {showNotifs && (
            <div className="absolute right-0 mt-2 w-80 bg-[#FFFFFF] border border-[#E7E3EC] rounded-lg shadow-editorial p-4 z-50 text-xs space-y-3">
              <div className="flex items-center justify-between border-b border-[#E7E3EC] pb-2.5">
                <span className="font-semibold text-[#17151C] uppercase tracking-wider text-[11px]">
                  Notifications
                </span>
                <span className="text-[10px] font-mono text-[#96919F]">{unreadCount} UNREAD</span>
              </div>

              <div className="space-y-2 max-h-64 overflow-y-auto">
                {notifications.length === 0 ? (
                  <div className="text-center py-4 text-[#96919F]">No activity notifications.</div>
                ) : (
                  notifications.map(n => (
                    <div
                      key={n.id}
                      onClick={() => markNotificationAsRead(n.id)}
                      className={`p-3 rounded border transition-all cursor-pointer ${
                        n.read 
                          ? 'bg-[#FAF9FC] border-[#E7E3EC] text-[#96919F]' 
                          : 'bg-white border-[#A78BFA]/40 text-[#17151C]'
                      }`}
                    >
                      <div className="font-semibold flex items-center justify-between">
                        <span>{n.title}</span>
                        {!n.read && <span className="w-1.5 h-1.5 rounded-full bg-[#A78BFA]"></span>}
                      </div>
                      <p className="text-[11px] text-[#696572] mt-1">{n.message}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* User Avatar */}
        <div className="flex items-center gap-2 pl-3 border-l border-[#E7E3EC]">
          <Link href="/profile">
            <div className="w-7 h-7 rounded-full bg-[#17151C] text-[#FAF9FC] font-bold text-xs flex items-center justify-center">
              {user?.fullName?.charAt(0) || 'A'}
            </div>
          </Link>
        </div>
      </div>
    </header>
  );
};

