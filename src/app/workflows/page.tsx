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
  ArrowRight,
  Layers
} from 'lucide-react';

export default function WorkflowsPage() {
  const { workflows, toggleWorkflow, createWorkflow } = useAgent();
  const [selectedWorkflow, setSelectedWorkflow] = useState<Workflow | null>(workflows[0] || null);
  const [isCreating, setIsCreating] = useState(false);
  const [newWfName, setNewWfName] = useState('');
  const [newWfDesc, setNewWfDesc] = useState('');

  const getNodeBadgeColor = (type: WorkflowNode['type']) => {
    switch (type) {
      case 'trigger':
        return 'bg-[#FAF9FC] text-[#17151C] border-[#E7E3EC]';
      case 'agent':
        return 'bg-[#DDD6FE]/30 text-[#6D5BA6] border-[#A78BFA]/50 font-semibold';
      case 'tool':
        return 'bg-[#FAF9FC] text-[#17151C] border-[#E7E3EC]';
      case 'approval':
        return 'bg-white text-[#6D5BA6] border-[#A78BFA] font-semibold';
      case 'action':
      default:
        return 'bg-[#FAF9FC] text-emerald-800 border-[#E7E3EC]';
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
        { id: 'n1', type: 'trigger', title: 'SCHEDULE TRIGGER', config: {}, position: { x: 50, y: 150 } },
        { id: 'n2', type: 'agent', title: 'AI AGENT LOOP', config: {}, position: { x: 280, y: 150 } },
        { id: 'n3', type: 'approval', title: 'HUMAN CHECKPOINT', config: {}, position: { x: 510, y: 150 } },
        { id: 'n4', type: 'action', title: 'DISPATCH ACTION', config: {}, position: { x: 740, y: 150 } }
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
      <div className="space-y-8 max-w-6xl mx-auto">
        {/* EDITORIAL HEADER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#E7E3EC] pb-8">
          <div>
            <div className="text-[10px] font-mono uppercase tracking-widest font-semibold text-[#A78BFA] mb-2">
              AUTOMATION
            </div>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tighter text-[#17151C]">
              Workflows
            </h1>
            <p className="text-sm text-[#696572] mt-1">
              Automate work you repeat.
            </p>
          </div>

          <Button
            variant="primary"
            onClick={() => setIsCreating(true)}
            icon={<Plus className="w-4 h-4" />}
          >
            Create workflow
          </Button>
        </div>

        {/* MODAL FOR CREATING WORKFLOW */}
        {isCreating && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm p-4">
            <div className="bg-[#FFFFFF] border border-[#E7E3EC] rounded-lg max-w-md w-full p-6 space-y-4 shadow-editorial text-[#17151C]">
              <h3 className="text-base font-bold uppercase tracking-wider">Create workflow</h3>
              <form onSubmit={handleCreate} className="space-y-4 text-xs">
                <div>
                  <label className="block text-[#696572] font-semibold mb-1">Workflow Name</label>
                  <input
                    type="text"
                    required
                    value={newWfName}
                    onChange={e => setNewWfName(e.target.value)}
                    placeholder="Weekly Briefing"
                    className="w-full bg-[#FAF9FC] border border-[#E7E3EC] rounded-md p-2.5 text-[#17151C] focus:outline-none focus:border-[#A78BFA]"
                  />
                </div>

                <div>
                  <label className="block text-[#696572] font-semibold mb-1">Description</label>
                  <textarea
                    rows={3}
                    value={newWfDesc}
                    onChange={e => setNewWfDesc(e.target.value)}
                    placeholder="Brief description of the workflow..."
                    className="w-full bg-[#FAF9FC] border border-[#E7E3EC] rounded-md p-2.5 text-[#17151C] focus:outline-none focus:border-[#A78BFA] resize-none"
                  />
                </div>

                <div className="flex justify-end gap-3 pt-2">
                  <Button variant="ghost" type="button" onClick={() => setIsCreating(false)}>Cancel</Button>
                  <Button type="submit" variant="primary">Create</Button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* WORKFLOW BUILDER CANVAS & LIST GRID */}
        {workflows.length === 0 ? (
          <Card className="p-12 text-center text-[#96919F] space-y-3">
            <GitFork className="w-10 h-10 text-[#E7E3EC] mx-auto" />
            <div className="text-base font-semibold text-[#17151C]">No workflows yet.</div>
            <Button size="sm" variant="primary" onClick={() => setIsCreating(true)}>Create workflow</Button>
          </Card>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* LEFT: SAVED WORKFLOWS LIST (4 COLS) */}
            <div className="lg:col-span-4 space-y-3">
              <h3 className="text-[10px] font-mono font-semibold text-[#A78BFA] uppercase tracking-widest mb-3">WORKFLOWS</h3>

              {workflows.map(wf => (
                <Card
                  key={wf.id}
                  onClick={() => setSelectedWorkflow(wf)}
                  className={`p-5 cursor-pointer transition-all ${
                    selectedWorkflow?.id === wf.id
                      ? 'border-[#A78BFA] bg-[#FFFFFF] shadow-editorial'
                      : 'bg-[#FAF9FC] border-[#E7E3EC] hover:border-[#A78BFA]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-[#17151C] tracking-tight">{wf.name}</span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleWorkflow(wf.id);
                      }}
                      className="text-[9px] h-6 px-2 py-0 font-mono"
                    >
                      {wf.isActive ? 'Active' : 'Paused'}
                    </Button>
                  </div>

                  <p className="text-xs text-[#696572] line-clamp-2 mt-1.5 leading-relaxed">{wf.description}</p>

                  <div className="flex items-center gap-4 text-[10px] text-[#96919F] font-mono mt-4 pt-2.5 border-t border-[#E7E3EC]">
                    <span>TRIGGER: {wf.triggerType.toUpperCase()}</span>
                    <span>NODES: {wf.nodes.length}</span>
                  </div>
                </Card>
              ))}
            </div>

            {/* RIGHT: VISUAL NODE WORKFLOW EDITOR CANVAS (8 COLS) */}
            <div className="lg:col-span-8 space-y-4">
              {selectedWorkflow && (
                <Card variant="glow" className="p-6 md:p-8 space-y-6 border-[#A78BFA]/30">
                  <div className="flex items-center justify-between border-b border-[#E7E3EC] pb-4">
                    <div>
                      <h2 className="text-xl font-bold tracking-tight text-[#17151C]">{selectedWorkflow.name}</h2>
                      <p className="text-xs text-[#696572] mt-0.5">{selectedWorkflow.description}</p>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button variant="primary" size="sm" icon={<Play className="w-3.5 h-3.5" />}>
                        Test Run
                      </Button>
                    </div>
                  </div>

                  {/* VISUAL NODE CANVAS INTERFACE */}
                  <div className="bg-[#FAF9FC] border border-[#E7E3EC] rounded-md p-8 min-h-[340px] relative flex flex-col justify-center overflow-x-auto">
                    {/* Horizontal Connected Node Pipeline */}
                    <div className="flex items-center justify-between gap-4 min-w-[600px] overflow-x-auto py-4">
                      {selectedWorkflow.nodes.map((node, i) => (
                        <React.Fragment key={node.id}>
                          <div className={`p-4 rounded-md border max-w-[160px] w-full space-y-2 relative transition-all duration-150 cursor-pointer shadow-subtle ${getNodeBadgeColor(node.type)}`}>
                            <div className="text-[9px] font-mono uppercase tracking-widest font-semibold opacity-70">
                              {node.type}
                            </div>
                            <div className="text-xs font-semibold tracking-tight text-[#17151C]">
                              {node.title}
                            </div>
                          </div>

                          {/* Thin connection line */}
                          {i < selectedWorkflow.nodes.length - 1 && (
                            <div className="flex items-center justify-center shrink-0">
                              <div className="w-8 h-px bg-[#A78BFA] relative">
                                <ArrowRight className="w-3.5 h-3.5 text-[#A78BFA] absolute -right-1.5 -top-1.5" />
                              </div>
                            </div>
                          )}
                        </React.Fragment>
                      ))}
                    </div>
                  </div>
                </Card>
              )}
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

