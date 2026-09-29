'use client';

import React, { use } from 'react';
import Link from 'next/link';
import { useAgent } from '@/context/AgentContext';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { AgentGraphVisualizer } from '@/components/agent/AgentGraphVisualizer';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { ArrowLeft, Clock, Cpu, CheckCircle2, RotateCcw, Copy, ExternalLink, ShieldCheck } from 'lucide-react';

export default function TaskDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { tasks, retryTask, runGoal } = useAgent();

  const task = tasks.find(t => t.id === id) || tasks[0];

  return (
    <DashboardLayout>
      <div className="space-y-6 max-w-6xl mx-auto">
        {/* Back Button */}
        <div>
          <Link href="/tasks" className="inline-flex items-center gap-2 text-xs text-zinc-400 hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Task List
          </Link>
        </div>

        {/* TASK HEADER CARD */}
        <Card variant="glow" className="p-6 space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-800 pb-4">
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-extrabold text-white">{task.title}</h1>
                <Badge status={task.status} size="md" />
              </div>
              <p className="text-xs text-zinc-400 font-mono mt-1">Task ID: {task.id}</p>
            </div>

            <div className="flex items-center gap-3">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => retryTask(task.id)}
                icon={<RotateCcw className="w-4 h-4" />}
              >
                Retry Execution
              </Button>

              <Button
                variant="primary"
                size="sm"
                onClick={() => runGoal(task.originalGoal)}
                icon={<Copy className="w-4 h-4" />}
              >
                Duplicate Goal
              </Button>
            </div>
          </div>

          {/* Original Request Banner */}
          <div className="bg-zinc-950 p-4 rounded-xl border border-zinc-800 space-y-1">
            <div className="text-xs text-red-400 font-mono font-bold uppercase tracking-wider">Original User Goal Request</div>
            <div className="text-sm text-white font-medium">"{task.originalGoal}"</div>
          </div>

          {/* Task Metadata Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs font-mono text-zinc-400">
            <div>
              <span className="block text-zinc-500">Agent Model</span>
              <span className="text-white font-bold">{task.agentModel}</span>
            </div>
            <div>
              <span className="block text-zinc-500">Created Time</span>
              <span className="text-white font-bold">{new Date(task.createdAt).toLocaleTimeString()}</span>
            </div>
            <div>
              <span className="block text-zinc-500">Execution Duration</span>
              <span className="text-emerald-400 font-bold">{task.durationMs ? `${(task.durationMs / 1000).toFixed(1)}s` : '1.8s'}</span>
            </div>
            <div>
              <span className="block text-zinc-500">Tools Invoked</span>
              <span className="text-purple-400 font-bold">{task.toolsUsed.join(', ')}</span>
            </div>
          </div>
        </Card>

        {/* EXECUTION GRAPH */}
        <AgentGraphVisualizer nodes={task.nodes} taskTitle={task.title} />

        {/* FINAL RESULT CARD */}
        {task.finalResult && (
          <Card className="p-6 border-emerald-800/60 bg-emerald-950/20 space-y-2">
            <h3 className="text-base font-bold text-emerald-400 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5" /> Execution Outcome Summary
            </h3>
            <p className="text-sm text-zinc-200 leading-relaxed">{task.finalResult}</p>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
}
