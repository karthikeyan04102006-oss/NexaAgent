'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Sparkles, 
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
  Play,
  Lock,
  Workflow,
  Search,
  Activity,
  BarChart3,
  RotateCcw,
  Brain,
  CheckSquare,
  Building2,
  UserCheck
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { HeroAgentVisualizer } from '@/components/agent/HeroAgentVisualizer';

export default function LandingPage() {
  const steps = [
    { num: '01', title: 'UNDERSTAND', desc: 'AI analyzes and understands the user goal prompt and constraints.' },
    { num: '02', title: 'PLAN', desc: 'The agent breaks the goal into structured, executable sub-tasks.' },
    { num: '03', title: 'ACT', desc: 'The agent selects and executes appropriate API tools safely.' },
    { num: '04', title: 'VERIFY', desc: 'The agent verifies action results against initial goals.' },
    { num: '05', title: 'COMPLETE', desc: 'The agent reports the final verified outcome to the user.' }
  ];

  const features = [
    { title: 'Autonomous Planning', desc: 'Decomposes complex prompts into ordered multi-step execution graphs.', icon: Layers },
    { title: 'Tool Calling', desc: 'Seamlessly interacts with Google Calendar, Gmail, Maps, and Travel APIs.', icon: WrenchIcon },
    { title: 'Multi-Step Execution', desc: 'Executes chained workflows with conditional branching and retries.', icon: Workflow },
    { title: 'Real-Time Activity', desc: 'Live event stream showing sanitized step execution summaries.', icon: Activity },
    { title: 'Human Approval', desc: 'Enforces human authorization for sensitive financial & email actions.', icon: ShieldCheck },
    { title: 'Failure Recovery', desc: 'Automatically replans when an API call fails or encounters errors.', icon: RotateCcw },
    { title: 'Workflow Automation', desc: 'Build re-usable scheduled or triggered visual node workflows.', icon: Zap },
    { title: 'Memory & State', desc: 'Remains context-aware across long-running task executions.', icon: Brain },
    { title: 'Integrations', desc: 'Pluggable API framework with RBAC permission scope controls.', icon: Globe },
    { title: 'Analytics', desc: 'Enterprise dashboards tracking task success rates & API token usage.', icon: BarChart3 }
  ];

  function WrenchIcon(props: any) {
    return <Cpu {...props} />;
  }

  const useCases = [
    { title: 'Personal Productivity', desc: 'Schedule meetings, organize calendars and manage tasks.', prompt: '"Organize my calendar for tomorrow"' },
    { title: 'Travel Planning', desc: 'Research transport, hotels and create itineraries.', prompt: '"Plan my Chennai trip under ₹15,000"' },
    { title: 'Email Automation', desc: 'Read, organize, draft and send emails with approval.', prompt: '"Draft team sync invitations"' },
    { title: 'Business Workflows', desc: 'Automate repetitive multi-step business processes.', prompt: '"Weekly executive briefing scheduler"' },
    { title: 'Research & Synthesis', desc: 'Collect information, compare results and produce structured outputs.', prompt: '"Research Q3 SaaS benchmarks"' }
  ];

  const integrationsList = [
    { name: 'Google Calendar', status: 'Connected', icon: Calendar, color: 'text-blue-400' },
    { name: 'Gmail API', status: 'Connected', icon: Mail, color: 'text-red-400' },
    { name: 'Google Maps', status: 'Connected', icon: MapPin, color: 'text-emerald-400' },
    { name: 'Travel APIs', status: 'Connected', icon: Plane, color: 'text-purple-400' },
    { name: 'Supabase DB', status: 'Connected', icon: Database, color: 'text-amber-400' },
    { name: 'Gemini 1.5 Pro', status: 'Connected', icon: Sparkles, color: 'text-rose-400' },
    { name: 'Slack Integration', status: 'Available', icon: Globe, color: 'text-zinc-400' },
    { name: 'Notion Connector', status: 'Coming Soon', icon: Brain, color: 'text-zinc-500' }
  ];

  return (
    <div className="min-h-screen bg-black text-white selection:bg-red-900 selection:text-white">
      {/* NAVBAR */}
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
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#use-cases" className="hover:text-white transition-colors">Use Cases</a>
            <a href="#integrations" className="hover:text-white transition-colors">Integrations</a>
            <a href="#security" className="hover:text-white transition-colors">Security</a>
          </nav>

          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="ghost" size="sm">Sign In</Button>
            </Link>
            <Link href="/onboarding">
              <Button variant="primary" size="sm" icon={<ArrowRight className="w-4 h-4" />}>
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="pt-36 pb-20 px-6 relative overflow-hidden">
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

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link href="/dashboard" className="w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto text-base font-semibold" icon={<Sparkles className="w-5 h-5" />}>
                Start Building
              </Button>
            </Link>

            <Link href="/agent" className="w-full sm:w-auto">
              <Button size="lg" variant="secondary" className="w-full sm:w-auto text-base" icon={<Play className="w-4 h-4 text-red-500" />}>
                View Demo
              </Button>
            </Link>
          </div>

          {/* Tagline */}
          <div className="pt-2 text-xs font-mono text-zinc-500 uppercase tracking-widest">
            "Your goal. Our agents. Your results."
          </div>

          {/* HERO INTERACTIVE AGENT VISUALIZER */}
          <div className="pt-8">
            <HeroAgentVisualizer />
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
              A 5-step autonomous execution model designed for reliability and governance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {steps.map(s => (
              <div key={s.num} className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800 hover:border-red-600/50 transition-all space-y-3">
                <div className="text-2xl font-extrabold text-red-500 font-mono">{s.num}</div>
                <h3 className="text-base font-bold text-white tracking-wide">{s.title}</h3>
                <p className="text-xs text-zinc-400 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section id="features" className="py-20 px-6 border-t border-zinc-900">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight">
              Enterprise Agent Capabilities
            </h2>
            <p className="text-zinc-400 max-w-2xl mx-auto text-sm">
              Built with security, tool calling, and human governance at the core.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {features.map((f, i) => {
              const Icon = f.icon;
              return (
                <div key={i} className="p-5 bg-zinc-950 border border-zinc-800 hover:border-red-600/50 rounded-2xl space-y-3 hover:-translate-y-1 transition-all">
                  <div className="p-2.5 bg-red-950/60 rounded-xl border border-red-800/60 text-red-400 w-fit">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-sm font-bold text-white">{f.title}</h3>
                  <p className="text-xs text-zinc-400 leading-relaxed">{f.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* USE CASES SECTION */}
      <section id="use-cases" className="py-20 px-6 border-t border-zinc-900 bg-zinc-950/40">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight">
              Autonomous Use Cases
            </h2>
            <p className="text-zinc-400 max-w-2xl mx-auto text-sm">
              From everyday personal productivity to complex business workflows.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {useCases.map((uc, i) => (
              <div key={i} className="p-5 bg-zinc-900/80 border border-zinc-800 rounded-2xl space-y-3 flex flex-col justify-between">
                <div className="space-y-2">
                  <h3 className="text-sm font-bold text-white">{uc.title}</h3>
                  <p className="text-xs text-zinc-400">{uc.desc}</p>
                </div>
                <div className="p-2 rounded bg-zinc-950 text-[10px] font-mono text-red-400 border border-zinc-800 truncate">
                  {uc.prompt}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INTEGRATIONS SECTION */}
      <section id="integrations" className="py-20 px-6 border-t border-zinc-900">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight">
              Connected API Ecosystem
            </h2>
            <p className="text-zinc-400 max-w-2xl mx-auto text-sm">
              Pluggable integrations with real status indicators.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {integrationsList.map((item, i) => (
              <div key={i} className="p-5 bg-zinc-950 border border-zinc-800 rounded-2xl space-y-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <item.icon className={`w-6 h-6 ${item.color}`} />
                  <span className="text-xs font-bold text-white">{item.name}</span>
                </div>
                <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                  item.status === 'Connected' ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' :
                  item.status === 'Available' ? 'bg-blue-950 text-blue-300 border border-blue-800' :
                  'bg-zinc-900 text-zinc-500 border border-zinc-800'
                }`}>
                  {item.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECURITY SECTION */}
      <section id="security" className="py-20 px-6 border-t border-zinc-900 bg-zinc-950/80">
        <div className="max-w-5xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-950 text-red-400 border border-red-800 text-xs font-semibold">
            <ShieldCheck className="w-4 h-4" /> Responsible Autonomy
          </div>

          <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight">
            Built for responsible autonomy.
          </h2>

          <p className="text-zinc-400 max-w-2xl mx-auto text-sm leading-relaxed">
            Sensitive operations like dispatches, bookings, and deletions automatically pause execution to request explicit Human-in-the-Loop approval.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 text-xs font-semibold text-zinc-300">
            <div className="p-3 bg-zinc-900 border border-zinc-800 rounded-xl">Authentication</div>
            <div className="p-3 bg-zinc-900 border border-zinc-800 rounded-xl">Row Level Security</div>
            <div className="p-3 bg-zinc-900 border border-zinc-800 rounded-xl">Human Approval Hold</div>
            <div className="p-3 bg-zinc-900 border border-zinc-800 rounded-xl">Server Secrets Protection</div>
          </div>
        </div>
      </section>

      {/* FINAL CTA SECTION */}
      <section className="py-20 px-6 border-t border-zinc-900 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-red-600/15 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-4xl mx-auto text-center space-y-6 relative z-10">
          <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight">
            Turn your goals into completed work.
          </h2>
          <p className="text-zinc-400 text-base">
            Build autonomous workflows with NexaAgent today.
          </p>
          <div className="flex justify-center gap-4 pt-2">
            <Link href="/onboarding">
              <Button size="lg" className="font-bold">Start Building</Button>
            </Link>
            <Link href="/agent">
              <Button size="lg" variant="secondary">View Demo</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 border-t border-zinc-900 bg-zinc-950 text-zinc-500 text-xs">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-2">
            <div className="flex items-center gap-2 font-bold text-white text-base">
              <Sparkles className="w-4 h-4 text-red-500" /> NexaAgent
            </div>
            <p className="text-zinc-400 text-[11px]">"Your goal. Our agents. Your results."</p>
            <p className="text-[10px] text-zinc-600">© 2026 Nexa Technologies Inc.</p>
          </div>

          <div>
            <div className="font-bold text-white mb-2">Product</div>
            <ul className="space-y-1">
              <li><Link href="/dashboard" className="hover:text-white">Dashboard</Link></li>
              <li><Link href="/agent" className="hover:text-white">Agent Command Center</Link></li>
              <li><Link href="/workflows" className="hover:text-white">Workflows</Link></li>
              <li><Link href="/integrations" className="hover:text-white">Integrations</Link></li>
            </ul>
          </div>

          <div>
            <div className="font-bold text-white mb-2">Company</div>
            <ul className="space-y-1">
              <li><a href="#how-it-works" className="hover:text-white">How It Works</a></li>
              <li><a href="#security" className="hover:text-white">Security & Governance</a></li>
              <li><Link href="/client" className="hover:text-white">Enterprise Tier</Link></li>
            </ul>
          </div>

          <div>
            <div className="font-bold text-white mb-2">Legal</div>
            <ul className="space-y-1">
              <li><span className="text-zinc-500">Privacy Policy</span></li>
              <li><span className="text-zinc-500">Terms of Service</span></li>
              <li><span className="text-zinc-500">Row Level Security</span></li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
}
