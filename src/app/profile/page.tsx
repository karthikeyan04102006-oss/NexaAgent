'use client';

import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/Button';
import { User, Shield, Building2, CheckCircle2, Camera } from 'lucide-react';

export default function ProfilePage() {
  const { user } = useAuth();
  const [fullName, setFullName] = useState(user?.fullName || 'Alex Vance');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <DashboardLayout>
      <div className="space-y-8 max-w-4xl mx-auto">
        {/* HEADER */}
        <div className="border-b border-[#E7E3EC] pb-6 space-y-2">
          <div className="text-[10px] font-mono uppercase tracking-widest font-semibold text-[#A78BFA]">
            ACCOUNT
          </div>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tighter text-[#17151C]">
            Profile
          </h1>
        </div>

        {savedSuccess && (
          <div className="p-4 bg-[#FAF9FC] border border-[#E7E3EC] text-xs text-[#6D5BA6] flex items-center gap-2 font-medium rounded">
            <CheckCircle2 className="w-4 h-4 text-[#A78BFA]" /> Profile saved.
          </div>
        )}

        <div className="bg-[#FFFFFF] border border-[#E7E3EC] p-8 space-y-8 rounded-lg shadow-subtle">
          {/* Avatar Header */}
          <div className="flex items-center gap-6 border-b border-[#E7E3EC] pb-6">
            <div className="w-16 h-16 bg-[#17151C] text-[#FAF9FC] rounded-full flex items-center justify-center font-bold text-2xl">
              {fullName.charAt(0)}
            </div>

            <div className="space-y-1">
              <h2 className="text-xl font-bold text-[#17151C]">{fullName}</h2>
              <div className="text-xs text-[#696572]">{user?.email || 'alex@enterprise-nexa.io'}</div>
            </div>
          </div>

          {/* Profile Details Labels */}
          <form onSubmit={handleSave} className="space-y-6 max-w-lg text-xs">
            <div>
              <label className="block text-xs font-semibold text-[#17151C] mb-1.5">
                Name
              </label>
              <input
                type="text"
                required
                value={fullName}
                onChange={e => setFullName(e.target.value)}
                className="w-full bg-[#FAF9FC] border border-[#E7E3EC] rounded-md focus:border-[#A78BFA] px-4 py-2.5 text-xs text-[#17151C] focus:outline-none transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#17151C] mb-1.5">
                Email
              </label>
              <input
                type="email"
                disabled
                value={user?.email || 'alex@enterprise-nexa.io'}
                className="w-full bg-[#FAF9FC] border border-[#E7E3EC] rounded-md px-4 py-2.5 text-xs text-[#96919F] cursor-not-allowed font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#17151C] mb-1.5">
                User ID
              </label>
              <input
                type="text"
                disabled
                value={user?.id || 'usr_nexa_998421'}
                className="w-full bg-[#FAF9FC] border border-[#E7E3EC] rounded-md px-4 py-2.5 text-xs text-[#96919F] cursor-not-allowed font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#17151C] mb-1.5">
                Organization
              </label>
              <div className="flex items-center gap-3 p-3 bg-[#FAF9FC] border border-[#E7E3EC] rounded-md text-[#17151C]">
                <Building2 className="w-4 h-4 text-[#A78BFA]" />
                <span className="text-xs font-medium">{user?.organizationName || 'Nexa Technologies Inc.'}</span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#17151C] mb-1.5">
                Role
              </label>
              <div className="flex items-center gap-3 p-3 bg-[#FAF9FC] border border-[#E7E3EC] rounded-md text-[#17151C]">
                <Shield className="w-4 h-4 text-[#A78BFA]" />
                <span className="text-xs font-mono capitalize">{user?.role?.replace('_', ' ') || 'user'}</span>
              </div>
            </div>

            <div className="pt-2">
              <Button type="submit" className="bg-[#17151C] hover:bg-[#A78BFA] text-white py-2.5 px-6 text-xs font-semibold">
                Save Profile
              </Button>
            </div>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
}

