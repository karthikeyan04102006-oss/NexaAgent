'use client';

import React from 'react';
import { useAgent } from '@/context/AgentContext';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { AgentActivityFeed } from '@/components/agent/AgentActivityFeed';
import { Zap } from 'lucide-react';

export default function ActivityPage() {
  const { activityLogs } = useAgent();

  return (
    <DashboardLayout>
      <div className="space-y-8 max-w-5xl mx-auto">
        <div className="border-b border-[#E7E3EC] pb-8">
          <div className="text-[10px] font-mono uppercase tracking-widest font-semibold text-[#A78BFA] mb-2">
            ACTIVITY
          </div>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tighter text-[#17151C]">
            Activity
          </h1>
          <p className="text-sm text-[#696572] mt-1">
            See what your agent has done.
          </p>
        </div>

        <AgentActivityFeed logs={activityLogs} />
      </div>
    </DashboardLayout>
  );
}

