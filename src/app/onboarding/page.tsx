'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import confetti from 'canvas-confetti';
import { 
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
    <div className="min-h-screen bg-[#F5F4F0] text-[#111111] flex flex-col justify-between p-6 md:p-10 relative">
      {/* Header Progress Stepper */}
      <header className="max-w-3xl mx-auto w-full flex items-center justify-between py-4 relative z-10 border-b border-[#DAD8D2]">
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono tracking-widest text-[#830000] uppercase">ONBOARDING</span>
          <span className="font-serif font-medium text-xl text-[#111111]">NexaAgent</span>
        </div>

        <div className="flex items-center gap-3">
          {[1, 2, 3, 4].map(s => (
            <div
              key={s}
              className={`w-8 h-8 flex items-center justify-center text-xs font-mono transition-all ${
                s === step
                  ? 'bg-[#111111] text-white border border-[#111111]'
                  : s < step
                  ? 'bg-[#FAFAF7] text-[#830000] border border-[#DAD8D2]'
                  : 'bg-transparent text-[#777777] border border-[#DAD8D2]'
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
          <div className="bg-[#FFFFFF] border border-[#DAD8D2] p-8 md:p-10 space-y-6 shadow-sm text-center">
            <div className="text-[10px] font-mono tracking-widest uppercase text-[#830000]">01 / INITIALIZATION</div>
            
            <div className="space-y-3">
              <h1 className="text-3xl font-serif font-medium text-[#111111]">WELCOME TO NEXAAGENT</h1>
              <p className="text-sm text-[#555555] max-w-md mx-auto leading-relaxed">
                Your autonomous AI agent platform. Give high-level goals in natural language and let NexaAgent handle planning, tool selection, and execution.
              </p>
            </div>

            <div className="p-4 bg-[#FAFAF7] border border-[#DAD8D2] text-xs text-[#555555] text-left space-y-2">
              <div className="font-mono uppercase tracking-wider text-[#830000] flex items-center gap-1.5 text-[11px]">
                <CheckCircle2 className="w-4 h-4" /> Built for Enterprise Autonomy
              </div>
              <p>NexaAgent runs autonomous execution loops with Human-in-the-Loop approval for sensitive operations like email sending and bookings.</p>
            </div>

            <Button onClick={() => setStep(2)} variant="primary" size="lg" className="w-full" icon={<ArrowRight className="w-4 h-4" />}>
              Get Started
            </Button>
          </div>
        )}

        {/* STEP 2: GOAL PREFERENCES */}
        {step === 2 && (
          <div className="bg-[#FFFFFF] dark:bg-[#111116] border border-[#DAD8D2] dark:border-[#26242C] p-8 md:p-10 space-y-6 shadow-sm">
            <div>
              <span className="text-[10px] font-mono text-[#A78BFA] uppercase tracking-widest">Step 2 of 4</span>
              <h2 className="text-2xl font-serif font-medium text-[#17151C] dark:text-[#F5F3FF] mt-1">What do you want your agent to help with?</h2>
              <p className="text-xs text-[#696572] dark:text-[#A7A3B2] mt-1">Select one or more categories to customize your agent workspace.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {goalsList.map(g => {
                const Icon = g.icon;
                const isSelected = selectedGoals.includes(g.id);
                return (
                  <div
                    key={g.id}
                    onClick={() => toggleGoal(g.id)}
                    className={`p-4 border flex items-center justify-between cursor-pointer transition-all rounded-[10px] ${
                      isSelected
                        ? 'bg-[#A78BFA] text-[#17151C] border-[#A78BFA] font-semibold'
                        : 'bg-[#FAF9FC] dark:bg-[#08080A] border-[#E7E3EC] dark:border-[#26242C] text-[#696572] dark:text-[#A7A3B2] hover:border-[#A78BFA]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className={`w-4 h-4 ${isSelected ? 'text-[#17151C]' : 'text-[#A78BFA]'}`} />
                      <span className="text-xs font-mono uppercase tracking-wider">{g.label}</span>
                    </div>
                    {isSelected && <Check className="w-4 h-4 text-[#17151C]" />}
                  </div>
                );
              })}
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-[#E7E3EC] dark:border-[#26242C]">
              <Button variant="ghost" onClick={() => setStep(1)}>Back</Button>
              <Button variant="primary" onClick={() => setStep(3)} icon={<ArrowRight className="w-4 h-4" />}>
                Continue to Integrations
              </Button>
            </div>
          </div>
        )}

        {/* STEP 3: CONNECT INTEGRATIONS */}
        {step === 3 && (
          <div className="bg-[#FFFFFF] dark:bg-[#111116] border border-[#DAD8D2] dark:border-[#26242C] p-8 md:p-10 space-y-6 shadow-sm">
            <div>
              <span className="text-[10px] font-mono text-[#A78BFA] uppercase tracking-widest">Step 3 of 4</span>
              <h2 className="text-2xl font-serif font-medium text-[#17151C] dark:text-[#F5F3FF] mt-1">Connect Integrations</h2>
              <p className="text-xs text-[#696572] dark:text-[#A7A3B2] mt-1">Enable agent tools for calendar sync, email drafting, and location search.</p>
            </div>

            <div className="space-y-3">
              {integrationsList.map(integ => {
                const Icon = integ.icon;
                const isConnected = connectedIntegrations.includes(integ.id);
                return (
                  <div key={integ.id} className="p-4 bg-[#FAF9FC] dark:bg-[#08080A] border border-[#E7E3EC] dark:border-[#26242C] flex items-center justify-between rounded-[10px]">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 bg-[#FFFFFF] dark:bg-[#111116] border border-[#E7E3EC] dark:border-[#26242C] text-[#A78BFA]">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-mono uppercase tracking-wider text-[#17151C] dark:text-[#F5F3FF] font-semibold">{integ.name}</div>
                        <div className="text-xs text-[#696572] dark:text-[#A7A3B2]">{integ.description}</div>
                      </div>
                    </div>

                    <Button
                      variant={isConnected ? "primary" : "secondary"}
                      size="sm"
                      onClick={() => toggleIntegration(integ.id)}
                    >
                      {isConnected ? 'Connected' : 'Connect'}
                    </Button>
                  </div>
                );
              })}
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-[#E7E3EC] dark:border-[#26242C]">
              <Button variant="ghost" onClick={() => setStep(2)}>Back</Button>
              <Button variant="primary" onClick={() => setStep(4)} icon={<ArrowRight className="w-4 h-4" />}>
                Proceed to Completion
              </Button>
            </div>
          </div>
        )}

        {/* STEP 4: READY & LAUNCH */}
        {step === 4 && (
          <div className="bg-[#FFFFFF] dark:bg-[#111116] border border-[#DAD8D2] dark:border-[#26242C] p-8 md:p-10 space-y-6 shadow-sm text-center">
            <div className="w-16 h-16 bg-[#FAF9FC] dark:bg-[#08080A] border border-[#E7E3EC] dark:border-[#26242C] text-[#A78BFA] flex items-center justify-center mx-auto rounded-full">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <div className="text-[10px] font-mono tracking-widest uppercase text-[#A78BFA]">04 / READY</div>
              <h2 className="text-3xl font-serif font-medium text-[#17151C] dark:text-[#F5F3FF]">YOU ARE READY</h2>
              <p className="text-xs text-[#696572] dark:text-[#A7A3B2] max-w-md mx-auto">
                Your NexaAgent command center is fully configured and ready to execute your goals.
              </p>
            </div>

            <div className="p-4 bg-[#FAF9FC] dark:bg-[#08080A] border border-[#E7E3EC] dark:border-[#26242C] text-xs text-[#696572] dark:text-[#A7A3B2] space-y-1 text-left rounded-[10px]">
              <div className="font-mono uppercase tracking-wider text-[#17151C] dark:text-[#F5F3FF] text-[10px]">Sample First Goal to try:</div>
              <div className="text-[#A78BFA] font-mono italic">"Plan my Chennai trip under ₹15,000"</div>
            </div>

            <Button variant="primary" onClick={handleFinish} size="lg" className="w-full">
              Launch NexaAgent
            </Button>
          </div>
        )}
      </main>

      <footer className="text-center text-xs text-[#777777] font-mono py-4 relative z-10 border-t border-[#DAD8D2]">
        NexaAgent Setup Assistant • Step {step} of 4
      </footer>
    </div>
  );
}

