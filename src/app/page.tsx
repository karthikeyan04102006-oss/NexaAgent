'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Sparkles, 
  ArrowRight, 
  Cpu, 
  Layers, 
  ShieldCheck, 
  Zap, 
  CheckCircle2, 
  Bot, 
  Calendar, 
  Mail, 
  MapPin, 
  Plane, 
  Database,
  Globe,
  ChevronRight,
  Play,
  Lock,
  Workflow
} from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function LandingPage() {
  const [activeTab, setActiveTab] = useState<'graph' | 'architecture'>('graph');

  return (
    <div className="min-h-screen bg-black text-white selection:bg-red-900 selection:text-white">
      {/* Header Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-xl border-b border-zinc-800/80">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-red-gradient p-0.5 shadow-red-glow">
              <div className="w-full h-full bg-zinc-950 rounded-[10px] flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-red-500" />
              </div>
            </div>
            <div>
              <span className="text-xl font-extrabold tracking-tight text-white">
                Nexa<span className="text-red-500">Agent</span>
              </span>
              <span className="block text-[10px] font-mono text-zinc-400 uppercase tracking-widest -mt-1">
                Autonomous AI Platform
              </span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-300">
            <a href="#how-it-works" className="hover:text-white transition-colors">How It Works</a>
            <a href="#capabilities" className="hover:text-white transition-colors">Capabilities</a>
            <a href="#integrations" className="hover:text-white transition-colors">Integrations</a>
            <a href="#architecture" className="hover:text-white transition-colors">Architecture</a>
            <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
          </nav>

          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="ghost" size="sm">Sign In</Button>
            </Link>
            <Link href="/onboarding">
              <Button variant="primary" size="sm" icon={<ArrowRight className="w-4 h-4" />}>
                Launch NexaAgent
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="pt-36 pb-20 px-6 relative overflow-hidden">
        {/* Glow backdrop effects */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-700/15 rounded-full blur-[140px] pointer-events-none"></div>

        <div className="max-w-5xl mx-auto text-center space-y-8 relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-zinc-900/90 border border-red-900/60 text-xs font-semibold text-red-400 shadow-red-glow">
            <Zap className="w-3.5 h-3.5 text-red-500" />
            <span>Enterprise Autonomous AI Orchestration Engine</span>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.1]">
            Give AI a goal.<br />
            <span className="bg-gradient-to-r from-white via-zinc-200 to-red-500 bg-clip-text text-transparent">
              Let it get the work done.
            </span>
          </h1>

          <p className="text-base md:text-xl text-zinc-400 max-w-3xl mx-auto font-normal leading-relaxed">
            NexaAgent transforms natural-language goals into autonomous workflows that plan, execute, verify, and complete tasks across your everyday apps.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link href="/dashboard" className="w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto text-base font-semibold" icon={<Sparkles className="w-5 h-5" />}>
                Start Building Free
              </Button>
            </Link>

            <Link href="/agent" className="w-full sm:w-auto">
              <Button size="lg" variant="secondary" className="w-full sm:w-auto text-base" icon={<Play className="w-4 h-4 text-red-500" />}>
                View Live Agent Demo
              </Button>
            </Link>
          </div>

          {/* Tagline */}
          <div className="pt-2 text-xs font-mono text-zinc-500 uppercase tracking-widest">
            "Your goal. Our agents. Your results."
          </div>

          {/* HERO VISUAL: FUTURISTIC AGENT EXECUTION DASHBOARD PREVIEW */}
          <div className="pt-12">
            <div className="relative mx-auto rounded-2xl border border-zinc-800 bg-zinc-950/90 p-4 shadow-red-glow-lg overflow-hidden group">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-600 via-rose-500 to-red-600"></div>

              {/* Dashboard Preview Header */}
              <div className="flex items-center justify-between pb-4 border-b border-zinc-800 text-xs font-mono text-zinc-400">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-red-500/80"></span>
                  <span className="w-3 h-3 rounded-full bg-amber-500/80"></span>
                  <span className="w-3 h-3 rounded-full bg-emerald-500/80"></span>
                  <span className="ml-2 font-bold text-white">NexaAgent Command Center</span>
                </div>
                <span className="bg-zinc-900 px-3 py-1 rounded border border-zinc-800 text-red-400">
                  STATUS: AUTONOMOUS EXECUTION ACTIVE
                </span>
              </div>

              {/* Live Simulated Goal Execution Pipeline */}
              <div className="p-6 text-left space-y-6">
                <div className="bg-zinc-900/90 border border-zinc-800 p-4 rounded-xl flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-mono text-red-400 uppercase tracking-wider">User Goal Prompt</span>
                    <div className="text-base font-bold text-white mt-0.5">
                      "Plan my Chennai trip under ₹15,000 including train booking & calendar sync."
                    </div>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800 text-xs font-semibold">
                    Completed (9/9 Steps)
                  </span>
                </div>

                {/* Execution Graph Visual Row */}
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                  {[
                    { title: '1. Goal Understand', tool: 'Supabase', status: 'Completed' },
                    { title: '2. Search Transport', tool: 'Travel Engine', status: 'Completed' },
                    { title: '3. Compare Hotels', tool: 'Google Maps', status: 'Completed' },
                    { title: '4. Add to Calendar', tool: 'Google Calendar', status: 'Completed' },
                    { title: '5. Verify & Report', tool: 'Nexa Engine', status: 'Completed' }
                  ].map((step, idx) => (
                    <div key={idx} className="p-3 bg-zinc-900 border border-zinc-800 rounded-xl space-y-1">
                      <div className="text-xs font-bold text-zinc-200">{step.title}</div>
                      <div className="text-[10px] font-mono text-zinc-400">Tool: {step.tool}</div>
                      <div className="text-[10px] text-emerald-400 flex items-center gap-1 font-semibold pt-1">
                        <CheckCircle2 className="w-3 h-3" /> {step.status}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS SECTION */}
      <section id="how-it-works" className="py-20 px-6 border-t border-zinc-900 bg-zinc-950/60">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight">
              How NexaAgent Operates
            </h2>
            <p className="text-zinc-400 max-w-2xl mx-auto text-sm md:text-base">
              Unlike simple conversational chatbots, NexaAgent executes complex goals through structured multi-phase orchestration.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800 hover:border-red-600/50 transition-all space-y-4">
              <div className="w-12 h-12 rounded-xl bg-red-950 text-red-400 border border-red-800 flex items-center justify-center font-bold text-lg">
                01
              </div>
              <h3 className="text-xl font-bold text-white">1. Goal Parsing & Planning</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Gemini 1.5 Pro analyzes your high-level natural language prompt, validates constraints, and decomposes it into sequential sub-tasks.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800 hover:border-red-600/50 transition-all space-y-4">
              <div className="w-12 h-12 rounded-xl bg-red-950 text-red-400 border border-red-800 flex items-center justify-center font-bold text-lg">
                02
              </div>
              <h3 className="text-xl font-bold text-white">2. Tool Selection & Execution</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                The agent dynamically selects connected APIs (Google Calendar, Gmail, Google Maps, Travel APIs) and executes actions safely.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800 hover:border-red-600/50 transition-all space-y-4">
              <div className="w-12 h-12 rounded-xl bg-red-950 text-red-400 border border-red-800 flex items-center justify-center font-bold text-lg">
                03
              </div>
              <h3 className="text-xl font-bold text-white">3. Human Approval & Verification</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Sensitive actions (email dispatches, financial payments) trigger Human-in-the-Loop authorization before final verification.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CAPABILITIES & INTEGRATIONS */}
      <section id="capabilities" className="py-20 px-6 border-t border-zinc-900">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight">
              Pluggable Integration Architecture
            </h2>
            <p className="text-zinc-400 max-w-2xl mx-auto text-sm">
              Connect your everyday tools seamlessly with role-based security controls.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { name: 'Google Calendar', icon: Calendar, color: 'text-blue-400' },
              { name: 'Gmail API', icon: Mail, color: 'text-red-400' },
              { name: 'Google Maps', icon: MapPin, color: 'text-emerald-400' },
              { name: 'Travel APIs', icon: Plane, color: 'text-purple-400' },
              { name: 'Supabase DB', icon: Database, color: 'text-amber-400' },
              { name: 'Gemini AI', icon: Sparkles, color: 'text-rose-400' },
            ].map((item, i) => (
              <div key={i} className="p-4 bg-zinc-950 border border-zinc-800 rounded-xl text-center space-y-2 hover:border-zinc-700">
                <item.icon className={`w-6 h-6 mx-auto ${item.color}`} />
                <div className="text-xs font-semibold text-white">{item.name}</div>
                <div className="text-[10px] text-emerald-400 font-mono">Connected</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 border-t border-zinc-900 bg-zinc-950 text-zinc-500 text-xs">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <Sparkles className="w-4 h-4 text-red-500" />
            <span className="font-bold text-white">NexaAgent</span>
            <span>© 2026 Nexa Technologies Inc. All rights reserved.</span>
          </div>

          <div className="flex items-center gap-6">
            <Link href="/login" className="hover:text-white">Sign In</Link>
            <Link href="/register" className="hover:text-white">Register</Link>
            <Link href="/dashboard" className="hover:text-white">Dashboard</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
