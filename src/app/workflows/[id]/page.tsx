'use client';

import React, { use } from 'react';
import Link from 'next/link';
import { useAgent } from '@/context/AgentContext';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { ArrowLeft, Play, ArrowRight } from 'lucide-react';

export default function WorkflowDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { workflows } = useAgent();

  const workflow = workflows.find(w => w.id === id) || workflows[0];

  return (
    <DashboardLayout>
      <div className="space-y-8 max-w-5xl mx-auto">
        <div>
          <Link href="/workflows" className="inline-flex items-center gap-2 text-xs font-mono text-[#777777] hover:text-[#111111] dark:hover:text-white transition-colors">
            <ArrowLeft className="w-3.5 h-3.5 text-[#830000]" /> BACK TO WORKFLOW BUILDER
          </Link>
        </div>

        <Card variant="glow" className="p-8 space-y-6">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 border-b border-[#DAD8D2] dark:border-[#2D2B27] pb-6">
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-[#111111] dark:text-[#EAE8E3]">{workflow.name}</h1>
                <span className={`px-2.5 py-0.5 rounded text-[10px] font-mono font-semibold uppercase tracking-wider border ${
                  workflow.isActive ? 'bg-[#FAFAF7] dark:bg-[#181715] text-[#111111] dark:text-[#EAE8E3] border-[#DAD8D2]' : 'bg-[#F5F4F0] dark:bg-[#121210] text-[#777777] border-[#DAD8D2]'
                }`}>
                  {workflow.isActive ? 'Active' : 'Paused'}
                </span>
              </div>
              <p className="text-xs text-[#555555] dark:text-[#A8A6A0] mt-1">{workflow.description}</p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <Button variant="primary" icon={<Play className="w-3.5 h-3.5" />}>
                Execute Workflow Test
              </Button>
            </div>
          </div>

          <div className="bg-[#FAFAF7] dark:bg-[#181715] border border-[#DAD8D2] dark:border-[#2D2B27] rounded-md p-8 min-h-[360px] relative flex flex-col justify-center overflow-x-auto">
            <div className="text-[10px] font-mono text-[#777777] uppercase tracking-widest mb-6 font-semibold">
              INTERACTIVE NODE CANVAS EDITOR
            </div>

            <div className="flex items-center justify-between gap-4 min-w-[650px] overflow-x-auto py-4">
              {workflow.nodes.map((node, i) => (
                <React.Fragment key={node.id}>
                  <div className="p-4 rounded-md border max-w-[170px] w-full space-y-2 bg-[#FFFFFF] dark:bg-[#1F1E1B] border-[#DAD8D2] dark:border-[#2D2B27] hover:border-[#111111] transition-all cursor-pointer shadow-subtle">
                    <div className="text-[9px] font-mono uppercase tracking-widest font-semibold text-[#830000] dark:text-[#FF2A2A]">
                      {node.type} NODE
                    </div>
                    <div className="text-xs font-semibold tracking-tight text-[#111111] dark:text-[#EAE8E3] leading-tight">
                      {node.title}
                    </div>
                    <div className="text-[9px] font-mono text-[#777777]">
                      STEP 0{i + 1}
                    </div>
                  </div>

                  {i < workflow.nodes.length - 1 && (
                    <div className="flex items-center justify-center shrink-0">
                      <div className="w-10 h-px bg-[#830000] dark:bg-[#FF2A2A] relative">
                        <ArrowRight className="w-3.5 h-3.5 text-[#830000] dark:text-[#FF2A2A] absolute -right-1.5 -top-1.5" />
                      </div>
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}

