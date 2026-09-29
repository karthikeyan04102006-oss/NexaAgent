'use client';

import React, { useState } from 'react';
import { useAgent } from '@/context/AgentContext';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { AgentGraphVisualizer } from '@/components/agent/AgentGraphVisualizer';
import { AgentActivityFeed } from '@/components/agent/AgentActivityFeed';
import { AgentVSChatbotBanner } from '@/components/agent/AgentVSChatbotBanner';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { 
  Sparkles, 
  Play, 
  RotateCcw, 
  ShieldAlert, 
  Terminal, 
  Layers, 
  Plane, 
  Calendar, 
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

export default function AgentCommandCenterPage() {
  const { activeTask, activityLogs, runGoal, isExecuting, approveAction, pendingApproval } = useAgent();
  
  const [goalInput, setGoalInput] = useState<string>('');

  const presetDemos = [
    {
      title: 'Plan Chennai Trip',
      prompt: 'Plan my Chennai trip under ₹15,000 including train booking, hotel, and calendar sync.',
      icon: Plane,
      tag: 'DEMO DATA'
    },
    {
      title: 'Schedule Team Sync',
      prompt: 'Schedule a meeting with my team tomorrow afternoon and notify attendees.',
      icon: Calendar,
      tag: 'DEMO DATA'
    }
  ];

  const handleLaunch = async (promptToUse?: string) => {
    const target = promptToUse || goalInput;
    if (!target.trim()) return;
    await runGoal(target);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 max-w-[1600px] mx-auto">
        {/* PAGE HEADER */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-950/80 text-red-400 border border-red-800 text-xs font-semibold mb-1 shadow-red-glow">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Dedicated Agent Orchestration Command Center</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
              Autonomous Agent Command Center
            </h1>
            <p className="text-xs text-zinc-400">
              Decompose natural language goals into execution steps, select tools, and govern actions.
            </p>
          </div>

          {/* Preset Quick Launch Buttons */}
          <div className="flex items-center gap-2 flex-wrap">
            {presetDemos.map((demo, idx) => {
              const Icon = demo.icon;
              return (
                <button
                  key={idx}
                  onClick={() => {
                    setGoalInput(demo.prompt);
                    handleLaunch(demo.prompt);
                  }}
                  disabled={isExecuting}
                  className="px-3.5 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-red-600/60 text-xs text-zinc-200 flex items-center gap-2 transition-all shadow-subtle"
                >
                  <Icon className="w-4 h-4 text-red-500" />
                  <span className="font-semibold">{demo.title}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* AGENT VS CHATBOT EXPLANATORY BANNER */}
        <AgentVSChatbotBanner />

        {/* THREE-COLUMN COMMAND CENTER GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* LEFT COLUMN: INPUT & PRESETS (4 COLS) */}
          <div className="lg:col-span-4 space-y-6">
            <Card variant="glow" className="p-5 space-y-4">
              <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                <span className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-red-500" /> Goal Input & Tools
                </span>
                <span className="text-[10px] font-mono text-emerald-400">READY</span>
              </div>

              <div className="space-y-3">
                <label className="block text-xs text-zinc-400">
                  Enter any high-level objective:
                </label>
                <textarea
                  rows={4}
                  value={goalInput}
                  onChange={e => setGoalInput(e.target.value)}
                  placeholder="Plan my Chennai trip under ₹15,000"
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 font-sans resize-none"
                />

                <Button
                  onClick={() => handleLaunch()}
                  isLoading={isExecuting}
                  className="w-full font-bold"
                  size="md"
                  icon={<Play className="w-4 h-4" />}
                >
                  Launch Agent Loop
                </Button>
              </div>

              {/* Active Task Summary Card */}
              {activeTask && (
                <div className="pt-4 border-t border-zinc-900 space-y-2 text-xs">
                  <div className="text-zinc-400 font-semibold flex items-center justify-between">
                    <span>Active Task:</span>
                    <Badge status={activeTask.status} size="sm" />
                  </div>
                  <div className="text-white font-bold">{activeTask.title}</div>
                  <div className="text-[11px] text-zinc-400 font-mono">
                    Model: {activeTask.agentModel}
                  </div>
                  {activeTask.finalResult && (
                    <div className="p-2.5 rounded-lg bg-emerald-950/40 border border-emerald-800/60 text-emerald-300 text-[11px]">
                      {activeTask.finalResult}
                    </div>
                  )}
                </div>
              )}
            </Card>

            {/* Pending Approval Widget Alert */}
            {pendingApproval && (
              <Card variant="glow" className="p-4 border-red-600/80 bg-red-950/40 space-y-3">
                <div className="flex items-center gap-2 text-red-300 font-bold text-xs">
                  <ShieldAlert className="w-4 h-4 text-red-500 animate-pulse" />
                  <span>APPROVAL HOLD REQUIRED</span>
                </div>
                <p className="text-xs text-zinc-300">{pendingApproval.reason}</p>
                <Button
                  onClick={() => approveAction(pendingApproval.id)}
                  size="sm"
                  className="w-full font-semibold"
                >
                  Review Approval Prompt
                </Button>
              </Card>
            )}
          </div>

          {/* CENTER COLUMN: EXECUTION NODE GRAPH (5 COLS) */}
          <div className="lg:col-span-5 space-y-6">
            {activeTask ? (
              <AgentGraphVisualizer
                nodes={activeTask.nodes}
                taskTitle={activeTask.title}
                isExecuting={isExecuting}
              />
            ) : (
              <Card className="p-12 text-center text-zinc-500 text-xs space-y-3">
                <Layers className="w-12 h-12 text-zinc-700 mx-auto" />
                <p>No active agent execution node graph loaded.</p>
                <p className="text-[11px] text-zinc-600">Enter a goal on the left or select a preset demo.</p>
              </Card>
            )}
          </div>

          {/* RIGHT COLUMN: LIVE ACTIVITY FEED (3 COLS) */}
          <div className="lg:col-span-3">
            <AgentActivityFeed logs={activityLogs} />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
