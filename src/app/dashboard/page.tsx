'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useAgent } from '@/context/AgentContext';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { 
  Sparkles, 
  ArrowRight, 
  Calendar, 
  Plane, 
  Mail, 
  Search, 
  GitFork, 
  Clock, 
  CheckCircle2, 
  Play, 
  Shield, 
  Zap,
  TrendingUp,
  Activity
} from 'lucide-react';
import Link from 'next/link';

export default function DashboardPage() {
  const router = useRouter();
  const { user } = useAuth();
  const { tasks, runGoal, isExecuting } = useAgent();
  
  const [commandInput, setCommandInput] = useState<string>('');

  const suggestedTasks = [
    { label: 'Plan my Chennai trip under ₹15,000', category: 'Travel', icon: Plane },
    { label: 'Schedule a meeting with my team tomorrow afternoon', category: 'Scheduling', icon: Calendar },
    { label: 'Organize my calendar & highlight collisions', category: 'Productivity', icon: Clock },
    { label: 'Find information on Q3 SaaS benchmarks', category: 'Research', icon: Search },
    { label: 'Draft quarterly report and send to board', category: 'Email', icon: Mail },
    { label: 'Create a workflow for weekly briefing', category: 'Workflows', icon: GitFork },
  ];

  const handleExecute = async (goalToRun?: string) => {
    const targetGoal = goalToRun || commandInput;
    if (!targetGoal.trim()) return;
    await runGoal(targetGoal);
    router.push('/agent');
  };

  return (
    <DashboardLayout>
      <div className="space-y-8 max-w-7xl mx-auto">
        {/* DASHBOARD HEADER */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-950/60 text-red-400 border border-red-800/60 text-xs font-semibold mb-2">
              <Zap className="w-3.5 h-3.5" />
              <span>NexaAgent AI Command Center</span>
            </div>
            <h1 className="text-3xl font-extrabold text-white tracking-tight">
              Good evening, {user?.fullName || 'Alex'}
            </h1>
            <p className="text-sm text-zinc-400 mt-1">
              Tell NexaAgent what you want to accomplish. Your autonomous agent will plan, execute, and verify.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link href="/agent">
              <Button variant="primary" icon={<Play className="w-4 h-4" />}>
                Open Agent Command Center
              </Button>
            </Link>
          </div>
        </div>

        {/* MAIN COMMAND BOX */}
        <Card variant="glow" className="p-6 md:p-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-red-600/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="space-y-4 relative z-10">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-red-400 uppercase tracking-widest flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-red-500" />
                What would you like me to do?
              </label>
              <span className="text-[10px] font-mono bg-zinc-900 px-2 py-0.5 rounded text-zinc-400 border border-zinc-800">
                MODEL: GEMINI 1.5 PRO
              </span>
            </div>

            <div className="relative">
              <textarea
                rows={3}
                value={commandInput}
                onChange={e => setCommandInput(e.target.value)}
                placeholder="Plan my Chennai trip under ₹15,000"
                className="w-full bg-zinc-950/90 border border-zinc-800 rounded-xl p-4 text-base text-white placeholder-zinc-500 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 transition-all resize-none font-sans"
              />

              <div className="mt-3 flex items-center justify-between">
                <div className="text-xs text-zinc-500 flex items-center gap-2">
                  <Shield className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Human-in-the-Loop protection active for email & bookings</span>
                </div>

                <Button
                  onClick={() => handleExecute()}
                  isLoading={isExecuting}
                  size="lg"
                  className="font-bold px-8"
                  icon={<Sparkles className="w-5 h-5" />}
                >
                  Execute Goal
                </Button>
              </div>
            </div>

            {/* SUGGESTED TASKS PILLS */}
            <div className="pt-4 border-t border-zinc-900">
              <div className="text-xs font-semibold text-zinc-400 mb-3">Suggested Tasks:</div>
              <div className="flex flex-wrap gap-2.5">
                {suggestedTasks.map((task, i) => {
                  const Icon = task.icon;
                  return (
                    <button
                      key={i}
                      onClick={() => {
                        setCommandInput(task.label);
                        handleExecute(task.label);
                      }}
                      className="group flex items-center gap-2 px-3.5 py-2 rounded-xl bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-800/80 hover:border-red-600/60 text-xs text-zinc-300 hover:text-white transition-all duration-200"
                    >
                      <Icon className="w-3.5 h-3.5 text-red-500 group-hover:scale-110 transition-transform" />
                      <span>{task.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </Card>

        {/* METRICS & QUICK SUMMARY GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="p-4 space-y-2">
            <div className="flex items-center justify-between text-xs text-zinc-400">
              <span>Total Autonomous Tasks</span>
              <Activity className="w-4 h-4 text-red-500" />
            </div>
            <div className="text-2xl font-extrabold text-white">{tasks.length}</div>
            <div className="text-[11px] text-emerald-400 font-medium">95.9% Execution Success Rate</div>
          </Card>

          <Card className="p-4 space-y-2">
            <div className="flex items-center justify-between text-xs text-zinc-400">
              <span>Active Agent Runs</span>
              <Sparkles className="w-4 h-4 text-purple-400" />
            </div>
            <div className="text-2xl font-extrabold text-white">
              {tasks.filter(t => t.status === 'running' || t.status === 'approval_required').length}
            </div>
            <div className="text-[11px] text-zinc-400">Realtime Gemini 1.5 Pro Loop</div>
          </Card>

          <Card className="p-4 space-y-2">
            <div className="flex items-center justify-between text-xs text-zinc-400">
              <span>Connected Tools</span>
              <Zap className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-2xl font-extrabold text-white">6 APIs</div>
            <div className="text-[11px] text-zinc-400">Calendar, Gmail, Maps, Travel</div>
          </Card>

          <Card className="p-4 space-y-2">
            <div className="flex items-center justify-between text-xs text-zinc-400">
              <span>Organization Role</span>
              <Shield className="w-4 h-4 text-blue-400" />
            </div>
            <div className="text-xl font-bold text-white capitalize">{user?.role?.replace('_', ' ')}</div>
            <div className="text-[11px] text-red-400 font-mono">RBAC Active</div>
          </Card>
        </div>

        {/* RECENT AGENT TASKS LIST */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-white">Recent Agent Executions</h3>
            <Link href="/tasks" className="text-xs text-red-400 hover:underline flex items-center gap-1 font-semibold">
              View All Tasks <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-3">
            {tasks.slice(0, 4).map(task => (
              <Card key={task.id} hoverEffect className="p-4 flex items-center justify-between gap-4">
                <div className="space-y-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-white truncate">{task.title}</span>
                    <Badge status={task.status} size="sm" />
                  </div>
                  <p className="text-xs text-zinc-400 line-clamp-1">{task.originalGoal}</p>
                  <div className="flex items-center gap-4 text-[10px] text-zinc-500 font-mono pt-1">
                    <span>Model: {task.agentModel}</span>
                    <span>Tools: {task.toolsUsed.join(', ')}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <Link href={`/tasks/${task.id}`}>
                    <Button variant="outline" size="sm">
                      Inspect Flow
                    </Button>
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
