'use client';

import React from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { useAuth } from '@/context/AuthContext';
import { BarChart3, TrendingUp, Shield } from 'lucide-react';

export default function ClientAnalyticsPage() {
  const { user } = useAuth();

  const dailyStats = [
    { day: 'MON', tasks: 24, success: 23 },
    { day: 'TUE', tasks: 38, success: 36 },
    { day: 'WED', tasks: 42, success: 40 },
    { day: 'THU', tasks: 29, success: 28 },
    { day: 'FRI', tasks: 51, success: 49 },
    { day: 'SAT', tasks: 18, success: 18 },
    { day: 'SUN', tasks: 12, success: 12 }
  ];

  const maxTaskCount = 60;

  const toolDistribution = [
    { name: 'Google Calendar API', count: 420, percent: 34, color: 'bg-[#830000]' },
    { name: 'Gmail API', count: 310, percent: 25, color: 'bg-[#111111]' },
    { name: 'Google Maps API', count: 280, percent: 23, color: 'bg-[#555555]' },
    { name: 'Travel & Booking API', count: 230, percent: 18, color: 'bg-[#777777]' }
  ];

  return (
    <DashboardLayout>
      <div className="space-y-10 max-w-7xl mx-auto py-2">
        {/* HEADER */}
        <div className="border-b border-[#DAD8D2] pb-6 space-y-2">
          <div className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-[#830000] uppercase">
            <Shield className="w-4 h-4 text-[#830000]" />
            <span>ORGANIZATION TELEMETRY</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-serif font-medium text-[#111111] tracking-tight flex items-center gap-3">
            ORGANIZATION ANALYTICS & USAGE
          </h1>
          <p className="text-xs text-[#555555] font-sans">
            Real-time telemetry on organization execution volume, tool invocation frequency, and success rates.
          </p>
        </div>

        {/* METRICS SUMMARY ROW */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-[#FFFFFF] border border-[#DAD8D2] p-5 space-y-2">
            <div className="text-[10px] font-mono uppercase tracking-widest text-[#777777]">TOTAL AUTOMATION RUNS</div>
            <div className="text-4xl font-serif font-medium text-[#111111]">214</div>
            <div className="text-[11px] text-[#830000] font-mono flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5" /> +18% VS LAST WEEK
            </div>
          </div>

          <div className="bg-[#FFFFFF] border border-[#DAD8D2] p-5 space-y-2">
            <div className="text-[10px] font-mono uppercase tracking-widest text-[#777777]">AGENT SUCCESS RATE</div>
            <div className="text-4xl font-serif font-medium text-[#111111]">97.2%</div>
            <div className="text-[11px] text-[#555555] font-mono">208 COMPLETED / 6 UNRESOLVED</div>
          </div>

          <div className="bg-[#FFFFFF] border border-[#DAD8D2] p-5 space-y-2">
            <div className="text-[10px] font-mono uppercase tracking-widest text-[#777777]">TOOL INVOCATIONS</div>
            <div className="text-4xl font-serif font-medium text-[#111111]">1,240</div>
            <div className="text-[11px] text-[#555555] font-mono">ACROSS 4 CONNECTED SERVICES</div>
          </div>

          <div className="bg-[#FFFFFF] border border-[#DAD8D2] p-5 space-y-2">
            <div className="text-[10px] font-mono uppercase tracking-widest text-[#777777]">API TOKENS CONSUMED</div>
            <div className="text-4xl font-serif font-medium text-[#830000]">482,900</div>
            <div className="text-[11px] text-[#555555] font-mono">GEMINI PRO ENGINE</div>
          </div>
        </div>

        {/* CHARTS GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* DAILY STATS BAR CHART */}
          <div className="lg:col-span-7 bg-[#FFFFFF] border border-[#DAD8D2] p-8 space-y-6">
            <div className="flex items-center justify-between border-b border-[#DAD8D2] pb-4">
              <h3 className="text-lg font-serif font-medium text-[#111111]">DAILY TASK EXECUTIONS</h3>
              <div className="flex items-center gap-4 text-xs font-mono">
                <span className="flex items-center gap-1.5 text-[#555555]">
                  <span className="w-2.5 h-2.5 bg-[#830000] inline-block"></span> TOTAL
                </span>
                <span className="flex items-center gap-1.5 text-[#555555]">
                  <span className="w-2.5 h-2.5 bg-[#111111] inline-block"></span> VERIFIED
                </span>
              </div>
            </div>

            <div className="h-64 flex items-end justify-between gap-3 pt-6 pb-2 border-b border-[#DAD8D2]">
              {dailyStats.map((item) => {
                const totalHeight = (item.tasks / maxTaskCount) * 100;
                const successHeight = (item.success / maxTaskCount) * 100;
                return (
                  <div key={item.day} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                    <div className="w-full flex items-end justify-center gap-1.5 h-full">
                      <div
                        style={{ height: `${totalHeight}%` }}
                        className="w-full max-w-[16px] bg-[#830000] transition-all duration-300"
                        title={`${item.day}: ${item.tasks} total`}
                      />
                      <div
                        style={{ height: `${successHeight}%` }}
                        className="w-full max-w-[16px] bg-[#111111] transition-all duration-300"
                        title={`${item.day}: ${item.success} verified`}
                      />
                    </div>
                    <span className="text-[10px] font-mono text-[#555555]">{item.day}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* TOOL DISTRIBUTION BREAKDOWN */}
          <div className="lg:col-span-5 bg-[#FFFFFF] border border-[#DAD8D2] p-8 space-y-6">
            <h3 className="text-lg font-serif font-medium text-[#111111] border-b border-[#DAD8D2] pb-4">TOOL INVOCATION DISTRIBUTION</h3>
            <div className="space-y-5 pt-2">
              {toolDistribution.map((tool) => (
                <div key={tool.name} className="space-y-2">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-[#111111] font-semibold">{tool.name}</span>
                    <span className="text-[#555555]">{tool.count} CALLS ({tool.percent}%)</span>
                  </div>
                  <div className="w-full h-1.5 bg-[#F5F4F0] border border-[#DAD8D2] overflow-hidden">
                    <div
                      style={{ width: `${tool.percent}%` }}
                      className={`h-full ${tool.color} transition-all duration-500`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

