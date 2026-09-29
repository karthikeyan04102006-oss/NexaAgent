'use client';

import React, { useState, useEffect } from 'react';
import { Sparkles, CheckCircle2, Loader2, Calendar, Mail, ShieldCheck, ArrowDown, Play } from 'lucide-react';

export const HeroAgentVisualizer: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [autoPlay, setAutoPlay] = useState<boolean>(true);

  const steps = [
    { label: 'User Goal Prompt', detail: '"Schedule a meeting with my team tomorrow afternoon"', tool: 'User Prompt', status: 'completed' },
    { label: 'Goal Understanding', detail: 'Identified goal: Team sync tomorrow afternoon, 4 participants', tool: 'Nexa Engine', status: 'completed' },
    { label: 'Task Planning', detail: 'Decomposed into 5 sub-tasks & tool invocations', tool: 'Gemini 1.5 Pro', status: 'completed' },
    { label: 'Calendar Agent', detail: 'Inspected Google Calendar for mutual open slots', tool: 'Google Calendar API', status: 'active' },
    { label: 'Availability Check', detail: 'Selected optimal slot: 02:30 PM - 03:30 PM IST', tool: 'Calendar Tool', status: 'pending' },
    { label: 'Meeting Creation', detail: 'Generated calendar event with Google Meet link', tool: 'Google Calendar API', status: 'pending' },
    { label: 'Email Notification', detail: 'User approved email dispatch to 4 team members', tool: 'Gmail API', status: 'pending' },
    { label: 'Verification', detail: 'Verified zero calendar collisions and invite delivery', tool: 'Nexa Verification', status: 'pending' }
  ];

  useEffect(() => {
    if (!autoPlay) return;
    const interval = setInterval(() => {
      setActiveStep(prev => (prev + 1) % (steps.length + 1));
    }, 1600);
    return () => clearInterval(interval);
  }, [autoPlay, steps.length]);

  return (
    <div className="w-full max-w-4xl mx-auto rounded-2xl border border-zinc-800 bg-zinc-950/95 p-6 shadow-red-glow-lg text-left overflow-hidden relative group">
      {/* Top Glow bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-600 via-rose-500 to-red-600"></div>

      {/* Visualizer Window Bar */}
      <div className="flex items-center justify-between pb-4 border-b border-zinc-800 text-xs font-mono">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-red-500/80"></span>
          <span className="w-3 h-3 rounded-full bg-amber-500/80"></span>
          <span className="w-3 h-3 rounded-full bg-emerald-500/80"></span>
          <span className="ml-2 font-bold text-white tracking-wide">NexaAgent Autonomous Visualizer</span>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-[10px] text-emerald-400 bg-emerald-950 px-2.5 py-0.5 rounded border border-emerald-800 font-bold">
            LIVE ENGINE DEMO
          </span>
          <button
            onClick={() => setAutoPlay(!autoPlay)}
            className="text-zinc-400 hover:text-white flex items-center gap-1 text-[11px]"
          >
            <Play className="w-3 h-3 text-red-500" /> {autoPlay ? 'Pause' : 'Replay'}
          </button>
        </div>
      </div>

      {/* Main Execution Flow Box */}
      <div className="py-6 space-y-4">
        {/* User Prompt Box */}
        <div className="p-4 bg-zinc-900/90 border border-red-600/40 rounded-xl flex items-center justify-between shadow-red-glow">
          <div>
            <div className="text-[10px] font-mono text-red-400 uppercase tracking-wider font-bold">Natural Language Goal</div>
            <div className="text-base font-bold text-white mt-0.5">
              "Schedule a meeting with my team tomorrow afternoon."
            </div>
          </div>
          <span className="px-3 py-1 rounded-full bg-red-950 text-red-300 border border-red-800 text-xs font-bold font-mono">
            Autonomous Loop
          </span>
        </div>

        {/* Step Nodes Stack */}
        <div className="space-y-2 pt-2">
          {steps.map((s, idx) => {
            const isFinished = activeStep > idx;
            const isCurrent = activeStep === idx;

            return (
              <div
                key={idx}
                className={`p-3 rounded-xl border transition-all duration-300 flex items-center justify-between text-xs ${
                  isFinished
                    ? 'bg-zinc-900/80 border-zinc-800 text-zinc-300'
                    : isCurrent
                    ? 'bg-red-950/40 border-red-600/80 text-white shadow-red-glow scale-[1.01]'
                    : 'bg-zinc-950/40 border-zinc-900 text-zinc-600'
                }`}
              >
                <div className="flex items-center gap-3">
                  {isFinished ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  ) : isCurrent ? (
                    <Loader2 className="w-4 h-4 text-red-400 animate-spin shrink-0" />
                  ) : (
                    <span className="w-4 h-4 rounded-full border border-zinc-800 inline-block shrink-0"></span>
                  )}
                  <div>
                    <span className="font-bold text-white mr-2">{s.label}</span>
                    <span className="text-zinc-400 font-normal">{s.detail}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 font-mono text-[10px] shrink-0">
                  <span className="px-2 py-0.5 rounded bg-zinc-900 text-zinc-400 border border-zinc-800">{s.tool}</span>
                  <span className={isFinished ? 'text-emerald-400' : isCurrent ? 'text-red-400 font-bold' : 'text-zinc-600'}>
                    {isFinished ? '✓ Verified' : isCurrent ? 'Executing...' : 'Pending'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Final Completion Banner */}
        {activeStep >= steps.length && (
          <div className="p-4 rounded-xl bg-emerald-950/60 border border-emerald-700/80 text-emerald-300 text-xs font-bold flex items-center justify-between animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              <span>GOAL COMPLETED SUCCESSFULLY! Calendar event created & invites dispatched.</span>
            </div>
            <span className="font-mono text-[10px] bg-emerald-900 px-2 py-1 rounded text-emerald-200">0 ERRORS</span>
          </div>
        )}
      </div>
    </div>
  );
};
