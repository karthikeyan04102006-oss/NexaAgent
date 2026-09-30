'use client';

import React from 'react';
import { ActivityLogEvent } from '@/types';
import { Terminal, CheckCircle2, Search, Settings, AlertTriangle, ShieldAlert } from 'lucide-react';

interface AgentActivityFeedProps {
  logs: ActivityLogEvent[];
}

export const AgentActivityFeed: React.FC<AgentActivityFeedProps> = ({ logs }) => {
  const getLogIcon = (type: ActivityLogEvent['type']) => {
    switch (type) {
      case 'success':
        return <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />;
      case 'tool_call':
        return <Search className="w-3.5 h-3.5 text-[#A78BFA] shrink-0" />;
      case 'decision':
        return <Settings className="w-3.5 h-3.5 text-[#A78BFA] shrink-0" />;
      case 'approval':
        return <ShieldAlert className="w-3.5 h-3.5 text-[#6D5BA6] shrink-0" />;
      case 'warning':
      case 'error':
        return <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0" />;
      case 'info':
      default:
        return <Terminal className="w-3.5 h-3.5 text-[#96919F] shrink-0" />;
    }
  };

  return (
    <div className="bg-[#FFFFFF] border border-[#E7E3EC] rounded-md p-5 flex flex-col h-[520px] shadow-subtle">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#E7E3EC] pb-3 mb-4 shrink-0">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-[#A78BFA]" />
          <h4 className="text-xs font-semibold text-[#17151C] uppercase tracking-wider">Agent Activity</h4>
        </div>
        <span className="text-[9px] font-mono bg-[#FAF9FC] border border-[#E7E3EC] px-2 py-0.5 rounded text-[#96919F] font-semibold uppercase tracking-widest">
          LIVE STREAM
        </span>
      </div>

      {/* Activity List Stream */}
      <div className="flex-1 overflow-y-auto space-y-2 pr-1">
        {logs.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-[#96919F] text-xs py-10">
            <Terminal className="w-6 h-6 text-[#E7E3EC] mb-2" />
            <span>No activity recorded yet.</span>
          </div>
        ) : (
          logs.map(log => (
            <div
              key={log.id}
              className="p-3 rounded bg-[#FAF9FC] border border-[#E7E3EC] hover:border-[#A78BFA] transition-all text-xs flex items-start gap-3"
            >
              <span className="text-[10px] text-[#96919F] shrink-0 font-mono mt-0.5">{log.timeFormatted}</span>
              {getLogIcon(log.type)}
              <div className="flex-1 min-w-0">
                <p className={`leading-relaxed break-words text-xs ${
                  log.type === 'success' ? 'text-emerald-800 font-medium' :
                  log.type === 'approval' ? 'text-[#6D5BA6] font-semibold' :
                  'text-[#17151C]'
                }`}>
                  {log.message}
                </p>
                {log.toolName && (
                  <span className="inline-block text-[9px] font-mono text-[#696572] mt-1 bg-white px-1.5 py-0.2 rounded border border-[#E7E3EC]">
                    TOOL: {log.toolName}
                  </span>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

