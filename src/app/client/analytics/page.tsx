'use client';

import React from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card } from '@/components/ui/Card';
import { useAuth } from '@/context/AuthContext';
import { BarChart3, TrendingUp, CheckCircle2, Cpu, Wrench, Shield, Zap } from 'lucide-react';

export default function ClientAnalyticsPage() {
  const { user } = useAuth();

  const dailyStats = [
    { day: 'Mon', tasks: 24, success: 23 },
    { day: 'Tue', tasks: 38, success: 36 },
    { day: 'Wed', tasks: 42, success: 40 },
    { day: 'Thu', tasks: 29, success: 28 },
    { day: 'Fri', tasks: 51, success: 49 },
    { day: 'Sat', tasks: 18, success: 18 },
    { day: 'Sun', tasks: 12, success: 12 }
  ];

  const maxTaskCount = 60;

  const toolDistribution = [
    { name: 'Google Calendar API', count: 420, percent: 34, color: 'bg-blue-500' },
    { name: 'Gmail API', count: 310, percent: 25, color: 'bg-red-500' },
    { name: 'Google Maps API', count: 280, percent: 23, color: 'bg-emerald-500' },
    { name: 'Travel & Booking API', count: 230, percent: 18, color: 'bg-purple-500' }
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6 max-w-7xl mx-auto">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-950/40 dark:bg-red-950/80 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-800 text-xs font-semibold mb-1 shadow-sm">
            <Shield className="w-3.5 h-3.5" />
            <span>Client Admin Analytics</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-foreground tracking-tight flex items-center gap-3">
            <BarChart3 className="w-7 h-7 text-red-600" /> Organization Analytics & Usage
          </h1>
          <p className="text-xs text-secondary-text mt-1">
            Real-time telemetry on organization execution volume, tool invocation frequency, and success rates.
          </p>
        </div>

        {/* METRICS SUMMARY ROW */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="p-4 space-y-2">
            <div className="text-xs text-secondary-text">Total Automation Runs</div>
            <div className="text-3xl font-extrabold text-foreground">214</div>
            <div className="text-[11px] text-emerald-600 dark:text-emerald-400 flex items-center gap-1 font-medium">
              <TrendingUp className="w-3.5 h-3.5" /> +18% vs last week
            </div>
          </Card>

          <Card className="p-4 space-y-2">
            <div className="text-xs text-secondary-text">Agent Success Rate</div>
            <div className="text-3xl font-extrabold text-emerald-600 dark:text-emerald-400">97.2%</div>
            <div className="text-[11px] text-secondary-text">208 Completed / 6 Unresolved</div>
          </Card>

          <Card className="p-4 space-y-2">
            <div className="text-xs text-secondary-text">Total Tool Invocations</div>
            <div className="text-3xl font-extrabold text-purple-600 dark:text-purple-400">1,240</div>
            <div className="text-[11px] text-secondary-text">Across 4 connected services</div>
          </Card>

          <Card className="p-4 space-y-2">
            <div className="text-xs text-secondary-text">API Tokens Consumed</div>
            <div className="text-3xl font-extrabold text-red-600 dark:text-red-400">482,900</div>
            <div className="text-[11px] text-secondary-text">Gemini Pro AI Engine</div>
          </Card>
        </div>

        {/* CHARTS GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* DAILY STATS BAR CHART */}
          <Card className="lg:col-span-7 p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-foreground">Daily Task Executions</h3>
              <div className="flex items-center gap-4 text-xs">
                <span className="flex items-center gap-1 text-secondary-text">
                  <span className="w-3 h-3 rounded bg-red-600 inline-block"></span> Total
                </span>
                <span className="flex items-center gap-1 text-secondary-text">
                  <span className="w-3 h-3 rounded bg-emerald-500 inline-block"></span> Verified
                </span>
              </div>
            </div>

            <div className="h-64 flex items-end justify-between gap-3 pt-6 pb-2 border-b border-card-border">
              {dailyStats.map((item) => {
                const totalHeight = (item.tasks / maxTaskCount) * 100;
                const successHeight = (item.success / maxTaskCount) * 100;
                return (
                  <div key={item.day} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                    <div className="w-full flex items-end justify-center gap-1.5 h-full">
                      <div
                        style={{ height: `${totalHeight}%` }}
                        className="w-full max-w-[24px] bg-red-600 rounded-t transition-all duration-300 group-hover:bg-red-500"
                        title={`${item.day}: ${item.tasks} total`}
                      />
                      <div
                        style={{ height: `${successHeight}%` }}
                        className="w-full max-w-[24px] bg-emerald-500 rounded-t transition-all duration-300 group-hover:bg-emerald-400"
                        title={`${item.day}: ${item.success} verified`}
                      />
                    </div>
                    <span className="text-[11px] font-mono text-secondary-text">{item.day}</span>
                  </div>
                );
              })}
            </div>
          </Card>

          {/* TOOL DISTRIBUTION BREAKDOWN */}
          <Card className="lg:col-span-5 p-6 space-y-4">
            <h3 className="text-base font-bold text-foreground">Tool Invocation Distribution</h3>
            <div className="space-y-4 pt-2">
              {toolDistribution.map((tool) => (
                <div key={tool.name} className="space-y-1.5">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-foreground">{tool.name}</span>
                    <span className="text-secondary-text font-mono">{tool.count} calls ({tool.percent}%)</span>
                  </div>
                  <div className="w-full h-2.5 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
                    <div
                      style={{ width: `${tool.percent}%` }}
                      className={`h-full ${tool.color} rounded-full transition-all duration-500`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
