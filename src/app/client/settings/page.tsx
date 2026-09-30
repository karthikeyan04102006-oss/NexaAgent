'use client';

import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/Button';
import { Settings, Shield, CheckCircle2 } from 'lucide-react';

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
      <div className="space-y-10 max-w-4xl mx-auto py-2">
        {/* HEADER */}
        <div className="border-b border-[#DAD8D2] pb-6 space-y-2">
          <div className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-[#830000] uppercase">
            <Shield className="w-4 h-4 text-[#830000]" />
            <span>ORGANIZATION GOVERNANCE</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-serif font-medium text-[#111111] tracking-tight flex items-center gap-3">
            ORGANIZATION SETTINGS & GOVERNANCE
          </h1>
          <p className="text-xs text-[#555555] font-sans">
            Configure organization branding, security policies, API key storage, and Row Level Security rules.
          </p>
        </div>

        {savedSuccess && (
          <div className="p-4 bg-[#FAFAF7] border border-[#DAD8D2] text-xs text-[#830000] font-mono flex items-center gap-2 uppercase tracking-wider">
            <CheckCircle2 className="w-4 h-4 text-[#830000]" /> Organization policies updated successfully!
          </div>
        )}

        <div className="bg-[#FFFFFF] border border-[#DAD8D2] p-8 space-y-6">
          <h3 className="text-lg font-serif font-medium text-[#111111] border-b border-[#DAD8D2] pb-4">GENERAL ORGANIZATION DETAILS</h3>

          <form onSubmit={handleSave} className="space-y-6 max-w-lg text-xs">
            <div>
              <label className="block text-[11px] font-mono uppercase tracking-widest text-[#555555] mb-2">
                Organization Name
              </label>
              <input
                type="text"
                defaultValue={user?.organizationName || 'Nexa Technologies Inc.'}
                className="w-full bg-[#FAFAF7] border border-[#DAD8D2] focus:border-[#111111] px-4 py-3 text-sm text-[#111111] focus:outline-none transition-colors"
              />
            </div>

            <div>
              <label className="block text-[11px] font-mono uppercase tracking-widest text-[#555555] mb-2">
                Enterprise Plan Status
              </label>
              <div className="flex items-center justify-between p-4 bg-[#FAFAF7] border border-[#DAD8D2] text-[#111111]">
                <span className="font-serif font-medium text-sm">Enterprise SaaS Tier</span>
                <span className="text-[10px] font-mono bg-[#111111] text-white px-2.5 py-1 uppercase tracking-widest">ACTIVE</span>
              </div>
            </div>

            <div className="pt-2">
              <Button type="submit" className="bg-[#111111] hover:bg-[#830000] text-white py-3 px-6 font-mono text-xs uppercase tracking-wider transition-colors">
                Save Organization Settings
              </Button>
            </div>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
}

