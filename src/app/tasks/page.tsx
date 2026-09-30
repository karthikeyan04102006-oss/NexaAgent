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
  Zap
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

  const statusOptions = [
    { label: 'All', value: 'all' },
    { label: 'Running', value: 'running' },
    { label: 'Completed', value: 'completed' },
    { label: 'Failed', value: 'failed' },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8 max-w-5xl mx-auto">
        {/* EDITORIAL HEADER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#E7E3EC] pb-8">
          <div>
            <div className="text-[10px] font-mono uppercase tracking-widest font-semibold text-[#A78BFA] mb-2">
              AGENT LOGS
            </div>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tighter text-[#17151C]">
              Tasks
            </h1>
            <p className="text-sm text-[#696572] mt-1">
              Your recent agent work.
            </p>
          </div>

          <Link href="/agent">
            <Button variant="primary" icon={<ListTodo className="w-4 h-4" />}>
              Create Task
            </Button>
          </Link>
        </div>

        {/* EDITORIAL TABS & SEARCH BAR */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#E7E3EC] pb-4">
          {/* Status Filter Tabs */}
          <div className="flex items-center gap-2">
            {statusOptions.map(opt => (
              <Button
                key={opt.value}
                variant={statusFilter === opt.value ? "primary" : "ghost"}
                size="sm"
                onClick={() => setStatusFilter(opt.value)}
              >
                {opt.label}
              </Button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="w-3.5 h-3.5 text-[#96919F] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search tasks..."
              className="w-full bg-[#FFFFFF] border border-[#E7E3EC] rounded-md pl-9 pr-3 py-1.5 text-xs text-[#17151C] placeholder-[#96919F] focus:outline-none focus:border-[#A78BFA]"
            />
          </div>
        </div>

        {/* EDITORIAL TASK LIST */}
        <div className="space-y-3">
          {filteredTasks.length === 0 ? (
            <Card className="p-12 text-center text-[#96919F] space-y-3">
              <ListTodo className="w-10 h-10 text-[#E7E3EC] mx-auto" />
              <div className="text-base font-semibold text-[#17151C]">No tasks yet.</div>
              <Link href="/agent">
                <Button size="sm" variant="primary">Create Task</Button>
              </Link>
            </Card>
          ) : (
            filteredTasks.map(task => (
              <Card key={task.id} hoverEffect className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="space-y-2 min-w-0 flex-1">
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="text-base font-semibold text-[#17151C] hover:text-[#6D5BA6] transition-colors">
                      {task.title}
                    </span>
                    <Badge status={task.status} size="sm" />
                  </div>

                  <p className="text-xs text-[#696572] line-clamp-1 leading-relaxed">{task.originalGoal}</p>

                  <div className="flex items-center gap-4 text-[10px] text-[#96919F] font-mono pt-1 flex-wrap">
                    <span>TIME: {new Date(task.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    <span>MODEL: {task.agentModel}</span>
                    <span>TOOLS: {task.toolsUsed.join(', ') || 'Internal Engine'}</span>
                  </div>
                </div>

                {/* Task Action Buttons */}
                <div className="flex items-center gap-2 shrink-0 border-t md:border-t-0 border-[#E7E3EC] pt-4 md:pt-0">
                  <Link href={`/tasks/${task.id}`}>
                    <Button variant="secondary" size="sm" icon={<ExternalLink className="w-3.5 h-3.5" />}>
                      Inspect
                    </Button>
                  </Link>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => retryTask(task.id)}
                    title="Retry Task"
                    icon={<RotateCcw className="w-3.5 h-3.5" />}
                  >
                    Retry
                  </Button>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDuplicate(task.originalGoal)}
                    title="Duplicate Prompt"
                    icon={<Copy className="w-3.5 h-3.5" />}
                  >
                    Duplicate
                  </Button>

                  <Button
                    variant="danger"
                    size="icon"
                    onClick={() => deleteTask(task.id)}
                    title="Delete task"
                    aria-label="Delete task"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </Card>
            ))
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}

