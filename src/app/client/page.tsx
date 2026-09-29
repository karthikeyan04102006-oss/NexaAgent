'use client';

import React from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { DEMO_ANALYTICS, DEMO_ORGANIZATION } from '@/lib/demo-data';
import { Building2, Users, BarChart3, Settings, ShieldCheck, Zap, TrendingUp, Cpu, Activity } from 'lucide-react';

export default function ClientAdminDashboardPage() {
  const { user } = useAuth();

  return (
    <DashboardLayout>
      <div className="space-y-6 max-w-7xl mx-auto">
        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-950/80 text-red-400 border border-red-800 text-xs font-semibold mb-1 shadow-red-glow">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Client Admin Control Center</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
              {user?.organizationName || DEMO_ORGANIZATION.name}
            </h1>
            <p className="text-xs text-zinc-400 mt-1">
              Organization-level agent analytics, team member management, security policies, and RBAC governance.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link href="/client/team">
              <Button variant="primary" size="sm" icon={<Users className="w-4 h-4" />}>
                Manage Team Members
              </Button>
            </Link>
            <Link href="/client/analytics">
              <Button variant="secondary" size="sm" icon={<BarChart3 className="w-4 h-4" />}>
                View Analytics
              </Button>
            </Link>
          </div>
        </div>

        {/* METRICS CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="p-4 space-y-2">
            <div className="flex items-center justify-between text-xs text-zinc-400">
              <span>Total Team Members</span>
              <Users className="w-4 h-4 text-red-500" />
            </div>
            <div className="text-3xl font-extrabold text-white">{DEMO_ANALYTICS.teamMembersCount}</div>
            <div className="text-[11px] text-emerald-400 font-medium">8 Active / 1 Invited</div>
          </Card>

          <Card className="p-4 space-y-2">
            <div className="flex items-center justify-between text-xs text-zinc-400">
              <span>Organization Agent Runs</span>
              <Activity className="w-4 h-4 text-purple-400" />
            </div>
            <div className="text-3xl font-extrabold text-white">{DEMO_ANALYTICS.totalTasks}</div>
            <div className="text-[11px] text-emerald-400 font-medium">95.9% Success Rate</div>
          </Card>

          <Card className="p-4 space-y-2">
            <div className="flex items-center justify-between text-xs text-zinc-400">
              <span>Total Tool Invocations</span>
              <Zap className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-3xl font-extrabold text-purple-400">{DEMO_ANALYTICS.totalToolCalls}</div>
            <div className="text-[11px] text-zinc-400">Calendar, Gmail, Maps, Travel</div>
          </Card>

          <Card className="p-4 space-y-2">
            <div className="flex items-center justify-between text-xs text-zinc-400">
              <span>Organization API Tokens</span>
              <Cpu className="w-4 h-4 text-blue-400" />
            </div>
            <div className="text-3xl font-extrabold text-red-400">482,900</div>
            <div className="text-[11px] text-zinc-400">Gemini 1.5 Pro Engine</div>
          </Card>
        </div>

        {/* QUICK ACCESS MODULES */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card hoverEffect className="p-6 space-y-3">
            <Users className="w-8 h-8 text-red-500" />
            <h3 className="text-lg font-bold text-white">Team Management</h3>
            <p className="text-xs text-zinc-400">
              Invite organization members, assign roles (`user` vs `client_admin`), and audit last active session timestamps.
            </p>
            <Link href="/client/team" className="block pt-2">
              <Button variant="outline" size="sm" className="w-full">
                Go to Team Management →
              </Button>
            </Link>
          </Card>

          <Card hoverEffect className="p-6 space-y-3">
            <BarChart3 className="w-8 h-8 text-purple-500" />
            <h3 className="text-lg font-bold text-white">Organization Analytics</h3>
            <p className="text-xs text-zinc-400">
              Examine daily task volume graphs, tool invocation distributions, success/failure rates, and token budgets.
            </p>
            <Link href="/client/analytics" className="block pt-2">
              <Button variant="outline" size="sm" className="w-full">
                Go to Analytics →
              </Button>
            </Link>
          </Card>

          <Card hoverEffect className="p-6 space-y-3">
            <Settings className="w-8 h-8 text-amber-500" />
            <h3 className="text-lg font-bold text-white">Organization Settings</h3>
            <p className="text-xs text-zinc-400">
              Configure Human-in-the-Loop strictness, company branding, database RLS rules, and enterprise plan billing.
            </p>
            <Link href="/client/settings" className="block pt-2">
              <Button variant="outline" size="sm" className="w-full">
                Go to Settings →
              </Button>
            </Link>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
