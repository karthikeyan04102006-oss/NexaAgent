'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useTheme } from '@/context/ThemeContext';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Settings, User, Shield, Sparkles, Building2, CheckCircle2 } from 'lucide-react';
import { ThemeSwitcher } from '@/components/ui/ThemeSwitcher';

export default function SettingsPage() {
  const { user, logout } = useAuth();
  const { theme, setTheme } = useTheme();
  const [activeTab, setActiveTab] = useState<'account' | 'security' | 'notifications' | 'integrations' | 'appearance'>('account');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  const tabs = [
    { id: 'account', label: 'Account', icon: User },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'notifications', label: 'Notifications', icon: Sparkles },
    { id: 'integrations', label: 'Integrations', icon: Building2 },
    { id: 'appearance', label: 'Appearance', icon: Settings },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8 max-w-5xl mx-auto">
        {/* HEADER */}
        <div className="border-b border-[#E7E3EC] pb-6 space-y-2">
          <div className="text-[10px] font-mono uppercase tracking-widest font-semibold text-[#A78BFA]">
            PREFERENCES
          </div>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tighter text-[#17151C]">
            Settings
          </h1>
        </div>

        {/* SETTINGS SECTIONS TABS */}
        <div className="flex items-center gap-2 border-b border-[#E7E3EC] pb-2 overflow-x-auto">
          {tabs.map(tab => {
            const isSelected = activeTab === tab.id;
            return (
              <Button
                key={tab.id}
                variant={isSelected ? "primary" : "ghost"}
                size="sm"
                onClick={() => setActiveTab(tab.id as any)}
              >
                {tab.label}
              </Button>
            );
          })}
        </div>

        {savedSuccess && (
          <div className="p-4 bg-[#FAF9FC] border border-[#E7E3EC] text-xs text-[#6D5BA6] flex items-center gap-2 font-medium rounded">
            <CheckCircle2 className="w-4 h-4 text-[#A78BFA]" /> Settings saved.
          </div>
        )}

        {/* SECTION 1: ACCOUNT */}
        {activeTab === 'account' && (
          <Card className="p-8 space-y-6">
            <h3 className="text-base font-bold text-[#17151C] border-b border-[#E7E3EC] pb-3">Account</h3>
            <form onSubmit={handleSave} className="space-y-4 max-w-lg text-xs">
              <div>
                <label className="block text-xs font-semibold text-[#17151C] mb-1.5">Full Name</label>
                <input
                  type="text"
                  defaultValue={user?.fullName || 'Alex Vance'}
                  className="w-full bg-[#FAF9FC] border border-[#E7E3EC] rounded-md focus:border-[#A78BFA] px-4 py-2.5 text-xs text-[#17151C] focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#17151C] mb-1.5">Email</label>
                <input
                  type="email"
                  disabled
                  defaultValue={user?.email || 'alex@enterprise-nexa.io'}
                  className="w-full bg-[#FAF9FC] border border-[#E7E3EC] rounded-md px-4 py-2.5 text-xs text-[#96919F] cursor-not-allowed font-mono"
                />
              </div>

              <Button type="submit" variant="primary">
                Save Changes
              </Button>
            </form>
          </Card>
        )}

        {/* SECTION 2: SECURITY */}
        {activeTab === 'security' && (
          <Card className="p-8 space-y-6">
            <h3 className="text-base font-bold text-[#17151C] border-b border-[#E7E3EC] pb-3">Security</h3>
            <div className="space-y-4 text-xs max-w-lg">
              <div className="p-5 bg-[#FAF9FC] border border-[#E7E3EC] rounded-md space-y-3">
                <div className="font-semibold text-[#17151C]">Change Password</div>
                <input type="password" placeholder="Current password" className="w-full bg-white border border-[#E7E3EC] rounded-md p-2.5 text-xs text-[#17151C] focus:outline-none" />
                <input type="password" placeholder="New password" className="w-full bg-white border border-[#E7E3EC] rounded-md p-2.5 text-xs text-[#17151C] focus:outline-none" />
                <Button size="sm" variant="primary">
                  Update Password
                </Button>
              </div>

              <div className="p-5 bg-[#FAF9FC] border border-[#E7E3EC] rounded-md space-y-3">
                <div className="font-semibold text-[#17151C]">Active Sessions</div>
                <div className="text-[#696572] flex items-center justify-between text-xs">
                  <span>Current Browser Session</span>
                  <span className="text-[#6D5BA6] font-mono text-[10px] uppercase font-bold">ACTIVE</span>
                </div>
                <Button size="sm" onClick={logout} variant="secondary">
                  Sign out
                </Button>
              </div>
            </div>
          </Card>
        )}

        {/* SECTION 3: NOTIFICATIONS */}
        {activeTab === 'notifications' && (
          <Card className="p-8 space-y-6">
            <h3 className="text-base font-bold text-[#17151C] border-b border-[#E7E3EC] pb-3">Notifications</h3>
            <div className="space-y-4 text-xs text-[#696572]">
              <div className="p-4 bg-[#FAF9FC] border border-[#E7E3EC] rounded-md flex items-center justify-between">
                <div>
                  <div className="font-semibold text-[#17151C]">Task Completion Alerts</div>
                  <div className="text-xs text-[#696572] mt-0.5">Receive notifications when an agent run finishes</div>
                </div>
                <input type="checkbox" defaultChecked className="w-4 h-4 accent-[#A78BFA]" />
              </div>

              <div className="p-4 bg-[#FAF9FC] border border-[#E7E3EC] rounded-md flex items-center justify-between">
                <div>
                  <div className="font-semibold text-[#17151C]">Human Approval Alerts</div>
                  <div className="text-xs text-[#696572] mt-0.5">Immediate notifications for required authorizations</div>
                </div>
                <input type="checkbox" defaultChecked className="w-4 h-4 accent-[#A78BFA]" />
              </div>
            </div>
          </Card>
        )}

        {/* SECTION 4: INTEGRATIONS */}
        {activeTab === 'integrations' && (
          <Card className="p-8 space-y-6">
            <h3 className="text-base font-bold text-[#17151C] border-b border-[#E7E3EC] pb-3">Integrations</h3>
            <p className="text-xs text-[#696572]">
              Manage tool connections and API tokens for your agent work.
            </p>
            <Link href="/integrations">
              <Button variant="primary" size="sm">Go to Integrations →</Button>
            </Link>
          </Card>
        )}

        {/* SECTION 5: APPEARANCE */}
        {activeTab === 'appearance' && (
          <Card className="p-8 space-y-6">
            <h3 className="text-base font-bold text-[#17151C] dark:text-[#F5F3FF] border-b border-[#E7E3EC] dark:border-[#23222B] pb-3">Appearance</h3>
            <div className="space-y-4 text-xs">
              <p className="text-[#696572] dark:text-[#A7A3B2]">Choose your preferred theme mode across NexaAgent:</p>
              <div>
                <ThemeSwitcher />
              </div>
            </div>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
}

