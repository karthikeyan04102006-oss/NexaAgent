'use client';

import React from 'react';
import { ArrowRight, Bot, Cpu, CheckCircle2, ShieldCheck, Zap } from 'lucide-react';

export const AgentVSChatbotBanner: React.FC = () => {
  return (
    <div className="bg-gradient-to-r from-zinc-950 via-zinc-900 to-zinc-950 border border-zinc-800 rounded-2xl p-6 shadow-subtle my-6 overflow-hidden relative">
      <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-red-600/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-red-950/80 text-red-300 border border-red-800/80 mb-2">
            <Zap className="w-3.5 h-3.5" />
            <span>Architectural Distinction</span>
          </div>
          <h3 className="text-xl font-bold text-white tracking-tight">
            Why NexaAgent is Not a Chatbot
          </h3>
          <p className="text-xs text-zinc-400 mt-1 max-w-xl">
            Chatbots generate static text answers. NexaAgent operates as a fully autonomous agent framework—decomposing goals, orchestrating tools, verifying results, and governing sensitive operations with Human-in-the-Loop security.
          </p>
        </div>

        {/* Dynamic Comparison Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full lg:w-auto shrink-0">
          {/* Simple Chatbot Card */}
          <div className="p-3.5 rounded-xl bg-zinc-950/80 border border-zinc-800 text-xs space-y-2">
            <div className="font-semibold text-zinc-400 flex items-center gap-1.5 border-b border-zinc-800 pb-1.5">
              <Bot className="w-4 h-4 text-zinc-500" />
              <span>Standard Chatbot</span>
            </div>
            <div className="flex items-center gap-1.5 text-[11px] font-mono text-zinc-400">
              <span>User Prompt</span>
              <ArrowRight className="w-3 h-3 text-zinc-600" />
              <span>LLM</span>
              <ArrowRight className="w-3 h-3 text-zinc-600" />
              <span className="text-zinc-300">Text Response</span>
            </div>
            <p className="text-[10px] text-zinc-500">No tools, no execution, no state verification.</p>
          </div>

          {/* Autonomous Agent Card */}
          <div className="p-3.5 rounded-xl bg-red-950/30 border border-red-600/50 text-xs space-y-2 shadow-red-glow">
            <div className="font-bold text-red-400 flex items-center gap-1.5 border-b border-red-900/60 pb-1.5">
              <Cpu className="w-4 h-4 text-red-400" />
              <span>NexaAgent Autonomous Loop</span>
            </div>
            <div className="flex items-center gap-1 text-[10px] font-mono text-zinc-300 flex-wrap">
              <span className="bg-zinc-900 px-1.5 py-0.5 rounded border border-zinc-800">Goal</span>
              <ArrowRight className="w-2.5 h-2.5 text-red-500" />
              <span className="bg-zinc-900 px-1.5 py-0.5 rounded border border-zinc-800">Plan</span>
              <ArrowRight className="w-2.5 h-2.5 text-red-500" />
              <span className="bg-zinc-900 px-1.5 py-0.5 rounded border border-zinc-800">Tools</span>
              <ArrowRight className="w-2.5 h-2.5 text-red-500" />
              <span className="bg-red-900/80 text-red-200 px-1.5 py-0.5 rounded border border-red-700">Verify</span>
            </div>
            <p className="text-[10px] text-red-300/80">Pluggable APIs, auto replanning, human approval.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
