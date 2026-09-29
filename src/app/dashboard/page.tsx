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
  Play, 
  Shield, 
  Zap,
  Activity,
  Plus
} from 'lucide-react';
import Link from 'next/link';

export default function DashboardPage() {
  const router = useRouter();
  const { user } = useAuth();
  const { tasks, runGoal, isExecuting } = useAgent();
  
  const [commandInput, setCommandInput] = useState<string>('');

  const suggestedTasks = [
    { label: 'Schedule a meeting with my team tomorrow afternoon', category: 'Scheduling', icon: Calendar },
    { label: 'Plan my Chennai trip under ₹15,000', category: 'Travel', icon: Plane },
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
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-100 dark:bg-red-950/60 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-800/60 text-xs font-semibold mb-2">
              <Zap className="w-3.5 h-3.5" />
              <span>NexaAgent Autonomous Command Center</span>
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight">
              Good evening, {user?.fullName || 'User'}
            </h1>
            <p className="text-sm text-secondary-text mt-1">
              What would you like your agent to accomplish?
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link href="/agent">
              <Button variant="primary" icon={<Play className="w-4 h-4" />}>
                Open Agent Center
              </Button>
            </Link>
          </div>
        </div>

        {/* MAIN COMMAND BOX */}
        <Card variant="glow" className="p-6 md:p-8 relative overflow-hidden">
          <div className="space-y-4 relative z-10">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-red-600 dark:text-red-400 uppercase tracking-widest flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-red-600" />
                What do you want me to do?
              </label>
              <span className="text-[10px] font-mono bg-zinc-100 dark:bg-zinc-900 px-2 py-0.5 rounded text-secondary-text border border-surface-border">
                ENGINE: GEMINI 1.5 PRO
              </span>
            </div>

            <div className="relative">
              <textarea
                rows={3}
                value={commandInput}
                onChange={e => setCommandInput(e.target.value)}
                placeholder="Schedule a meeting with my team tomorrow afternoon."
                className="w-full bg-zinc-50 dark:bg-zinc-950 border border-surface-border rounded-xl p-4 text-base text-foreground placeholder-zinc-400 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 transition-all resize-none font-sans"
              />

              <div className="mt-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="text-xs text-secondary-text flex items-center gap-2">
                  <Shield className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Human-in-the-Loop protection active for sensitive actions</span>
                </div>

                <Button
                  onClick={() => handleExecute()}
                  isLoading={isExecuting}
                  size="lg"
                  className="font-bold px-8"
                  icon={<Sparkles className="w-5 h-5" />}
                >
                  Run Agent
                </Button>
              </div>
            </div>

            {/* SUGGESTED TASKS */}
            <div className="pt-4 border-t border-surface-border">
              <div className="text-xs font-semibold text-secondary-text mb-3">Suggested Tasks:</div>
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
                      className="group flex items-center gap-2 px-3.5 py-2 rounded-xl bg-zinc-100 dark:bg-zinc-900/80 hover:bg-zinc-200 dark:hover:bg-zinc-800 border border-zinc-200 dark:border-zinc-800 text-xs text-foreground transition-all duration-200"
                    >
                      <Icon className="w-3.5 h-3.5 text-red-600 group-hover:scale-110 transition-transform" />
                      <span>{task.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </Card>

        {/* RECENT AGENT TASKS OR EMPTY STATE */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold">Recent Tasks</h3>
            {tasks.length > 0 && (
              <Link href="/tasks" className="text-xs text-red-600 hover:underline flex items-center gap-1 font-semibold">
                View All Tasks <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            )}
          </div>

          {tasks.length === 0 ? (
            <Card className="p-12 text-center text-secondary-text space-y-3">
              <Activity className="w-12 h-12 text-zinc-400 mx-auto" />
              <div className="text-base font-bold text-foreground">No tasks yet.</div>
              <p className="text-xs max-w-sm mx-auto">Give NexaAgent a goal and let your first agent run begin.</p>
              <Button onClick={() => handleExecute(suggestedTasks[0].label)} variant="primary" icon={<Plus className="w-4 h-4" />}>
                Create Task
              </Button>
            </Card>
          ) : (
            <div className="space-y-3">
              {tasks.slice(0, 4).map(task => (
                <Card key={task.id} hoverEffect className="p-4 flex items-center justify-between gap-4">
                  <div className="space-y-1 min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold truncate">{task.title}</span>
                      <Badge status={task.status} size="sm" />
                    </div>
                    <p className="text-xs text-secondary-text line-clamp-1">{task.originalGoal}</p>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <Link href={`/tasks/${task.id}`}>
                      <Button variant="outline" size="sm">
                        Inspect
                      </Button>
                    </Link>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
