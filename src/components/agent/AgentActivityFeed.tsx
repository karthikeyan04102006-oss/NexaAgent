'use client';

import React from 'react';
import { ActivityLogEvent } from '@/types';
import { Terminal, CheckCircle2, Search, Settings, Calendar, AlertTriangle, ShieldAlert } from 'lucide-react';

interface AgentActivityFeedProps {
  logs: ActivityLogEvent[];
}

export const AgentActivityFeed: React.FC<AgentActivityFeedProps> = ({ logs }) => {
  const getLogIcon = (type: ActivityLogEvent['type']) => {
    switch (type) {
      case 'success':
        return <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />;
      case 'tool_call':
        return <Search className="w-4 h-4 text-blue-400 shrink-0" />;
      case 'decision':
        return <Settings className="w-4 h-4 text-purple-400 shrink-0" />;
      case 'approval':
        return <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0" />;
      case 'warning':
      case 'error':
        return <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />;
      case 'info':
      default:
        return <Terminal className="w-4 h-4 text-zinc-400 shrink-0" />;
    }
  };

  return (
    <div className="bg-zinc-950/90 border border-zinc-800 rounded-2xl p-4 flex flex-col h-[540px]">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-zinc-800 pb-3 mb-3 shrink-0">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-red-500" />
          <h4 className="text-sm font-bold text-white uppercase tracking-wider">Live Agent Activity Log</h4>
        </div>
        <span className="text-[10px] font-mono bg-zinc-900 border border-zinc-800 px-2 py-0.5 rounded text-zinc-400">
          REALTIME STREAM
        </span>
      </div>

      {/* Activity List Stream */}
      <div className="flex-1 overflow-y-auto space-y-2.5 pr-1 scrollbar-thin">
        {logs.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-zinc-500 text-xs py-10">
            <Terminal className="w-8 h-8 text-zinc-700 mb-2" />
            <span>No activity logs recorded yet.</span>
          </div>
        ) : (
          logs.map(log => (
            <div
              key={log.id}
              className="group p-2.5 rounded-lg bg-zinc-900/60 border border-zinc-800/60 hover:border-zinc-700/80 transition-all text-xs font-mono flex items-start gap-2.5"
            >
              <span className="text-[10px] text-zinc-500 shrink-0 font-mono mt-0.5">{log.timeFormatted}</span>
              {getLogIcon(log.type)}
              <div className="flex-1 min-w-0">
                <p className={`leading-relaxed break-words ${
                  log.type === 'success' ? 'text-emerald-300' :
                  log.type === 'approval' ? 'text-amber-300 font-bold' :
                  log.type === 'decision' ? 'text-purple-300' :
                  log.type === 'tool_call' ? 'text-blue-300' : 'text-zinc-300'
                }`}>
                  {log.message}
                </p>
                {log.toolName && (
                  <span className="inline-block text-[10px] text-zinc-500 mt-1 bg-zinc-950 px-1.5 py-0.5 rounded border border-zinc-800">
                    Tool: {log.toolName}
                  </span>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      <div className="mt-3 pt-2 border-t border-zinc-900 text-[11px] text-zinc-500 text-center shrink-0 font-mono">
        Shielded Feed: Internal chain-of-thought is sanitized for privacy & security.
      </div>
    </div>
  );
};
