'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import confetti from 'canvas-confetti';
import { 
  Sparkles, 
  ArrowRight, 
  Check, 
  Calendar, 
  Mail, 
  MapPin, 
  Plane, 
  CheckCircle2,
  BrainCircuit,
  Search,
  Zap,
  CheckSquare
} from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState<number>(1);
  const [selectedGoals, setSelectedGoals] = useState<string[]>(['Scheduling', 'Travel planning']);
  const [connectedIntegrations, setConnectedIntegrations] = useState<string[]>(['gcalendar', 'gmail']);

  const goalsList = [
    { id: 'Scheduling', label: 'Scheduling & Meetings', icon: Calendar },
    { id: 'Email', label: 'Email Automation', icon: Mail },
    { id: 'Travel planning', label: 'Travel & Trip Planning', icon: Plane },
    { id: 'Research', label: 'Deep Research & Synthesis', icon: Search },
    { id: 'Productivity', label: 'Personal Productivity', icon: Zap },
    { id: 'Business tasks', label: 'Enterprise Business Tasks', icon: BrainCircuit },
    { id: 'Custom workflows', label: 'Custom Node Workflows', icon: CheckSquare }
  ];

  const integrationsList = [
    { id: 'gcalendar', name: 'Google Calendar', description: 'Schedule inspection & meeting creation', icon: Calendar },
    { id: 'gmail', name: 'Gmail API', description: 'Inbox scanning & draft preparation', icon: Mail },
    { id: 'gmaps', name: 'Google Maps', description: 'Places, ratings & directions', icon: MapPin },
    { id: 'travel', name: 'Travel & Booking API', description: 'Trains, flights & hotel rates', icon: Plane }
  ];

  const toggleGoal = (id: string) => {
    setSelectedGoals(prev => 
      prev.includes(id) ? prev.filter(g => g !== id) : [...prev, id]
    );
  };

  const toggleIntegration = (id: string) => {
    setConnectedIntegrations(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const handleFinish = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
    setTimeout(() => {
      router.push('/dashboard');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col justify-between p-6 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-red-600/10 rounded-full blur-[120px] pointer-events-none"></div>

      {/* Header Progress Stepper */}
      <header className="max-w-3xl mx-auto w-full flex items-center justify-between py-4 relative z-10">
        <div className="flex items-center gap-2">
          <Sparkles className="w-6 h-6 text-red-500" />
          <span className="font-extrabold text-xl">NexaAgent</span>
        </div>

        <div className="flex items-center gap-3">
          {[1, 2, 3, 4].map(s => (
            <div
              key={s}
              className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                s === step
                  ? 'bg-red-gradient text-white shadow-red-glow scale-110'
                  : s < step
                  ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                  : 'bg-zinc-900 text-zinc-600 border border-zinc-800'
              }`}
            >
              {s < step ? <Check className="w-4 h-4" /> : s}
            </div>
          ))}
        </div>
      </header>

      {/* Main Step Content */}
      <main className="max-w-2xl mx-auto w-full my-auto py-8 relative z-10 space-y-6">
        {/* STEP 1: WELCOME */}
        {step === 1 && (
          <div className="bg-zinc-950/90 border border-zinc-800 rounded-2xl p-8 space-y-6 shadow-red-glow text-center">
            <div className="w-16 h-16 rounded-2xl bg-red-gradient p-0.5 mx-auto shadow-red-glow">
              <div className="w-full h-full bg-zinc-950 rounded-[14px] flex items-center justify-center">
                <Sparkles className="w-8 h-8 text-red-500" />
              </div>
            </div>

            <div className="space-y-2">
              <h1 className="text-3xl font-extrabold text-white">Welcome to NexaAgent</h1>
              <p className="text-sm text-zinc-400 max-w-md mx-auto">
                Your autonomous AI agent platform. Give high-level goals in natural language and let NexaAgent handle planning, tool selection, and execution.
              </p>
            </div>

            <div className="p-4 bg-zinc-900/80 border border-zinc-800 rounded-xl text-xs text-zinc-300 text-left space-y-2">
              <div className="font-semibold text-red-400 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" /> Built for Enterprise Autonomy
              </div>
              <p>NexaAgent runs autonomous execution loops with Human-in-the-Loop approval for sensitive operations like email sending and bookings.</p>
            </div>

            <Button onClick={() => setStep(2)} size="lg" className="w-full font-semibold" icon={<ArrowRight className="w-5 h-5" />}>
              Get Started
            </Button>
          </div>
        )}

        {/* STEP 2: GOAL PREFERENCES */}
        {step === 2 && (
          <div className="bg-zinc-950/90 border border-zinc-800 rounded-2xl p-8 space-y-6 shadow-red-glow">
            <div>
              <span className="text-xs font-mono text-red-400 uppercase tracking-widest">Step 2 of 4</span>
              <h2 className="text-2xl font-bold text-white mt-1">What do you want your agent to help with?</h2>
              <p className="text-xs text-zinc-400 mt-1">Select one or more categories to customize your agent workspace.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {goalsList.map(g => {
                const Icon = g.icon;
                const isSelected = selectedGoals.includes(g.id);
                return (
                  <div
                    key={g.id}
                    onClick={() => toggleGoal(g.id)}
                    className={`p-3.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-red-950/40 border-red-600 text-white shadow-red-glow'
                        : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className={`w-5 h-5 ${isSelected ? 'text-red-400' : 'text-zinc-500'}`} />
                      <span className="text-xs font-semibold text-white">{g.label}</span>
                    </div>
                    {isSelected && <Check className="w-4 h-4 text-red-400" />}
                  </div>
                );
              })}
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-zinc-800">
              <Button variant="ghost" onClick={() => setStep(1)}>Back</Button>
              <Button onClick={() => setStep(3)} icon={<ArrowRight className="w-4 h-4" />}>
                Continue to Integrations
              </Button>
            </div>
          </div>
        )}

        {/* STEP 3: CONNECT INTEGRATIONS */}
        {step === 3 && (
          <div className="bg-zinc-950/90 border border-zinc-800 rounded-2xl p-8 space-y-6 shadow-red-glow">
            <div>
              <span className="text-xs font-mono text-red-400 uppercase tracking-widest">Step 3 of 4</span>
              <h2 className="text-2xl font-bold text-white mt-1">Connect Integrations</h2>
              <p className="text-xs text-zinc-400 mt-1">Enable agent tools for calendar sync, email drafting, and location search.</p>
            </div>

            <div className="space-y-3">
              {integrationsList.map(integ => {
                const Icon = integ.icon;
                const isConnected = connectedIntegrations.includes(integ.id);
                return (
                  <div key={integ.id} className="p-4 bg-zinc-900 border border-zinc-800 rounded-xl flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 bg-zinc-950 rounded-lg border border-zinc-800 text-red-400">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-white">{integ.name}</div>
                        <div className="text-xs text-zinc-400">{integ.description}</div>
                      </div>
                    </div>

                    <button
                      onClick={() => toggleIntegration(integ.id)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                        isConnected
                          ? 'bg-emerald-950 text-emerald-300 border-emerald-800'
                          : 'bg-zinc-800 text-zinc-300 border-zinc-700 hover:bg-zinc-700'
                      }`}
                    >
                      {isConnected ? 'Connected' : 'Connect'}
                    </button>
                  </div>
                );
              })}
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-zinc-800">
              <Button variant="ghost" onClick={() => setStep(2)}>Back</Button>
              <Button onClick={() => setStep(4)} icon={<ArrowRight className="w-4 h-4" />}>
                Proceed to Completion
              </Button>
            </div>
          </div>
        )}

        {/* STEP 4: READY & LAUNCH */}
        {step === 4 && (
          <div className="bg-zinc-950/90 border border-zinc-800 rounded-2xl p-8 space-y-6 shadow-red-glow text-center">
            <div className="w-16 h-16 rounded-full bg-emerald-950 border border-emerald-700 text-emerald-400 flex items-center justify-center mx-auto shadow-emerald- glow">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h2 className="text-3xl font-extrabold text-white">You're ready.</h2>
              <p className="text-sm text-zinc-400 max-w-md mx-auto">
                Your NexaAgent command center is fully configured and ready to execute your goals.
              </p>
            </div>

            <div className="p-4 bg-zinc-900 border border-zinc-800 rounded-xl text-xs text-zinc-300 space-y-1 text-left">
              <div className="font-semibold text-white">Sample First Goal to try:</div>
              <div className="text-red-400 font-mono italic">"Plan my Chennai trip under ₹15,000"</div>
            </div>

            <Button onClick={handleFinish} size="lg" className="w-full font-bold text-base" icon={<Sparkles className="w-5 h-5" />}>
              Launch NexaAgent
            </Button>
          </div>
        )}
      </main>

      <footer className="text-center text-xs text-zinc-600 py-4 relative z-10">
        NexaAgent Setup Assistant • Step {step} of 4
      </footer>
    </div>
  );
}
