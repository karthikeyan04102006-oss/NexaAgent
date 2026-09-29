'use client';

import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Settings, Building2, Shield, CheckCircle2, Key, Database } from 'lucide-react';

export default function ClientSettingsPage() {
  const { user } = useAuth();
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 max-w-4xl mx-auto">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-950/80 text-red-400 border border-red-800 text-xs font-semibold mb-1 shadow-red-glow">
            <Shield className="w-3.5 h-3.5" />
            <span>Client Admin Settings</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
            <Settings className="w-7 h-7 text-red-500" /> Organization Settings & Governance
          </h1>
          <p className="text-xs text-zinc-400 mt-1">
            Configure organization branding, security policies, API key storage, and Row Level Security rules.
          </p>
        </div>

        {savedSuccess && (
          <div className="p-3 bg-emerald-950/60 border border-emerald-800 rounded-xl text-xs text-emerald-300 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" /> Organization policies updated successfully!
          </div>
        )}

        <Card variant="glow" className="p-6 space-y-6">
          <h3 className="text-base font-bold text-white">General Organization Details</h3>

          <form onSubmit={handleSave} className="space-y-4 max-w-lg text-xs">
            <div>
              <label className="block text-zinc-300 font-semibold mb-1 uppercase tracking-wider">
                Organization Name
              </label>
              <input
                type="text"
                defaultValue={user?.organizationName || 'Nexa Technologies Inc.'}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-red-600"
              />
            </div>

            <div>
              <label className="block text-zinc-300 font-semibold mb-1 uppercase tracking-wider">
                Enterprise Plan Status
              </label>
              <div className="flex items-center justify-between p-3 bg-zinc-900 border border-zinc-800 rounded-xl text-zinc-200">
                <span className="font-bold text-emerald-400">Enterprise SaaS Tier</span>
                <span className="text-[10px] font-mono bg-emerald-950 text-emerald-300 px-2 py-0.5 rounded border border-emerald-800">ACTIVE</span>
              </div>
            </div>

            <div className="pt-2">
              <Button type="submit" variant="primary">
                Save Organization Settings
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </DashboardLayout>
  );
}
