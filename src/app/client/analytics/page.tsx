'use client';

import React from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card } from '@/components/ui/Card';
import { DEMO_ANALYTICS } from '@/lib/demo-data';
import { BarChart3, TrendingUp, CheckCircle2, Cpu, Wrench, Shield, Zap } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell } from 'recharts';

export default function ClientAnalyticsPage() {
  const chartData = [
    { day: 'Mon', tasks: 24, success: 23 },
    { day: 'Tue', tasks: 38, success: 36 },
    { day: 'Wed', tasks: 42, success: 40 },
    { day: 'Thu', tasks: 29, success: 28 },
    { day: 'Fri', tasks: 51, success: 49 },
    { day: 'Sat', tasks: 18, success: 18 },
    { day: 'Sun', tasks: 12, success: 12 }
  ];

  const toolDistribution = [
    { name: 'Google Calendar', value: 420, color: '#3b82f6' },
    { name: 'Gmail API', value: 310, color: '#ef4444' },
    { name: 'Google Maps', value: 280, color: '#10b981' },
    { name: 'Travel Engine', value: 230, color: '#a855f7' }
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6 max-w-7xl mx-auto">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-950/80 text-red-400 border border-red-800 text-xs font-semibold mb-1 shadow-red-glow">
            <Shield className="w-3.5 h-3.5" />
            <span>Client Admin Analytics</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
            <BarChart3 className="w-7 h-7 text-red-500" /> Organization Analytics & Usage
          </h1>
          <p className="text-xs text-zinc-400 mt-1">
            Realtime metrics on task volume, tool invocation frequency, token utilization, and success rates.
          </p>
        </div>

        {/* METRICS SUMMARY ROW */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="p-4 space-y-2">
            <div className="text-xs text-zinc-400">Total Automation Runs</div>
            <div className="text-3xl font-extrabold text-white">{DEMO_ANALYTICS.totalTasks}</div>
            <div className="text-[11px] text-emerald-400 flex items-center gap-1 font-medium">
              <TrendingUp className="w-3.5 h-3.5" /> +18% vs last week
            </div>
          </Card>

          <Card className="p-4 space-y-2">
            <div className="text-xs text-zinc-400">Agent Success Rate</div>
            <div className="text-3xl font-extrabold text-emerald-400">{DEMO_ANALYTICS.successRate}%</div>
            <div className="text-[11px] text-zinc-400">142 Completed / 6 Failed</div>
          </Card>

          <Card className="p-4 space-y-2">
            <div className="text-xs text-zinc-400">Total Tool Invocations</div>
            <div className="text-3xl font-extrabold text-purple-400">{DEMO_ANALYTICS.totalToolCalls}</div>
            <div className="text-[11px] text-zinc-400">Across 6 connected APIs</div>
          </Card>

          <Card className="p-4 space-y-2">
            <div className="text-xs text-zinc-400">API Tokens Consumed</div>
            <div className="text-3xl font-extrabold text-red-400">482,900</div>
            <div className="text-[11px] text-zinc-400">Gemini 1.5 Pro Engine</div>
          </Card>
        </div>

        {/* CHARTS GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <Card variant="glow" className="lg:col-span-7 p-6 space-y-4">
            <h3 className="text-base font-bold text-white">Daily Tasks Completed</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <XAxis dataKey="day" stroke="#71717a" fontSize={11} />
                  <YAxis stroke="#71717a" fontSize={11} />
                  <Tooltip contentStyle={{ backgroundColor: '#09090b', borderColor: '#27272a', borderRadius: '8px', fontSize: '12px' }} />
                  <Bar dataKey="tasks" fill="#830000" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="success" fill="#bc0202" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card className="lg:col-span-5 p-6 space-y-4">
            <h3 className="text-base font-bold text-white">Tool Invocation Breakdown</h3>
            <div className="h-64 flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={toolDistribution} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={75}>
                    {toolDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: '#09090b', borderColor: '#27272a', borderRadius: '8px', fontSize: '12px' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
