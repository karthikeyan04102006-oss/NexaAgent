'use client';

import React from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { DEMO_ANALYTICS, DEMO_ORGANIZATION } from '@/lib/demo-data';
import { Users, BarChart3, Settings, ShieldCheck, Zap, Activity } from 'lucide-react';

export default function ClientAdminDashboardPage() {
  const { user } = useAuth();

  return (
    <DashboardLayout>
      <div className="space-y-8 max-w-5xl mx-auto">
        {/* EDITORIAL HEADER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#E7E3EC] pb-8">
          <div>
            <div className="text-[10px] font-mono uppercase tracking-widest font-semibold text-[#A78BFA] mb-2">
              ORGANIZATION
            </div>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tighter text-[#17151C]">
              Organization
            </h1>
            <p className="text-sm text-[#696572] mt-1">
              Manage your team and agent activity.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Link href="/client/team">
              <Button variant="primary" size="sm" icon={<Users className="w-4 h-4" />}>
                Team Members
              </Button>
            </Link>
            <Link href="/client/analytics">
              <Button variant="secondary" size="sm" icon={<BarChart3 className="w-4 h-4" />}>
                Analytics
              </Button>
            </Link>
          </div>
        </div>

        {/* METRICS GRID */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="p-6 space-y-2">
            <div className="text-[10px] font-mono uppercase tracking-widest text-[#96919F] font-semibold">
              Members
            </div>
            <div className="text-3xl font-bold text-[#17151C]">{DEMO_ANALYTICS.teamMembersCount}</div>
          </Card>

          <Card className="p-6 space-y-2">
            <div className="text-[10px] font-mono uppercase tracking-widest text-[#96919F] font-semibold">
              Agent runs
            </div>
            <div className="text-3xl font-bold text-[#17151C]">{DEMO_ANALYTICS.totalTasks}</div>
          </Card>

          <Card className="p-6 space-y-2">
            <div className="text-[10px] font-mono uppercase tracking-widest text-[#96919F] font-semibold">
              Completed
            </div>
            <div className="text-3xl font-bold text-emerald-600">{DEMO_ANALYTICS.completedTasks}</div>
          </Card>

          <Card className="p-6 space-y-2">
            <div className="text-[10px] font-mono uppercase tracking-widest text-[#96919F] font-semibold">
              Failed
            </div>
            <div className="text-3xl font-bold text-rose-600">{DEMO_ANALYTICS.failedTasks}</div>
          </Card>
        </div>

        {/* QUICK ACCESS MODULES */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
          <Card className="p-6 space-y-4 hover:border-[#A78BFA] transition-all">
            <Users className="w-5 h-5 text-[#A78BFA]" />
            <h3 className="text-base font-bold text-[#17151C]">Team</h3>
            <p className="text-xs text-[#696572]">
              Invite members and manage organization access roles.
            </p>
            <Link href="/client/team" className="block pt-2">
              <Button variant="outline" size="sm" className="w-full">
                Team Roster →
              </Button>
            </Link>
          </Card>

          <Card className="p-6 space-y-4 hover:border-[#A78BFA] transition-all">
            <BarChart3 className="w-5 h-5 text-[#A78BFA]" />
            <h3 className="text-base font-bold text-[#17151C]">Analytics</h3>
            <p className="text-xs text-[#696572]">
              Track agent activity and performance metrics.
            </p>
            <Link href="/client/analytics" className="block pt-2">
              <Button variant="outline" size="sm" className="w-full">
                View Analytics →
              </Button>
            </Link>
          </Card>

          <Card className="p-6 space-y-4 hover:border-[#A78BFA] transition-all">
            <Settings className="w-5 h-5 text-[#A78BFA]" />
            <h3 className="text-base font-bold text-[#17151C]">Settings</h3>
            <p className="text-xs text-[#696572]">
              Configure organization security and preferences.
            </p>
            <Link href="/client/settings" className="block pt-2">
              <Button variant="outline" size="sm" className="w-full">
                Org Settings →
              </Button>
            </Link>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}

