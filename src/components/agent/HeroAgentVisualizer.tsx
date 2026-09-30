'use client';

import React, { useState, useEffect } from 'react';
import { CheckCircle2, Loader2, Play, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export const HeroAgentVisualizer: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [autoPlay, setAutoPlay] = useState<boolean>(true);

  const phases = [
    { code: 'GOAL', label: 'Goal Formulation', detail: '"Schedule a meeting with my team tomorrow afternoon"', tool: 'User Input' },
    { code: 'PLAN', label: 'Task Decomposition', detail: 'Identified 4 participants & decomposed into 5 execution steps', tool: 'Gemini 1.5 Pro' },
    { code: 'TOOLS', label: 'Tool Orchestration', detail: 'Selected Google Calendar API & Gmail API plugins', tool: 'Nexa Registry' },
    { code: 'EXECUTE', label: 'Live Action Dispatch', detail: 'Found optimal slot (02:30 PM) & generated Google Meet link', tool: 'Calendar API' },
    { code: 'VERIFY', label: 'Result Verification', detail: 'Verified zero calendar collisions & dispatched invites', tool: 'Nexa Engine' },
    { code: 'COMPLETE', label: 'Goal Finalized', detail: 'Meeting created, invites sent, calendar synced', tool: 'Complete' }
  ];

  useEffect(() => {
    if (!autoPlay) return;
    const interval = setInterval(() => {
      setActiveStep(prev => (prev + 1) % (phases.length + 1));
    }, 1800);
    return () => clearInterval(interval);
  }, [autoPlay, phases.length]);

  return (
    <div className="w-full max-w-4xl mx-auto rounded-lg border border-[#DAD8D2] dark:border-[#2D2B27] bg-[#FFFFFF] dark:bg-[#1F1E1B] p-6 md:p-8 shadow-editorial text-left overflow-hidden relative">
      {/* Top Hairline Bar */}
      <div className="flex items-center justify-between pb-5 border-b border-[#DAD8D2] dark:border-[#2D2B27] text-xs">
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-[#830000] dark:bg-[#FF2A2A]"></span>
          <span className="font-mono text-[11px] uppercase tracking-widest font-semibold text-[#111111] dark:text-[#EAE8E3]">
            Autonomous Loop Installation — 01
          </span>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-[10px] font-mono text-[#830000] dark:text-[#FF2A2A] border border-[#830000]/30 px-2 py-0.5 rounded uppercase tracking-wider font-semibold">
            ENGINE RUNNING
          </span>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setAutoPlay(!autoPlay)}
            icon={<Play className="w-3 h-3 text-[#A78BFA]" />}
            className="text-[11px] font-mono h-7"
          >
            {autoPlay ? 'PAUSE' : 'REPLAY'}
          </Button>
        </div>
      </div>

      {/* Main Execution Flow Box */}
      <div className="py-6 space-y-6">
        {/* User Prompt Box */}
        <div className="p-5 bg-[#FAFAF7] dark:bg-[#181715] border border-[#DAD8D2] dark:border-[#2D2B27] rounded-md flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="text-[10px] font-mono text-[#830000] dark:text-[#FF2A2A] uppercase tracking-widest font-semibold">INPUT GOAL</div>
            <div className="text-base md:text-lg font-semibold text-[#111111] dark:text-[#EAE8E3] tracking-tight mt-0.5">
              "Schedule a meeting with my team tomorrow afternoon."
            </div>
          </div>
          <span className="px-3 py-1 rounded bg-[#111111] dark:bg-[#EAE8E3] text-[#FAFAF7] dark:text-[#111111] text-xs font-mono uppercase tracking-wider font-semibold self-start md:self-center shrink-0">
            Autonomous Prompt
          </span>
        </div>

        {/* Phase Chain Flow Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 pt-2">
          {phases.map((p, idx) => {
            const isFinished = activeStep > idx;
            const isCurrent = activeStep === idx;

            return (
              <div
                key={p.code}
                onClick={() => setActiveStep(idx)}
                className={`p-3 rounded-md border text-left cursor-pointer transition-all duration-200 ${
                  isFinished
                    ? 'bg-[#FAFAF7] dark:bg-[#181715] border-[#DAD8D2] dark:border-[#2D2B27]'
                    : isCurrent
                    ? 'bg-[#FFFFFF] dark:bg-[#1F1E1B] border-[#830000] dark:border-[#FF2A2A] shadow-subtle -translate-y-0.5'
                    : 'bg-[#FAFAF7]/50 dark:bg-[#121210] border-[#DAD8D2]/40 text-[#777777]'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className={`text-[10px] font-mono tracking-widest font-bold ${
                    isCurrent ? 'text-[#830000] dark:text-[#FF2A2A]' : isFinished ? 'text-[#111111] dark:text-[#EAE8E3]' : 'text-[#777777]'
                  }`}>
                    {p.code}
                  </span>
                  {isFinished ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  ) : isCurrent ? (
                    <Loader2 className="w-3.5 h-3.5 text-[#830000] dark:text-[#FF2A2A] animate-spin" />
                  ) : (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#DAD8D2]"></span>
                  )}
                </div>
                <div className="text-xs font-semibold text-[#111111] dark:text-[#EAE8E3] truncate">{p.label}</div>
              </div>
            );
          })}
        </div>

        {/* Step Nodes Detail Stack */}
        <div className="space-y-2 pt-2">
          {phases.map((s, idx) => {
            const isFinished = activeStep > idx;
            const isCurrent = activeStep === idx;

            return (
              <div
                key={idx}
                className={`p-3.5 rounded-md border transition-all duration-200 flex items-center justify-between text-xs ${
                  isFinished
                    ? 'bg-[#FAFAF7] dark:bg-[#181715] border-[#DAD8D2] dark:border-[#2D2B27] text-[#555555] dark:text-[#A8A6A0]'
                    : isCurrent
                    ? 'bg-[#FFFFFF] dark:bg-[#1F1E1B] border-[#830000] dark:border-[#BC0202] text-[#111111] dark:text-[#EAE8E3] shadow-editorial'
                    : 'bg-[#FAFAF7]/30 dark:bg-[#121210] border-[#DAD8D2]/30 text-[#777777]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="font-mono text-[11px] font-semibold text-[#830000] dark:text-[#FF2A2A] w-6 shrink-0">
                    0{idx + 1}
                  </span>
                  <div>
                    <span className="font-semibold text-[#111111] dark:text-[#EAE8E3] mr-2">{s.label}</span>
                    <span className="text-[#555555] dark:text-[#A8A6A0] font-normal">{s.detail}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 font-mono text-[10px] shrink-0">
                  <span className="px-2 py-0.5 rounded bg-[#F5F4F0] dark:bg-[#121210] text-[#555555] dark:text-[#A8A6A0] border border-[#DAD8D2] dark:border-[#2D2B27]">
                    {s.tool}
                  </span>
                  <span className={`font-semibold uppercase tracking-wider ${
                    isFinished ? 'text-emerald-700 dark:text-emerald-400' : isCurrent ? 'text-[#830000] dark:text-[#FF2A2A]' : 'text-[#777777]'
                  }`}>
                    {isFinished ? 'Verified' : isCurrent ? 'Active' : 'Pending'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Final Completion Banner */}
        {activeStep >= phases.length && (
          <div className="p-4 rounded-md bg-[#FAFAF7] dark:bg-[#181715] border border-[#830000]/40 text-[#111111] dark:text-[#EAE8E3] text-xs font-semibold flex items-center justify-between animate-in fade-in duration-200">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-4 h-4 text-[#830000] dark:text-[#FF2A2A]" />
              <span>Goal finalized. Calendar event created, invites sent, zero collisions.</span>
            </div>
            <span className="font-mono text-[10px] bg-[#830000] text-white px-2 py-1 rounded tracking-widest uppercase">
              100% COMPLETE
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

