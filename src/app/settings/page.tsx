'use client';

import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Settings, User, Shield, Bell, Sparkles, Building2, Key, CheckCircle2 } from 'lucide-react';

export default function SettingsPage() {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<'profile' | 'security' | 'ai' | 'org'>('profile');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 max-w-5xl mx-auto">
        {/* HEADER */}
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
            <Settings className="w-7 h-7 text-red-500" /> Platform Settings
          </h1>
          <p className="text-xs text-zinc-400 mt-1">
            Manage personal profile, security sessions, AI orchestrator preferences, and organization RBAC.
          </p>
        </div>

        {/* SETTINGS TABS */}
        <div className="flex items-center gap-2 border-b border-zinc-800 pb-2">
          {[
            { id: 'profile', label: 'Account Profile', icon: User },
            { id: 'security', label: 'Security & Sessions', icon: Shield },
            { id: 'ai', label: 'AI Preferences', icon: Sparkles },
            { id: 'org', label: 'Organization Settings', icon: Building2 },
          ].map(tab => {
            const Icon = tab.icon;
            const isSelected = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  isSelected
                    ? 'bg-red-950/80 text-white border border-red-800/80 shadow-red-glow'
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
                }`}
              >
                <Icon className="w-4 h-4 text-red-500" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {savedSuccess && (
          <div className="p-3 bg-emerald-950/60 border border-emerald-800 rounded-xl text-xs text-emerald-300 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" /> Settings updated successfully!
          </div>
        )}

        {/* TAB 1: PROFILE */}
        {activeTab === 'profile' && (
          <Card variant="glow" className="p-6 space-y-6">
            <h3 className="text-base font-bold text-white">Personal Profile</h3>
            <form onSubmit={handleSave} className="space-y-4 max-w-lg text-xs">
              <div>
                <label className="block text-zinc-400 font-semibold mb-1">Full Name</label>
                <input
                  type="text"
                  defaultValue={user?.fullName || 'Alex Vance'}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-2.5 text-white"
                />
              </div>

              <div>
                <label className="block text-zinc-400 font-semibold mb-1">Email Address</label>
                <input
                  type="email"
                  disabled
                  defaultValue={user?.email || 'alex@enterprise.com'}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-2.5 text-zinc-400 cursor-not-allowed"
                />
              </div>

              <div>
                <label className="block text-zinc-400 font-semibold mb-1">Account Role</label>
                <input
                  type="text"
                  disabled
                  defaultValue={user?.role?.toUpperCase()}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-2.5 text-red-400 font-mono font-bold cursor-not-allowed uppercase"
                />
              </div>

              <Button type="submit" variant="primary">Save Changes</Button>
            </form>
          </Card>
        )}

        {/* TAB 2: SECURITY */}
        {activeTab === 'security' && (
          <Card className="p-6 space-y-6">
            <h3 className="text-base font-bold text-white">Security & Active Sessions</h3>

            <div className="space-y-4 text-xs max-w-lg">
              <div className="p-4 bg-zinc-950 rounded-xl border border-zinc-800 space-y-2">
                <div className="font-bold text-white flex items-center justify-between">
                  <span>Change Password</span>
                  <Key className="w-4 h-4 text-zinc-500" />
                </div>
                <input type="password" placeholder="Current password" className="w-full bg-zinc-900 border border-zinc-800 p-2 rounded text-white" />
                <input type="password" placeholder="New password" className="w-full bg-zinc-900 border border-zinc-800 p-2 rounded text-white" />
                <Button size="sm" variant="secondary">Update Password</Button>
              </div>

              <div className="p-4 bg-zinc-950 rounded-xl border border-zinc-800 space-y-2">
                <div className="font-bold text-white">Active Sessions</div>
                <div className="text-zinc-400 flex items-center justify-between">
                  <span>Chrome / Windows (Current Session)</span>
                  <span className="text-emerald-400 font-mono text-[10px]">ACTIVE NOW</span>
                </div>
                <Button size="sm" variant="danger" onClick={logout}>Logout All Sessions</Button>
              </div>
            </div>
          </Card>
        )}

        {/* TAB 3: AI PREFERENCES */}
        {activeTab === 'ai' && (
          <Card className="p-6 space-y-4">
            <h3 className="text-base font-bold text-white">AI Orchestrator Preferences</h3>
            <div className="space-y-3 text-xs text-zinc-300">
              <div className="p-3 bg-zinc-950 border border-zinc-800 rounded-xl flex items-center justify-between">
                <div>
                  <div className="font-bold text-white">Primary AI Model</div>
                  <div className="text-zinc-400">Gemini 1.5 Pro (Configured)</div>
                </div>
                <span className="px-2 py-1 rounded bg-red-950 text-red-300 border border-red-800 font-mono">ACTIVE</span>
              </div>

              <div className="p-3 bg-zinc-950 border border-zinc-800 rounded-xl flex items-center justify-between">
                <div>
                  <div className="font-bold text-white">Secondary Model Support</div>
                  <div className="text-zinc-400">OpenAI GPT-4o Connector Architecture</div>
                </div>
                <span className="px-2 py-1 rounded bg-zinc-900 text-zinc-500 border border-zinc-800 font-mono">READY</span>
              </div>

              <div className="p-3 bg-zinc-950 border border-zinc-800 rounded-xl flex items-center justify-between">
                <div>
                  <div className="font-bold text-white">Human Approval Strictness</div>
                  <div className="text-zinc-400">Require authorization for all financial & messaging actions</div>
                </div>
                <input type="checkbox" defaultChecked className="w-4 h-4 accent-red-600" />
              </div>
            </div>
          </Card>
        )}

        {/* TAB 4: ORGANIZATION */}
        {activeTab === 'org' && (
          <Card className="p-6 space-y-4">
            <h3 className="text-base font-bold text-white">Organization Configuration</h3>
            <div className="text-xs text-zinc-400 space-y-2">
              <p>Organization Name: <strong className="text-white">{user?.organizationName || 'Nexa Technologies Inc.'}</strong></p>
              <p>Plan Tier: <strong className="text-emerald-400">Enterprise SaaS Tier</strong></p>
              <p>Data Isolation: <strong className="text-white">Supabase PostgreSQL RLS Enabled</strong></p>
            </div>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
}
