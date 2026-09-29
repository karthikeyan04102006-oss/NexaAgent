'use client';

import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { User, Mail, Shield, Building2, CheckCircle2, Camera } from 'lucide-react';

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
      <div className="space-y-6 max-w-4xl mx-auto">
        {/* HEADER */}
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
            <User className="w-7 h-7 text-red-500" /> User Profile
          </h1>
          <p className="text-xs text-zinc-400 mt-1">
            Manage your personal profile, avatar, email preferences, and organization details.
          </p>
        </div>

        {savedSuccess && (
          <div className="p-3 bg-emerald-950/60 border border-emerald-800 rounded-xl text-xs text-emerald-300 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" /> Profile updated successfully!
          </div>
        )}

        <Card variant="glow" className="p-6 md:p-8 space-y-6">
          {/* Avatar Section */}
          <div className="flex items-center gap-6 border-b border-zinc-800 pb-6">
            <div className="relative">
              <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-red-600 to-rose-400 flex items-center justify-center text-white font-extrabold text-2xl shadow-red-glow">
                {fullName.charAt(0)}
              </div>
              <button className="absolute bottom-0 right-0 p-1.5 bg-zinc-900 border border-zinc-700 rounded-full text-zinc-300 hover:text-white">
                <Camera className="w-3.5 h-3.5" />
              </button>
            </div>

            <div>
              <h2 className="text-xl font-bold text-white">{fullName}</h2>
              <div className="text-xs text-zinc-400 font-mono mt-0.5">{user?.email || 'alex@enterprise-nexa.io'}</div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-red-950 text-red-300 border border-red-800 text-[10px] font-mono font-bold uppercase mt-2">
                <Shield className="w-3 h-3" /> Role: {user?.role?.replace('_', ' ')}
              </div>
            </div>
          </div>

          {/* Edit Profile Form */}
          <form onSubmit={handleSave} className="space-y-4 max-w-lg text-xs">
            <div>
              <label className="block text-zinc-300 font-semibold mb-1 uppercase tracking-wider">
                Full Name
              </label>
              <input
                type="text"
                required
                value={fullName}
                onChange={e => setFullName(e.target.value)}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-red-600"
              />
            </div>

            <div>
              <label className="block text-zinc-300 font-semibold mb-1 uppercase tracking-wider">
                Email Address
              </label>
              <input
                type="email"
                disabled
                value={user?.email || 'alex@enterprise-nexa.io'}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2.5 text-sm text-zinc-500 cursor-not-allowed"
              />
            </div>

            <div>
              <label className="block text-zinc-300 font-semibold mb-1 uppercase tracking-wider">
                Organization
              </label>
              <div className="flex items-center gap-2 p-3 bg-zinc-900 border border-zinc-800 rounded-xl text-zinc-200">
                <Building2 className="w-4 h-4 text-red-500" />
                <span className="font-semibold">{user?.organizationName || 'Nexa Technologies Inc.'}</span>
              </div>
            </div>

            <div className="pt-2">
              <Button type="submit" variant="primary" className="font-bold">
                Save Profile Changes
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </DashboardLayout>
  );
}
