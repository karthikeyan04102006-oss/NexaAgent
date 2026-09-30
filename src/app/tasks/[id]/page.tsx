'use client';

import React, { use } from 'react';
import Link from 'next/link';
import { useAgent } from '@/context/AgentContext';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { AgentGraphVisualizer } from '@/components/agent/AgentGraphVisualizer';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { ArrowLeft, CheckCircle2, RotateCcw, Copy } from 'lucide-react';

export default function TaskDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { tasks, retryTask, runGoal } = useAgent();

  const task = tasks.find(t => t.id === id) || tasks[0];

  return (
    <DashboardLayout>
      <div className="space-y-8 max-w-5xl mx-auto">
        {/* Back Navigation */}
        <div>
          <Link href="/tasks" className="inline-flex items-center gap-2 text-xs font-mono text-[#777777] hover:text-[#111111] dark:hover:text-white transition-colors">
            <ArrowLeft className="w-3.5 h-3.5 text-[#830000]" /> BACK TO TASK CATALOG
          </Link>
        </div>

        {/* TASK HEADER EDITORIAL CARD */}
        <Card variant="glow" className="p-8 space-y-6">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 border-b border-[#DAD8D2] dark:border-[#2D2B27] pb-6">
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-[#111111] dark:text-[#EAE8E3]">{task.title}</h1>
                <Badge status={task.status} size="md" />
              </div>
              <p className="text-xs text-[#777777] font-mono mt-1">TASK ID: {task.id}</p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => retryTask(task.id)}
                icon={<RotateCcw className="w-3.5 h-3.5" />}
              >
                Retry Execution
              </Button>

              <Button
                variant="primary"
                size="sm"
                onClick={() => runGoal(task.originalGoal)}
                icon={<Copy className="w-3.5 h-3.5" />}
              >
                Duplicate Goal
              </Button>
            </div>
          </div>

          {/* Original Request Banner */}
          <div className="bg-[#FAFAF7] dark:bg-[#181715] p-5 rounded-md border border-[#DAD8D2] dark:border-[#2D2B27] space-y-1">
            <div className="text-[10px] text-[#830000] dark:text-[#FF2A2A] font-mono uppercase tracking-widest font-semibold">ORIGINAL GOAL PROMPT</div>
            <div className="text-base text-[#111111] dark:text-[#EAE8E3] font-semibold leading-relaxed">"{task.originalGoal}"</div>
          </div>

          {/* Task Metadata Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-xs font-mono">
            <div>
              <span className="block text-[#777777] text-[10px] uppercase">Agent Model</span>
              <span className="text-[#111111] dark:text-[#EAE8E3] font-semibold">{task.agentModel}</span>
            </div>
            <div>
              <span className="block text-[#777777] text-[10px] uppercase">Created Time</span>
              <span className="text-[#111111] dark:text-[#EAE8E3] font-semibold">{new Date(task.createdAt).toLocaleTimeString()}</span>
            </div>
            <div>
              <span className="block text-[#777777] text-[10px] uppercase">Duration</span>
              <span className="text-[#830000] dark:text-[#FF2A2A] font-semibold">{task.durationMs ? `${(task.durationMs / 1000).toFixed(1)}s` : '1.8s'}</span>
            </div>
            <div>
              <span className="block text-[#777777] text-[10px] uppercase">Tools Invoked</span>
              <span className="text-[#111111] dark:text-[#EAE8E3] font-semibold">{task.toolsUsed.join(', ') || 'Internal Engine'}</span>
            </div>
          </div>
        </Card>

        {/* STORYTELLING EXECUTION TIMELINE */}
        <AgentGraphVisualizer nodes={task.nodes} taskTitle={task.title} />

        {/* FINAL OUTCOME SUMMARY CARD */}
        {task.finalResult && (
          <Card className="p-8 border-[#830000]/40 bg-[#FFFFFF] dark:bg-[#1F1E1B] space-y-3 shadow-editorial">
            <h3 className="text-sm font-semibold text-[#830000] dark:text-[#FF2A2A] uppercase tracking-wider font-mono flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#830000] dark:text-[#FF2A2A]" /> Final Execution Summary
            </h3>
            <p className="text-sm text-[#111111] dark:text-[#EAE8E3] leading-relaxed font-sans">{task.finalResult}</p>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
}

