'use client';

import React from 'react';
import { useAgent } from '@/context/AgentContext';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { AgentActivityFeed } from '@/components/agent/AgentActivityFeed';
import { Activity } from 'lucide-react';

export default function ActivityPage() {
  const { activityLogs } = useAgent();

  return (
    <DashboardLayout>
      <div className="space-y-6 max-w-5xl mx-auto">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
            <Activity className="w-7 h-7 text-red-500" /> Audit Log & Event Stream
          </h1>
          <p className="text-xs text-zinc-400 mt-1">
            Realtime audit log of agent execution decisions, tool calls, and user authorization events.
          </p>
        </div>

        <AgentActivityFeed logs={activityLogs} />
      </div>
    </DashboardLayout>
  );
}
