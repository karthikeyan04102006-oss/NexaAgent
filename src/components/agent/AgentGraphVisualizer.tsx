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
        return <Calendar className="w-3.5 h-3.5 text-[#830000]" />;
      case 'gmail':
        return <Mail className="w-3.5 h-3.5 text-[#830000]" />;
      case 'gmaps':
        return <MapPin className="w-3.5 h-3.5 text-[#830000]" />;
      case 'travel':
        return <Plane className="w-3.5 h-3.5 text-[#830000]" />;
      case 'supabase':
      default:
        return <Database className="w-3.5 h-3.5 text-[#830000]" />;
    }
  };

  const getStatusIcon = (status: ExecutionNode['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />;
      case 'running':
        return <Loader2 className="w-4 h-4 text-[#830000] dark:text-[#FF2A2A] animate-spin shrink-0" />;
      case 'retrying':
        return <RotateCcw className="w-4 h-4 text-amber-600 animate-spin shrink-0" />;
      case 'waiting':
        return <AlertTriangle className="w-4 h-4 text-[#BC0202] animate-bounce shrink-0" />;
      case 'pending':
      default:
        return <Clock className="w-4 h-4 text-[#777777] shrink-0" />;
    }
  };

  return (
    <div className="space-y-4">
      {/* Header Info */}
      <div className="flex items-center justify-between bg-[#FAFAF7] dark:bg-[#181715] border border-[#DAD8D2] dark:border-[#2D2B27] p-5 rounded-md">
        <div className="flex items-center gap-4">
          <div className="p-2.5 bg-white dark:bg-[#1F1E1B] rounded border border-[#DAD8D2] dark:border-[#2D2B27] text-[#830000] dark:text-[#FF2A2A]">
            <Layers className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-[#111111] dark:text-[#EAE8E3] flex items-center gap-2">
              Autonomous Execution Trace
              {isExecuting && (
                <span className="inline-flex items-center gap-1 text-[10px] font-mono font-semibold text-[#830000] dark:text-[#FF2A2A] border border-[#830000]/30 px-2 py-0.5 rounded-full uppercase tracking-wider">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#830000] animate-ping"></span> Live Execution
                </span>
              )}
            </h3>
            <p className="text-xs text-[#555555] dark:text-[#A8A6A0] mt-0.5">
              Sub-task decomposition, tool orchestration & verification sequence.
            </p>
          </div>
        </div>

        <div className="text-right hidden sm:block font-mono text-xs">
          <div className="text-[#777777]">NODES: {nodes.length}</div>
          <div className="text-[#830000] dark:text-[#FF2A2A] font-semibold">
            DONE: {nodes.filter(n => n.status === 'completed').length} / {nodes.length}
          </div>
        </div>
      </div>

      {/* Execution Flow List */}
      <div className="bg-[#FFFFFF] dark:bg-[#1F1E1B] border border-[#DAD8D2] dark:border-[#2D2B27] rounded-md p-6 overflow-x-auto">
        <div className="flex flex-col space-y-3 min-w-[650px]">
          {nodes.map((node, index) => {
            const isSelected = selectedNode?.id === node.id;
            const isLast = index === nodes.length - 1;

            return (
              <React.Fragment key={node.id}>
                <div
                  onClick={() => setSelectedNode(node)}
                  className={`group relative flex items-center justify-between p-4 rounded-md border transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? 'bg-[#FAFAF7] dark:bg-[#181715] border-[#111111] dark:border-[#EAE8E3] shadow-editorial'
                      : node.status === 'running'
                      ? 'bg-white dark:bg-[#1F1E1B] border-[#830000] dark:border-[#BC0202] shadow-subtle'
                      : node.status === 'completed'
                      ? 'bg-[#FAFAF7] dark:bg-[#181715] border-[#DAD8D2] dark:border-[#2D2B27]'
                      : node.status === 'waiting'
                      ? 'bg-white dark:bg-[#1F1E1B] border-[#BC0202] animate-pulse'
                      : 'bg-[#FAFAF7]/40 dark:bg-[#121210] border-[#DAD8D2]/40 text-[#777777]'
                  }`}
                >
                  {/* Step Order Number */}
                  <div className="flex items-center gap-4">
                    <div className="flex items-center justify-center w-6 h-6 rounded bg-[#F5F4F0] dark:bg-[#121210] border border-[#DAD8D2] dark:border-[#2D2B27] font-mono text-xs font-semibold text-[#111111] dark:text-[#EAE8E3]">
                      0{index + 1}
                    </div>

                    <div className="flex items-center gap-3">
                      {getStatusIcon(node.status)}
                      <div>
                        <div className="flex items-center gap-2">
                          <span className={`text-xs font-semibold ${node.status === 'pending' ? 'text-[#777777]' : 'text-[#111111] dark:text-[#EAE8E3]'}`}>
                            {node.label}
                          </span>
                          {node.requiresApproval && (
                            <span className="px-2 py-0.5 text-[9px] uppercase tracking-wider font-mono font-bold bg-[#830000] text-white rounded">
                              APPROVAL REQUIRED
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-[#555555] dark:text-[#A8A6A0] line-clamp-1 mt-0.5">
                          {node.description}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Tool & Status Pill */}
                  <div className="flex items-center gap-3">
                    {node.tool && (
                      <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#F5F4F0] dark:bg-[#121210] border border-[#DAD8D2] dark:border-[#2D2B27] text-xs text-[#111111] dark:text-[#EAE8E3]">
                        {getToolIcon(node.tool)}
                        <span className="font-mono text-[10px] uppercase tracking-wider">{node.tool}</span>
                      </div>
                    )}
                    <Badge status={node.status} size="sm" />
                  </div>
                </div>

                {/* Connecting Line between nodes */}
                {!isLast && (
                  <div className="flex justify-center my-0.5">
                    <div className="w-px h-4 bg-[#DAD8D2] dark:bg-[#2D2B27]"></div>
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Selected Node Drawer Output Card */}
      {selectedNode && (
        <div className="bg-[#FAFAF7] dark:bg-[#181715] border border-[#DAD8D2] dark:border-[#2D2B27] rounded-md p-4 text-xs text-[#111111] dark:text-[#EAE8E3] space-y-2">
          <div className="flex items-center justify-between border-b border-[#DAD8D2] dark:border-[#2D2B27] pb-2">
            <span className="font-semibold flex items-center gap-2">
              <Info className="w-3.5 h-3.5 text-[#830000]" />
              Node Spec: {selectedNode.label}
            </span>
            <span className="font-mono text-[10px] text-[#777777]">ID: {selectedNode.id}</span>
          </div>
          <p><strong className="text-[#555555] dark:text-[#A8A6A0]">Description:</strong> {selectedNode.description}</p>
          {selectedNode.output && (
            <div>
              <strong className="text-[#555555] dark:text-[#A8A6A0]">Output Trace:</strong>
              <pre className="bg-[#FFFFFF] dark:bg-[#1F1E1B] p-3 rounded border border-[#DAD8D2] dark:border-[#2D2B27] font-mono text-[11px] text-[#111111] dark:text-[#EAE8E3] mt-1 overflow-x-auto">
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

