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
  Play, 
  ShieldAlert, 
  Layers, 
  Plane, 
  Calendar, 
  Zap,
  ArrowRight
} from 'lucide-react';

export default function AgentCommandCenterPage() {
  const { activeTask, activityLogs, runGoal, isExecuting, approveAction, pendingApproval } = useAgent();
  
  const [goalInput, setGoalInput] = useState<string>('');

  const presetDemos = [
    {
      title: 'Plan Chennai Trip',
      prompt: 'Plan my Chennai trip under ₹15,000 including train booking, hotel, and calendar sync.',
      icon: Plane,
    },
    {
      title: 'Schedule Team Sync',
      prompt: 'Schedule a meeting with my team tomorrow afternoon and notify attendees.',
      icon: Calendar,
    }
  ];

  const handleLaunch = async (promptToUse?: string) => {
    const target = promptToUse || goalInput;
    if (!target.trim()) return;
    await runGoal(target);
  };

  return (
    <DashboardLayout>
      <div className="space-y-8 max-w-6xl mx-auto">
        {/* PAGE HEADER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#E7E3EC] pb-8">
          <div>
            <div className="text-[10px] font-mono uppercase tracking-widest font-semibold text-[#A78BFA] mb-2">
              AGENT MONITOR
            </div>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tighter text-[#17151C]">
              Watch the agent work.
            </h1>
            <p className="text-sm text-[#696572] mt-1">
              See every step from goal to completion.
            </p>
          </div>

          {/* Quick Launch Buttons */}
          <div className="flex items-center gap-2 flex-wrap">
            {presetDemos.map((demo, idx) => {
              const Icon = demo.icon;
              return (
                <Button
                  key={idx}
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setGoalInput(demo.prompt);
                    handleLaunch(demo.prompt);
                  }}
                  disabled={isExecuting}
                  icon={<Icon className="w-3.5 h-3.5 text-[#A78BFA]" />}
                >
                  {demo.title}
                </Button>
              );
            })}
          </div>
        </div>

        {/* AGENT VS CHATBOT BANNER */}
        <AgentVSChatbotBanner />

        {/* THREE-COLUMN COMMAND CENTER GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* LEFT COLUMN: INPUT (4 COLS) */}
          <div className="lg:col-span-4 space-y-6">
            <Card variant="glow" className="p-6 space-y-5 border-[#A78BFA]/40">
              <div className="flex items-center justify-between border-b border-[#E7E3EC] pb-3">
                <span className="text-[10px] font-mono font-semibold text-[#A78BFA] uppercase tracking-widest">
                  GOAL
                </span>
                <span className="text-[10px] font-mono text-emerald-600 font-semibold uppercase">READY</span>
              </div>

              <div className="space-y-3">
                <textarea
                  rows={4}
                  value={goalInput}
                  onChange={e => setGoalInput(e.target.value)}
                  placeholder="What should I get done?"
                  className="w-full bg-[#FAF9FC] border border-[#E7E3EC] rounded-md p-3.5 text-xs text-[#17151C] placeholder-[#96919F] focus:outline-none focus:border-[#A78BFA] focus:ring-1 focus:ring-[#A78BFA] font-sans resize-none leading-relaxed"
                />

                <Button
                  variant="primary"
                  onClick={() => handleLaunch()}
                  isLoading={isExecuting}
                  className="w-full font-semibold"
                  size="md"
                  icon={<Play className="w-4 h-4" />}
                >
                  Run Agent
                </Button>
              </div>

              {/* Active Task Summary Card */}
              {activeTask && (
                <div className="pt-4 border-t border-[#E7E3EC] space-y-2 text-xs">
                  <div className="text-[#696572] font-semibold flex items-center justify-between">
                    <span>Task:</span>
                    <Badge status={activeTask.status} size="sm" />
                  </div>
                  <div className="text-[#17151C] font-semibold">{activeTask.title}</div>
                  <div className="text-[10px] text-[#96919F] font-mono">
                    MODEL: {activeTask.agentModel}
                  </div>
                  {activeTask.finalResult && (
                    <div className="p-3 rounded bg-[#FAF9FC] border border-emerald-600/30 text-emerald-800 text-[11px] leading-relaxed">
                      {activeTask.finalResult}
                    </div>
                  )}
                </div>
              )}
            </Card>

            {/* Pending Approval Widget Alert */}
            {pendingApproval && (
              <Card className="p-5 border-[#A78BFA] bg-white space-y-3 shadow-editorial">
                <div className="flex items-center gap-2 text-[#6D5BA6] font-semibold text-xs uppercase font-mono tracking-wider">
                  <ShieldAlert className="w-4 h-4 text-[#A78BFA] animate-pulse" />
                  <span>HUMAN APPROVAL REQUIRED</span>
                </div>
                <p className="text-xs text-[#17151C] leading-relaxed">{pendingApproval.reason}</p>
                <Button
                  variant="primary"
                  onClick={() => approveAction(pendingApproval.id)}
                  size="sm"
                  className="w-full font-semibold"
                >
                  Approve Action
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
              <Card className="p-12 text-center text-[#96919F] text-xs space-y-3">
                <Layers className="w-10 h-10 text-[#E7E3EC] mx-auto" />
                <p className="font-semibold text-[#17151C]">No active agent execution graph loaded.</p>
                <p className="text-[11px] text-[#96919F]">Specify a goal above and click Run Agent.</p>
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

