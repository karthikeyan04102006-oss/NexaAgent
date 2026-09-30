'use client';

import React from 'react';
import Link from 'next/link';
import { 
  ArrowRight, 
  Cpu, 
  Layers, 
  ShieldCheck, 
  Zap, 
  CheckCircle2, 
  Calendar, 
  Mail, 
  MapPin, 
  Plane, 
  Database,
  Globe,
  Workflow,
  Activity,
  BarChart3,
  RotateCcw,
  Brain,
  Wrench
} from 'lucide-react';
import { Logo } from '@/components/ui/Logo';
import { Button } from '@/components/ui/Button';
import { HeroAgentVisualizer } from '@/components/agent/HeroAgentVisualizer';

export default function LandingPage() {
  const steps = [
    { num: '01', title: 'Understand', desc: 'Understand what you want.' },
    { num: '02', title: 'Plan', desc: 'Break the goal into tasks.' },
    { num: '03', title: 'Act', desc: 'Use the right tools.' },
    { num: '04', title: 'Verify', desc: 'Check the result.' },
    { num: '05', title: 'Complete', desc: 'Return the outcome.' }
  ];

  const features = [
    { title: 'Autonomous Planning', desc: 'Turns a goal into an executable plan.', icon: Layers },
    { title: 'Tool Execution', desc: 'Runs actions across connected tools.', icon: Wrench },
    { title: 'Workflow Automation', desc: 'Schedules and triggers repeated tasks.', icon: Zap },
    { title: 'Human Approval', desc: 'Requires authorization for sensitive actions.', icon: ShieldCheck },
    { title: 'Verification', desc: 'Validates results before completion.', icon: CheckCircle2 },
    { title: 'Failure Recovery', desc: 'Replans automatically if an action fails.', icon: RotateCcw }
  ];

  const integrationsList = [
    { name: 'Google Calendar', status: 'Connected', icon: Calendar },
    { name: 'Gmail', status: 'Connected', icon: Mail },
    { name: 'Google Maps', status: 'Connected', icon: MapPin },
    { name: 'Gemini', status: 'Connected', icon: Cpu },
    { name: 'Supabase', status: 'Connected', icon: Database }
  ];

  return (
    <div className="min-h-screen bg-[#F7F6FA] text-[#17151C] selection:bg-[#A78BFA] selection:text-white">
      {/* MINIMAL QUIET NAVBAR */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#FAF9FC]/90 backdrop-blur-md border-b border-[#E7E3EC]">
        <div className="max-w-7xl mx-auto px-8 h-20 flex items-center justify-between">
          {/* Left Brand */}
          <Link href="/" className="flex items-center gap-3 group">
            <Logo size={32} showWordmark={true} variant="editorial" />
          </Link>

          {/* Quiet Navigation Center */}
          <nav className="hidden md:flex items-center gap-8 text-xs font-mono uppercase tracking-wider text-[#696572]">
            <a href="#how-it-works" className="hover:text-[#A78BFA] transition-colors">How it works</a>
            <a href="#features" className="hover:text-[#A78BFA] transition-colors">Features</a>
            <a href="#integrations" className="hover:text-[#A78BFA] transition-colors">Integrations</a>
            <a href="#security" className="hover:text-[#A78BFA] transition-colors">Security</a>
          </nav>

          {/* Right Action CTAs */}
          <div className="flex items-center gap-3">
            <Link href="/login">
              <Button variant="ghost" size="sm">Sign In</Button>
            </Link>
            <Link href="/onboarding">
              <Button variant="primary" size="sm" icon={<ArrowRight className="w-3.5 h-3.5" />}>
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="pt-40 pb-20 px-8 relative">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#FAF9FC] dark:bg-[#111116] border border-[#E7E3EC] dark:border-[#26242C] text-[10px] font-mono uppercase tracking-widest text-[#A78BFA] font-semibold">
            AUTONOMOUS AI PLATFORM
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-medium tracking-tight leading-[1.05]">
            Give AI a goal.<br />
            <span className="text-[#A78BFA]">
              Let it get the work done.
            </span>
          </h1>

          <p className="text-base md:text-lg text-[#696572] dark:text-[#A7A3B2] max-w-xl mx-auto font-sans leading-relaxed">
            Turn everyday goals into actions with an autonomous AI agent.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link href="/dashboard" className="w-full sm:w-auto">
              <Button variant="primary" size="lg" className="w-full sm:w-auto px-8" icon={<ArrowRight className="w-4 h-4" />}>
                Start Building
              </Button>
            </Link>

            <Link href="/login" className="w-full sm:w-auto">
              <Button variant="secondary" size="lg" className="w-full sm:w-auto px-8">
                Sign In
              </Button>
            </Link>
          </div>

          {/* WATCH THE AGENT WORK HERO VISUALIZER */}
          <div className="pt-16 border-t border-[#E7E3EC] mt-16">
            <div className="space-y-2 mb-8">
              <div className="text-[10px] font-mono uppercase tracking-widest text-[#A78BFA]">EXECUTION FLOW</div>
              <h2 className="text-2xl font-serif font-medium text-[#17151C]">Watch the agent work.</h2>
              <p className="text-xs text-[#696572]">See every step from goal to completion.</p>
            </div>
            <HeroAgentVisualizer />
          </div>
        </div>
      </section>

      {/* HOW IT WORKS SECTION */}
      <section id="how-it-works" className="py-24 px-8 border-t border-[#E7E3EC] bg-[#FAF9FC]">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="border-b border-[#E7E3EC] pb-6 space-y-1">
            <div className="text-[10px] font-mono text-[#A78BFA] uppercase tracking-widest font-semibold">
              ARCHITECTURE
            </div>
            <h2 className="text-3xl md:text-4xl font-serif font-medium text-[#17151C]">
              How it works
            </h2>
            <p className="text-xs text-[#696572]">
              From goal to completion.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {steps.map(s => (
              <div key={s.num} className="p-6 bg-[#FFFFFF] border border-[#E7E3EC] space-y-3">
                <div className="text-lg font-mono font-bold text-[#A78BFA]">{s.num}</div>
                <h3 className="text-sm font-mono uppercase tracking-wider font-semibold text-[#17151C]">{s.title}</h3>
                <p className="text-xs text-[#696572] leading-relaxed font-sans">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section id="features" className="py-24 px-8 border-t border-[#E7E3EC]">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="border-b border-[#E7E3EC] pb-6 space-y-1">
            <div className="text-[10px] font-mono text-[#A78BFA] uppercase tracking-widest font-semibold">
              CAPABILITIES
            </div>
            <h2 className="text-3xl md:text-4xl font-serif font-medium text-[#17151C]">
              Built to get things done.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => {
              const Icon = f.icon;
              return (
                <div key={i} className="p-6 bg-[#FFFFFF] border border-[#E7E3EC] space-y-3 hover:border-[#A78BFA] transition-colors">
                  <div className="p-2 bg-[#FAF9FC] border border-[#E7E3EC] text-[#A78BFA] w-fit">
                    <Icon className="w-4 h-4" />
                  </div>
                  <h3 className="text-sm font-mono uppercase tracking-wider font-semibold text-[#17151C]">{f.title}</h3>
                  <p className="text-xs text-[#696572] leading-relaxed font-sans">{f.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* INTEGRATIONS SECTION */}
      <section id="integrations" className="py-24 px-8 border-t border-[#E7E3EC] bg-[#FAF9FC]">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="border-b border-[#E7E3EC] pb-6 space-y-1">
            <div className="text-[10px] font-mono text-[#A78BFA] uppercase tracking-widest font-semibold">
              ECOSYSTEM
            </div>
            <h2 className="text-3xl md:text-4xl font-serif font-medium text-[#17151C]">
              Integrations
            </h2>
            <p className="text-xs text-[#696572]">
              Connect the tools your agent uses.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {integrationsList.map((item, i) => (
              <div key={i} className="p-6 bg-[#FFFFFF] border border-[#E7E3EC] flex flex-col justify-between space-y-4">
                <div className="flex items-center gap-3">
                  <item.icon className="w-5 h-5 text-[#A78BFA]" />
                  <span className="text-xs font-mono font-semibold text-[#17151C] uppercase">{item.name}</span>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-[#E7E3EC]">
                  <span className="text-[10px] font-mono text-[#696572] uppercase">{item.status}</span>
                  <span className="text-[10px] font-mono text-[#A78BFA] uppercase font-semibold">Active</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECURITY SECTION */}
      <section id="security" className="py-24 px-8 border-t border-[#E7E3EC] text-center">
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#FAF9FC] text-[#A78BFA] border border-[#E7E3EC] text-[10px] font-mono uppercase tracking-widest font-semibold">
            RESPONSIBLE GOVERNANCE
          </div>

          <h2 className="text-3xl md:text-5xl font-serif font-medium text-[#17151C]">
            Human-in-the-Loop Approval.
          </h2>

          <p className="text-xs text-[#696572] max-w-lg mx-auto font-sans leading-relaxed">
            Sensitive actions require explicit user authorization before execution.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 text-xs font-mono text-[#17151C]">
            <div className="p-4 bg-[#FFFFFF] border border-[#E7E3EC]">Supabase Auth</div>
            <div className="p-4 bg-[#FFFFFF] border border-[#E7E3EC]">Row Level Security</div>
            <div className="p-4 bg-[#FFFFFF] border border-[#E7E3EC]">Human Approval</div>
            <div className="p-4 bg-[#FFFFFF] border border-[#E7E3EC]">Secrets Shield</div>
          </div>
        </div>
      </section>

      {/* FINAL CTA SECTION */}
      <section className="py-24 px-8 border-t border-[#E7E3EC] bg-[#FAF9FC] text-center">
        <div className="max-w-3xl mx-auto space-y-6">
          <h2 className="text-3xl md:text-5xl font-serif font-medium text-[#17151C]">
            Turn goals into completed work.
          </h2>
          <div className="flex justify-center gap-4 pt-2">
            <Link href="/register">
              <Button variant="primary" size="lg" className="px-8">Start Building</Button>
            </Link>
            <Link href="/login">
              <Button variant="secondary" size="lg" className="px-8">Sign In</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 border-t border-[#E7E3EC] bg-[#FAF9FC] text-[#696572] text-xs font-mono">
        <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <Logo size={28} showWordmark={true} variant="editorial" />
          </div>
          <div className="text-[11px] text-[#96919F]">
            © 2026 NexaAgent • Autonomous AI Platform
          </div>
        </div>
      </footer>
    </div>
  );
}


