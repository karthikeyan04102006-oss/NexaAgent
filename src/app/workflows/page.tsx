'use client';

import React, { useState } from 'react';
import { useAgent } from '@/context/AgentContext';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Workflow, WorkflowNode } from '@/types';
import { 
  GitFork, 
  Plus, 
  Play, 
  Zap, 
  Cpu, 
  Wrench, 
  ShieldAlert, 
  CheckCircle2, 
  ArrowRight,
  Clock,
  Layers,
  Settings
} from 'lucide-react';

export default function WorkflowsPage() {
  const { workflows, toggleWorkflow, createWorkflow } = useAgent();
  const [selectedWorkflow, setSelectedWorkflow] = useState<Workflow>(workflows[0]);
  const [isCreating, setIsCreating] = useState(false);
  const [newWfName, setNewWfName] = useState('');
  const [newWfDesc, setNewWfDesc] = useState('');

  const getNodeBadgeColor = (type: WorkflowNode['type']) => {
    switch (type) {
      case 'trigger':
        return 'bg-amber-950 text-amber-300 border-amber-800';
      case 'agent':
        return 'bg-purple-950 text-purple-300 border-purple-800';
      case 'tool':
        return 'bg-blue-950 text-blue-300 border-blue-800';
      case 'approval':
        return 'bg-red-950 text-red-300 border-red-800 shadow-red-glow';
      case 'action':
      default:
        return 'bg-emerald-950 text-emerald-300 border-emerald-800';
    }
  };

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newWfName) return;
    createWorkflow({
      name: newWfName,
      description: newWfDesc,
      triggerType: 'schedule',
      triggerDetails: 'Every Monday at 9:00 AM IST',
      nodes: [
        { id: 'n1', type: 'trigger', title: 'Schedule Trigger', config: {}, position: { x: 50, y: 150 } },
        { id: 'n2', type: 'agent', title: 'AI Agent Execution', config: {}, position: { x: 280, y: 150 } },
        { id: 'n3', type: 'approval', title: 'Human Approval Check', config: {}, position: { x: 510, y: 150 } },
        { id: 'n4', type: 'action', title: 'Dispatch Action', config: {}, position: { x: 740, y: 150 } }
      ],
      connections: [
        { id: 'c1', fromNodeId: 'n1', toNodeId: 'n2' },
        { id: 'c2', fromNodeId: 'n2', toNodeId: 'n3' },
        { id: 'c3', fromNodeId: 'n3', toNodeId: 'n4' }
      ]
    });
    setIsCreating(false);
    setNewWfName('');
    setNewWfDesc('');
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 max-w-7xl mx-auto">
        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
              <GitFork className="w-7 h-7 text-red-500" /> Reusable Workflow Builder
            </h1>
            <p className="text-xs text-zinc-400 mt-1">
              Construct automated node-based agent flows with triggers, conditions, tools, and human approval checkpoints.
            </p>
          </div>

          <Button
            variant="primary"
            onClick={() => setIsCreating(true)}
            icon={<Plus className="w-4 h-4" />}
          >
            Build New Workflow
          </Button>
        </div>

        {/* MODAL FOR CREATING WORKFLOW */}
        {isCreating && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
            <div className="bg-zinc-950 border border-zinc-800 rounded-2xl max-w-md w-full p-6 space-y-4 shadow-red-glow">
              <h3 className="text-lg font-bold text-white">Create New Visual Workflow</h3>
              <form onSubmit={handleCreate} className="space-y-3 text-xs">
                <div>
                  <label className="block text-zinc-400 font-semibold mb-1">Workflow Name</label>
                  <input
                    type="text"
                    required
                    value={newWfName}
                    onChange={e => setNewWfName(e.target.value)}
                    placeholder="Weekly Meeting Scheduler"
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg p-2.5 text-white"
                  />
                </div>

                <div>
                  <label className="block text-zinc-400 font-semibold mb-1">Description</label>
                  <textarea
                    rows={3}
                    value={newWfDesc}
                    onChange={e => setNewWfDesc(e.target.value)}
                    placeholder="Describe trigger and tool steps..."
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg p-2.5 text-white resize-none"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <Button variant="ghost" type="button" onClick={() => setIsCreating(false)}>Cancel</Button>
                  <Button type="submit" variant="primary">Create & Edit Nodes</Button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* WORKFLOW BUILDER CANVAS & LIST GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* LEFT: SAVED WORKFLOWS LIST (4 COLS) */}
          <div className="lg:col-span-4 space-y-3">
            <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Saved Reusable Workflows</h3>

            {workflows.map(wf => (
              <Card
                key={wf.id}
                onClick={() => setSelectedWorkflow(wf)}
                className={`p-4 cursor-pointer transition-all ${
                  selectedWorkflow?.id === wf.id
                    ? 'border-red-600/80 bg-zinc-900 shadow-red-glow'
                    : 'hover:border-zinc-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-white">{wf.name}</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleWorkflow(wf.id);
                    }}
                    className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase border ${
                      wf.isActive
                        ? 'bg-emerald-950 text-emerald-300 border-emerald-800'
                        : 'bg-zinc-800 text-zinc-500 border-zinc-700'
                    }`}
                  >
                    {wf.isActive ? 'Active' : 'Paused'}
                  </button>
                </div>

                <p className="text-xs text-zinc-400 line-clamp-2 mt-1">{wf.description}</p>

                <div className="flex items-center gap-3 text-[10px] text-zinc-500 font-mono mt-3 pt-2 border-t border-zinc-800/60">
                  <span>Trigger: {wf.triggerType}</span>
                  <span>Nodes: {wf.nodes.length}</span>
                </div>
              </Card>
            ))}
          </div>

          {/* RIGHT: VISUAL NODE WORKFLOW EDITOR CANVAS (8 COLS) */}
          <div className="lg:col-span-8 space-y-4">
            {selectedWorkflow && (
              <Card variant="glow" className="p-6 space-y-6">
                <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
                  <div>
                    <h2 className="text-xl font-bold text-white">{selectedWorkflow.name}</h2>
                    <p className="text-xs text-zinc-400 mt-0.5">{selectedWorkflow.description}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button variant="primary" size="sm" icon={<Play className="w-3.5 h-3.5" />}>
                      Test Run Workflow
                    </Button>
                  </div>
                </div>

                {/* VISUAL NODE CANVAS INTERFACE */}
                <div className="bg-zinc-950/90 border border-zinc-800/90 rounded-2xl p-6 min-h-[380px] relative flex flex-col justify-center overflow-x-auto">
                  <div className="text-xs text-zinc-500 font-mono uppercase tracking-widest mb-6">
                    Visual Node Builder Canvas
                  </div>

                  {/* Horizontal Connected Node Pipeline */}
                  <div className="flex items-center justify-between gap-3 min-w-[700px] overflow-x-auto py-4">
                    {selectedWorkflow.nodes.map((node, i) => (
                      <React.Fragment key={node.id}>
                        <div className={`p-4 rounded-xl border max-w-[180px] w-full space-y-2 relative transition-all duration-200 hover:scale-105 cursor-pointer ${getNodeBadgeColor(node.type)}`}>
                          <div className="text-[10px] font-mono uppercase tracking-wider font-bold opacity-80">
                            {node.type} Node
                          </div>
                          <div className="text-xs font-bold text-white leading-tight">
                            {node.title}
                          </div>
                          <div className="text-[9px] font-mono text-zinc-400">
                            Configured API
                          </div>
                        </div>

                        {/* Arrow connection */}
                        {i < selectedWorkflow.nodes.length - 1 && (
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

                {/* Node Toolbar */}
                <div className="flex items-center justify-between text-xs text-zinc-400 pt-2 border-t border-zinc-800">
                  <span className="font-mono">Available Node Types: Trigger, AI Agent, Tool, Condition, Approval, End</span>
                  <span className="text-red-400 font-semibold">Visual Drag-and-Drop Active</span>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
