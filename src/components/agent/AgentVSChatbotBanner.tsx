'use client';

import React from 'react';
import { ArrowRight, Bot, Cpu, Zap } from 'lucide-react';

export const AgentVSChatbotBanner: React.FC = () => {
  return (
    <div className="bg-[#FAF9FC] border border-[#E7E3EC] rounded-md p-6 my-6">
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
        <div>
          <div className="text-[10px] font-mono uppercase tracking-widest font-semibold text-[#A78BFA] mb-1">
            AUTONOMOUS ARCHITECTURE
          </div>
          <h3 className="text-base font-bold text-[#17151C] tracking-tight">
            Goal to Execution Engine
          </h3>
          <p className="text-xs text-[#696572] mt-1 max-w-xl leading-relaxed">
            NexaAgent decomposes goals into tasks, executes tools, and verifies results.
          </p>
        </div>

        {/* Dynamic Comparison Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full lg:w-auto shrink-0">
          {/* Simple Chatbot Card */}
          <div className="p-3.5 rounded bg-[#FFFFFF] border border-[#E7E3EC] text-xs space-y-1.5">
            <div className="font-semibold text-[#696572] flex items-center gap-2 border-b border-[#E7E3EC] pb-1.5">
              <Bot className="w-4 h-4 text-[#96919F]" />
              <span>Chatbot</span>
            </div>
            <div className="flex items-center gap-1.5 text-[10px] font-mono text-[#96919F]">
              <span>Prompt</span>
              <ArrowRight className="w-3 h-3" />
              <span>Text</span>
            </div>
          </div>

          {/* Autonomous Agent Card */}
          <div className="p-3.5 rounded bg-[#FFFFFF] border border-[#A78BFA]/50 text-xs space-y-1.5 shadow-subtle">
            <div className="font-semibold text-[#6D5BA6] flex items-center gap-2 border-b border-[#E7E3EC] pb-1.5">
              <Cpu className="w-4 h-4 text-[#A78BFA]" />
              <span>NexaAgent</span>
            </div>
            <div className="flex items-center gap-1 text-[10px] font-mono text-[#17151C] flex-wrap">
              <span className="bg-[#FAF9FC] px-1.5 py-0.5 rounded border border-[#E7E3EC]">Goal</span>
              <ArrowRight className="w-2.5 h-2.5 text-[#A78BFA]" />
              <span className="bg-[#FAF9FC] px-1.5 py-0.5 rounded border border-[#E7E3EC]">Plan</span>
              <ArrowRight className="w-2.5 h-2.5 text-[#A78BFA]" />
              <span className="bg-[#A78BFA] text-white px-1.5 py-0.5 rounded">Verify</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

