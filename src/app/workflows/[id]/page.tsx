'use client';

import React, { use } from 'react';
import Link from 'next/link';
import { useAgent } from '@/context/AgentContext';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { ArrowLeft, Play, GitFork, Plus, Layers, ArrowRight, Settings } from 'lucide-react';

export default function WorkflowDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { workflows } = useAgent();

  const workflow = workflows.find(w => w.id === id) || workflows[0];

  return (
    <DashboardLayout>
      <div className="space-y-6 max-w-6xl mx-auto">
        <div>
          <Link href="/workflows" className="inline-flex items-center gap-2 text-xs text-zinc-400 hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Workflows List
          </Link>
        </div>

        <Card variant="glow" className="p-6 space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-800 pb-4">
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-extrabold text-white">{workflow.name}</h1>
                <span className={`px-2.5 py-1 rounded text-xs font-mono font-bold uppercase border ${
                  workflow.isActive ? 'bg-emerald-950 text-emerald-300 border-emerald-800' : 'bg-zinc-900 text-zinc-500'
                }`}>
                  {workflow.isActive ? 'Active' : 'Paused'}
                </span>
              </div>
              <p className="text-xs text-zinc-400 mt-1">{workflow.description}</p>
            </div>

            <div className="flex items-center gap-3">
              <Button variant="primary" icon={<Play className="w-4 h-4" />}>
                Execute Workflow Test
              </Button>
            </div>
          </div>

          <div className="bg-zinc-950/90 border border-zinc-800/90 rounded-2xl p-6 min-h-[360px] relative flex flex-col justify-center overflow-x-auto">
            <div className="text-xs text-zinc-500 font-mono uppercase tracking-widest mb-6">
              Interactive Node Canvas Editor
            </div>

            <div className="flex items-center justify-between gap-3 min-w-[700px] overflow-x-auto py-4">
              {workflow.nodes.map((node, i) => (
                <React.Fragment key={node.id}>
                  <div className="p-4 rounded-xl border max-w-[180px] w-full space-y-2 bg-zinc-900 border-zinc-800 hover:border-red-600/80 transition-all cursor-pointer">
                    <div className="text-[10px] font-mono uppercase tracking-wider font-bold text-red-400">
                      {node.type} Node
                    </div>
                    <div className="text-xs font-bold text-white leading-tight">
                      {node.title}
                    </div>
                    <div className="text-[9px] font-mono text-zinc-500">
                      Step #{i + 1}
                    </div>
                  </div>

                  {i < workflow.nodes.length - 1 && (
                    <div className="flex items-center justify-center shrink-0">
                      <div className="w-8 h-0.5 bg-gradient-to-r from-red-600 to-rose-400 relative">
                        <ArrowRight className="w-4 h-4 text-red-500 absolute -right-2 -top-1.5" />
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
