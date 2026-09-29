'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAgent } from '@/context/AgentContext';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { 
  ListTodo, 
  Search, 
  RotateCcw, 
  Copy, 
  Trash2, 
  ExternalLink, 
  Sparkles, 
  Clock, 
  Cpu, 
  Filter 
} from 'lucide-react';

export default function TasksPage() {
  const { tasks, retryTask, deleteTask, runGoal } = useAgent();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredTasks = tasks.filter(t => {
    const matchesSearch = t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          t.originalGoal.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || t.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleDuplicate = async (goal: string) => {
    await runGoal(goal);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 max-w-7xl mx-auto">
        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
              <ListTodo className="w-7 h-7 text-red-500" /> Task Management
            </h1>
            <p className="text-xs text-zinc-400 mt-1">
              Inspect historical agent execution runs, retry failed steps, duplicate tasks, or examine audit outputs.
            </p>
          </div>

          <Link href="/agent">
            <Button variant="primary" icon={<Sparkles className="w-4 h-4" />}>
              Create New Task
            </Button>
          </Link>
        </div>

        {/* FILTERS & SEARCH BAR */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-zinc-950 p-4 rounded-xl border border-zinc-800">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search by task title or goal..."
              className="w-full bg-zinc-900 border border-zinc-800 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-red-600"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Filter className="w-4 h-4 text-zinc-500" />
            <select
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value)}
              className="bg-zinc-900 border border-zinc-800 text-xs text-white rounded-xl px-3 py-2 focus:outline-none focus:border-red-600"
            >
              <option value="all">All Statuses</option>
              <option value="completed">Completed</option>
              <option value="running">Running</option>
              <option value="failed">Failed</option>
              <option value="approval_required">Approval Required</option>
            </select>
          </div>
        </div>

        {/* TASK LIST TABLE / CARDS */}
        <div className="space-y-3">
          {filteredTasks.length === 0 ? (
            <Card className="p-12 text-center text-zinc-500 space-y-3">
              <ListTodo className="w-12 h-12 text-zinc-700 mx-auto" />
              <div className="text-sm font-semibold text-white">Your agent workspace is ready.</div>
              <p className="text-xs text-zinc-400">No tasks matching criteria found.</p>
              <Link href="/agent">
                <Button size="sm" variant="primary">Create your first task</Button>
              </Link>
            </Card>
          ) : (
            filteredTasks.map(task => (
              <Card key={task.id} hoverEffect className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1.5 min-w-0 flex-1">
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="text-base font-bold text-white hover:text-red-400 transition-colors">
                      {task.title}
                    </span>
                    <Badge status={task.status} size="sm" />
                  </div>

                  <p className="text-xs text-zinc-400 line-clamp-1">{task.originalGoal}</p>

                  <div className="flex items-center gap-4 text-[10px] text-zinc-500 font-mono pt-1 flex-wrap">
                    <span>Created: {new Date(task.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    <span>Model: {task.agentModel}</span>
                    <span>Tools: {task.toolsUsed.join(', ') || 'Internal Engine'}</span>
                    <span>Nodes: {task.nodes.length}</span>
                  </div>
                </div>

                {/* Task Action Buttons */}
                <div className="flex items-center gap-2 shrink-0 border-t md:border-t-0 border-zinc-800 pt-3 md:pt-0">
                  <Link href={`/tasks/${task.id}`}>
                    <Button variant="outline" size="sm" icon={<ExternalLink className="w-3.5 h-3.5" />}>
                      View
                    </Button>
                  </Link>

                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => retryTask(task.id)}
                    title="Retry Task"
                    icon={<RotateCcw className="w-3.5 h-3.5" />}
                  >
                    Retry
                  </Button>

                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => handleDuplicate(task.originalGoal)}
                    title="Duplicate Prompt"
                    icon={<Copy className="w-3.5 h-3.5" />}
                  >
                    Duplicate
                  </Button>

                  <button
                    onClick={() => deleteTask(task.id)}
                    title="Delete task"
                    className="p-2 text-zinc-500 hover:text-rose-400 hover:bg-rose-950/40 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </Card>
            ))
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
