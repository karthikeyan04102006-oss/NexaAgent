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
  Plus,
  Paperclip,
  Mic,
  Wrench
} from 'lucide-react';
import Link from 'next/link';

export default function DashboardPage() {
  const router = useRouter();
  const { user } = useAuth();
  const { tasks, runGoal, isExecuting } = useAgent();
  
  const [commandInput, setCommandInput] = useState<string>('');

  const suggestedTasks = [
    { label: 'Schedule team meeting', category: 'Scheduling', icon: Calendar },
    { label: 'Plan Chennai trip', category: 'Travel', icon: Plane },
    { label: 'Organize calendar', category: 'Productivity', icon: Clock },
    { label: 'Research SaaS benchmarks', category: 'Research', icon: Search },
    { label: 'Draft quarterly report', category: 'Email', icon: Mail },
  ];

  const handleExecute = async (goalToRun?: string) => {
    const targetGoal = goalToRun || commandInput;
    if (!targetGoal.trim()) return;
    await runGoal(targetGoal);
    router.push('/agent');
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <DashboardLayout>
      <div className="space-y-10 py-2">
        {/* DASHBOARD EDITORIAL HEADER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#E7E3EC] pb-6">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-[#A78BFA] uppercase font-semibold mb-2">
              <Zap className="w-3.5 h-3.5 text-[#A78BFA]" />
              <span>COMMAND CENTER</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-serif font-medium tracking-tight text-[#17151C]">
              {getGreeting()}, {user?.fullName?.split(' ')[0] || 'Karthikeyan'}.
            </h1>
            <p className="text-sm text-[#696572] font-sans mt-1">
              What should we get done?
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Link href="/agent">
              <Button variant="primary" size="sm" icon={<Play className="w-4 h-4" />}>
                Open Agent Center
              </Button>
            </Link>
          </div>
        </div>

        {/* MAIN COMMAND BOX INSTRUMENT */}
        <div className="bg-[#FFFFFF] dark:bg-[#111116] border border-[#E7E3EC] dark:border-[#26242C] p-6 md:p-8 space-y-6">
          <div className="flex items-center justify-between border-b border-[#E7E3EC] dark:border-[#26242C] pb-4">
            <span className="text-[10px] font-mono text-[#A78BFA] uppercase tracking-widest font-semibold">
              GOAL PROMPT
            </span>
            <span className="text-[10px] font-mono text-[#696572] dark:text-[#A7A3B2] uppercase tracking-wider">
              GEMINI PRO
            </span>
          </div>

          <div className="space-y-4">
            <textarea
              rows={3}
              value={commandInput}
              onChange={e => setCommandInput(e.target.value)}
              placeholder="What should I get done?"
              className="w-full bg-[#FAF9FC] dark:bg-[#08080A] border border-[#E7E3EC] dark:border-[#26242C] focus:border-[#A78BFA] p-4 text-base text-[#17151C] dark:text-[#F5F3FF] placeholder-[#96919F] focus:outline-none transition-colors resize-none font-sans leading-relaxed"
            />

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
              {/* Command Box Controls (Attach, Voice, Tools) */}
              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  title="Attach Files"
                  icon={<Paperclip className="w-3.5 h-3.5 text-[#A78BFA]" />}
                >
                  Attach
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  title="Voice Input"
                  icon={<Mic className="w-3.5 h-3.5 text-[#A78BFA]" />}
                >
                  Voice
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  title="Tool Selection"
                  icon={<Wrench className="w-3.5 h-3.5 text-[#A78BFA]" />}
                >
                  Tools
                </Button>
              </div>

              <div className="flex items-center gap-4">
                <Button
                  variant="primary"
                  onClick={() => handleExecute()}
                  isLoading={isExecuting}
                  size="lg"
                  icon={<ArrowRight className="w-4 h-4" />}
                >
                  Run Agent
                </Button>
              </div>
            </div>
          </div>

          {/* SUGGESTED TASKS CATALOG */}
          <div className="pt-6 border-t border-[#E7E3EC] dark:border-[#26242C]">
            <div className="text-[10px] font-mono uppercase tracking-widest text-[#96919F] mb-3">SUGGESTED GOALS</div>
            <div className="flex flex-wrap gap-2.5">
              {suggestedTasks.map((task, i) => {
                const Icon = task.icon;
                return (
                  <Button
                    key={i}
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setCommandInput(task.label);
                      handleExecute(task.label);
                    }}
                    icon={<Icon className="w-3.5 h-3.5 text-[#A78BFA]" />}
                  >
                    {task.label}
                  </Button>
                );
              })}
            </div>
          </div>
        </div>

        {/* RECENT TASKS / CURRENT ACTIVITY */}
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-[#E7E3EC] dark:border-[#26242C] pb-4">
            <div>
              <div className="text-[10px] font-mono text-[#A78BFA] uppercase tracking-widest font-semibold">
                EXECUTION LOG
              </div>
              <h3 className="text-xl font-serif font-medium text-[#17151C] dark:text-[#F5F3FF]">
                Active & Recent Tasks
              </h3>
            </div>
            {tasks.length > 0 && (
              <Link href="/tasks" className="text-xs font-mono uppercase tracking-wider text-[#A78BFA] hover:underline flex items-center gap-1">
                VIEW ALL TASKS <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            )}
          </div>

          {tasks.length === 0 ? (
            <div className="bg-[#FFFFFF] dark:bg-[#111116] border border-[#E7E3EC] dark:border-[#26242C] p-12 text-center text-[#696572] dark:text-[#A7A3B2] space-y-4">
              <Activity className="w-8 h-8 text-[#A78BFA] mx-auto" />
              <div className="text-base font-serif font-medium text-[#17151C] dark:text-[#F5F3FF]">No tasks yet.</div>
              <p className="text-xs max-w-xs mx-auto text-[#696572] dark:text-[#A7A3B2] font-sans">Enter a goal above to get started.</p>
              <Button variant="primary" onClick={() => handleExecute(suggestedTasks[0].label)} icon={<Plus className="w-4 h-4" />}>
                Create Task
              </Button>
            </div>
          ) : (
            <div className="space-y-3">
              {tasks.slice(0, 5).map(task => (
                <div key={task.id} className="bg-[#FFFFFF] dark:bg-[#111116] border border-[#E7E3EC] dark:border-[#26242C] p-5 flex items-center justify-between gap-6 hover:border-[#A78BFA] transition-colors">
                  <div className="space-y-1 min-w-0 flex-1">
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-serif font-medium truncate text-[#17151C] dark:text-[#F5F3FF]">{task.title}</span>
                      <Badge status={task.status} size="sm" />
                    </div>
                    <p className="text-xs text-[#696572] dark:text-[#A7A3B2] line-clamp-1 font-sans">{task.originalGoal}</p>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <Link href={`/tasks/${task.id}`}>
                      <Button variant="secondary" size="sm">
                        Inspect Execution
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}


