'use client';

import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useAgent } from '@/context/AgentContext';
import { Search, Bell, HelpCircle, Shield, Sparkles, Check, ExternalLink } from 'lucide-react';
import Link from 'next/link';

export const TopBar: React.FC = () => {
  const { user } = useAuth();
  const { notifications, markNotificationAsRead } = useAgent();
  const [showNotifs, setShowNotifs] = useState<boolean>(false);

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <header className="h-16 bg-zinc-950/80 backdrop-blur-md border-b border-zinc-800 px-6 flex items-center justify-between sticky top-0 z-20">
      {/* Search Bar */}
      <div className="relative max-w-md w-full">
        <Search className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          placeholder="Search agent runs, tasks, tools, or workflows..."
          className="w-full bg-zinc-900/90 border border-zinc-800 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-red-600/60 focus:ring-1 focus:ring-red-600/60 transition-all"
        />
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-4">
        {/* Role Badge indicator */}
        <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-xs text-zinc-300">
          <Shield className="w-3.5 h-3.5 text-red-500" />
          <span className="font-semibold capitalize">{user?.role?.replace('_', ' ') || 'User'}</span>
        </div>

        {/* Help Icon */}
        <button
          title="NexaAgent Documentation & Help"
          className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-900 rounded-lg transition-colors"
        >
          <HelpCircle className="w-4 h-4" />
        </button>

        {/* Notifications Center Toggle & Popover */}
        <div className="relative">
          <button
            onClick={() => setShowNotifs(!showNotifs)}
            className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-900 rounded-lg transition-colors relative"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
            )}
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-red-600"></span>
            )}
          </button>

          {/* Notifications Drawer */}
          {showNotifs && (
            <div className="absolute right-0 mt-2 w-80 bg-zinc-950 border border-zinc-800 rounded-xl shadow-red-glow-lg p-3 z-50 text-xs space-y-2 animate-in fade-in zoom-in-95 duration-150">
              <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
                <span className="font-bold text-white flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-red-500" /> Notifications
                </span>
                <span className="text-[10px] text-zinc-400">{unreadCount} unread</span>
              </div>

              <div className="space-y-1.5 max-h-64 overflow-y-auto">
                {notifications.length === 0 ? (
                  <div className="text-center py-4 text-zinc-500">No notifications yet.</div>
                ) : (
                  notifications.map(n => (
                    <div
                      key={n.id}
                      onClick={() => markNotificationAsRead(n.id)}
                      className={`p-2.5 rounded-lg border transition-all cursor-pointer ${
                        n.read ? 'bg-zinc-900/40 border-zinc-800/40 text-zinc-400' : 'bg-red-950/30 border-red-800/40 text-zinc-200'
                      }`}
                    >
                      <div className="font-semibold text-white flex items-center justify-between">
                        <span>{n.title}</span>
                        {!n.read && <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>}
                      </div>
                      <p className="text-[11px] text-zinc-400 mt-0.5">{n.message}</p>
                      <div className="text-[9px] text-zinc-500 mt-1 flex items-center justify-between">
                        <span>{n.createdAt}</span>
                        {n.actionUrl && (
                          <Link href={n.actionUrl} className="text-red-400 hover:underline flex items-center gap-0.5">
                            View <ExternalLink className="w-2.5 h-2.5" />
                          </Link>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* User Avatar */}
        <div className="flex items-center gap-2 pl-2 border-l border-zinc-800">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-red-600 to-rose-400 flex items-center justify-center text-white font-bold text-xs shadow-red-glow">
            {user?.fullName?.charAt(0) || 'A'}
          </div>
        </div>
      </div>
    </header>
  );
};
