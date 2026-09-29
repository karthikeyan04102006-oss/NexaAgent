'use client';

import React, { useState } from 'react';
import { ExecutionNode } from '@/types';
import { Badge } from '@/components/ui/Badge';
import { 
  CheckCircle2, 
  Loader2, 
  Clock, 
  AlertTriangle, 
  RotateCcw, 
  Layers, 
  Calendar, 
  Mail, 
  MapPin, 
  Plane, 
  Database,
  ArrowRight,
  Info
} from 'lucide-react';

interface AgentGraphVisualizerProps {
  nodes: ExecutionNode[];
  taskTitle?: string;
  isExecuting?: boolean;
}

export const AgentGraphVisualizer: React.FC<AgentGraphVisualizerProps> = ({ nodes, taskTitle, isExecuting }) => {
  const [selectedNode, setSelectedNode] = useState<ExecutionNode | null>(nodes[0] || null);

  const getToolIcon = (tool?: string) => {
    switch (tool?.toLowerCase()) {
      case 'gcalendar':
        return <Calendar className="w-4 h-4 text-blue-400" />;
      case 'gmail':
        return <Mail className="w-4 h-4 text-red-400" />;
      case 'gmaps':
        return <MapPin className="w-4 h-4 text-emerald-400" />;
      case 'travel':
        return <Plane className="w-4 h-4 text-purple-400" />;
      case 'supabase':
      default:
        return <Database className="w-4 h-4 text-amber-400" />;
    }
  };

  const getStatusIcon = (status: ExecutionNode['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />;
      case 'running':
        return <Loader2 className="w-5 h-5 text-red-400 animate-spin shrink-0" />;
      case 'retrying':
        return <RotateCcw className="w-5 h-5 text-amber-400 animate-spin shrink-0" />;
      case 'waiting':
        return <AlertTriangle className="w-5 h-5 text-red-400 animate-bounce shrink-0" />;
      case 'pending':
      default:
        return <Clock className="w-5 h-5 text-zinc-600 shrink-0" />;
    }
  };

  return (
    <div className="space-y-4">
      {/* Header Info */}
      <div className="flex items-center justify-between bg-zinc-950/80 border border-zinc-800 p-4 rounded-xl">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-red-950/50 rounded-lg border border-red-800/40 text-red-400">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              Autonomous Execution Node Graph
              {isExecuting && (
                <span className="inline-flex items-center gap-1 text-xs font-normal text-red-400 bg-red-950/80 px-2 py-0.5 rounded-full border border-red-800">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping"></span> Live Execution
                </span>
              )}
            </h3>
            <p className="text-xs text-zinc-400">
              Visual graph representation of sub-task decomposition, tool selection & verification loop.
            </p>
          </div>
        </div>

        <div className="text-right hidden sm:block">
          <div className="text-xs text-zinc-500 font-mono">Total Nodes: {nodes.length}</div>
          <div className="text-xs text-emerald-400 font-medium">
            Completed: {nodes.filter(n => n.status === 'completed').length} / {nodes.length}
          </div>
        </div>
      </div>

      {/* Execution Flow Diagram Horizontal / Grid Timeline */}
      <div className="bg-zinc-950/90 border border-zinc-800/80 rounded-2xl p-6 overflow-x-auto scrollbar-thin">
        <div className="flex flex-col space-y-4 min-w-[700px]">
          {nodes.map((node, index) => {
            const isSelected = selectedNode?.id === node.id;
            const isLast = index === nodes.length - 1;

            return (
              <React.Fragment key={node.id}>
                <div
                  onClick={() => setSelectedNode(node)}
                  className={`group relative flex items-center justify-between p-4 rounded-xl border transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? 'bg-zinc-900 border-red-600/80 shadow-red-glow'
                      : node.status === 'running'
                      ? 'bg-red-950/30 border-red-600/60 shadow-red-glow'
                      : node.status === 'completed'
                      ? 'bg-zinc-900/60 border-zinc-800 hover:border-zinc-700'
                      : node.status === 'waiting'
                      ? 'bg-red-950/60 border-red-500/80 animate-pulse'
                      : 'bg-zinc-950/50 border-zinc-900 text-zinc-500'
                  }`}
                >
                  {/* Step Order Number */}
                  <div className="flex items-center gap-4">
                    <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-zinc-900 border border-zinc-800 font-mono text-xs font-bold text-zinc-400">
                      {index + 1}
                    </div>

                    <div className="flex items-center gap-3">
                      {getStatusIcon(node.status)}
                      <div>
                        <div className="flex items-center gap-2">
                          <span className={`text-sm font-bold ${node.status === 'pending' ? 'text-zinc-500' : 'text-zinc-100'}`}>
                            {node.label}
                          </span>
                          {node.requiresApproval && (
                            <span className="px-2 py-0.5 text-[10px] uppercase tracking-wider font-bold bg-amber-950 text-amber-300 border border-amber-800 rounded">
                              Requires Approval
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-zinc-400 line-clamp-1 mt-0.5">
                          {node.description}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Tool & Status Pill */}
                  <div className="flex items-center gap-3">
                    {node.tool && (
                      <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-zinc-900 border border-zinc-800 text-xs text-zinc-300">
                        {getToolIcon(node.tool)}
                        <span className="font-mono text-[11px] uppercase tracking-wider">{node.tool}</span>
                      </div>
                    )}
                    <Badge status={node.status} size="sm" />
                  </div>
                </div>

                {/* Animated Connecting Line between nodes */}
                {!isLast && (
                  <div className="flex justify-center my-0.5">
                    <div className={`w-0.5 h-6 transition-all duration-500 ${
                      nodes[index + 1]?.status === 'running' || node.status === 'completed'
                        ? 'bg-gradient-to-b from-red-600 to-emerald-500'
                        : 'bg-zinc-800'
                    }`}></div>
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Selected Node Drawer Output Card */}
      {selectedNode && (
        <div className="bg-zinc-900/90 border border-zinc-800 rounded-xl p-4 text-xs text-zinc-300 space-y-2">
          <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
            <span className="font-bold text-white flex items-center gap-2">
              <Info className="w-4 h-4 text-red-400" />
              Node Details: {selectedNode.label}
            </span>
            <span className="font-mono text-zinc-400">ID: {selectedNode.id}</span>
          </div>
          <p><strong className="text-zinc-400">Description:</strong> {selectedNode.description}</p>
          {selectedNode.output && (
            <div>
              <strong className="text-zinc-400">Execution Output:</strong>
              <pre className="bg-zinc-950 p-2.5 rounded-lg border border-zinc-800 font-mono text-[11px] text-emerald-400 mt-1 overflow-x-auto">
                {typeof selectedNode.output === 'object' 
                  ? JSON.stringify(selectedNode.output, null, 2) 
                  : selectedNode.output}
              </pre>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
