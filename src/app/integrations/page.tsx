'use client';

import React, { useState } from 'react';
import { useAgent } from '@/context/AgentContext';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Integration } from '@/types';
import { 
  Blocks, 
  Calendar, 
  Mail, 
  MapPin, 
  Plane, 
  Database, 
  Sparkles, 
  CheckCircle2, 
  XCircle, 
  AlertCircle,
  ExternalLink,
  ShieldCheck,
  Info,
  Globe,
  Brain
} from 'lucide-react';

export default function IntegrationsPage() {
  const { integrations, toggleIntegration } = useAgent();
  const [selectedInteg, setSelectedInteg] = useState<Integration | null>(null);

  const extraIntegrations = [
    {
      id: 'int_ext_1',
      name: 'Slack Workspace Connector',
      slug: 'slack',
      description: 'Post automated notifications to team channels upon workflow completion.',
      icon: Globe,
      status: 'Available' as const,
      category: 'communication',
      scopesRequired: ['channels:read', 'chat:write']
    },
    {
      id: 'int_ext_2',
      name: 'Notion Knowledge Base',
      slug: 'notion',
      description: 'Read & append research notes directly to company Notion databases.',
      icon: Brain,
      status: 'Coming Soon' as const,
      category: 'productivity',
      scopesRequired: ['read:content', 'write:content']
    }
  ];

  const getIcon = (slug: string) => {
    switch (slug) {
      case 'gcalendar':
        return <Calendar className="w-6 h-6 text-blue-400" />;
      case 'gmail':
        return <Mail className="w-6 h-6 text-red-400" />;
      case 'gmaps':
        return <MapPin className="w-6 h-6 text-emerald-400" />;
      case 'travel':
        return <Plane className="w-6 h-6 text-purple-400" />;
      case 'supabase':
        return <Database className="w-6 h-6 text-amber-400" />;
      case 'slack':
        return <Globe className="w-6 h-6 text-blue-400" />;
      case 'notion':
        return <Brain className="w-6 h-6 text-zinc-400" />;
      case 'gemini':
      default:
        return <Sparkles className="w-6 h-6 text-rose-400" />;
    }
  };

  const getStatusBadge = (status: string) => {
    if (status === 'connected') {
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-950 text-emerald-300 border border-emerald-800">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Connected
        </span>
      );
    }
    if (status === 'Available') {
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-950 text-blue-300 border border-blue-800">
          Available
        </span>
      );
    }
    if (status === 'Coming Soon') {
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-zinc-900 text-zinc-500 border border-zinc-800">
          Coming Soon
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-zinc-900 text-zinc-400 border border-zinc-800">
        Not Connected
      </span>
    );
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 max-w-7xl mx-auto">
        {/* HEADER */}
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
            <Blocks className="w-7 h-7 text-red-500" /> Pluggable Integrations & OAuth Scopes
          </h1>
          <p className="text-xs text-zinc-400 mt-1">
            Connect external APIs, govern permission scopes, and enable tools for autonomous agent execution.
          </p>
        </div>

        {/* INTEGRATIONS CARDS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {integrations.map(integ => (
            <Card key={integ.id} hoverEffect className="p-6 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="p-3 bg-zinc-950 rounded-xl border border-zinc-800">
                    {getIcon(integ.slug)}
                  </div>
                  {getStatusBadge(integ.status)}
                </div>

                <div>
                  <h3 className="text-lg font-bold text-white">{integ.name}</h3>
                  <p className="text-xs text-zinc-400 mt-1 leading-relaxed">{integ.description}</p>
                </div>

                <div className="text-[10px] text-zinc-500 font-mono">
                  Scopes Required: {integ.scopesRequired.join(', ')}
                </div>
              </div>

              <div className="pt-4 border-t border-zinc-800/80 flex items-center justify-between">
                <button
                  onClick={() => setSelectedInteg(integ)}
                  className="text-xs text-zinc-400 hover:text-white flex items-center gap-1 font-semibold"
                >
                  <Info className="w-3.5 h-3.5 text-zinc-500" /> View Scopes
                </button>

                <Button
                  variant={integ.status === 'connected' ? 'outline' : 'primary'}
                  size="sm"
                  onClick={() => toggleIntegration(integ.slug)}
                >
                  {integ.status === 'connected' ? 'Disconnect' : 'Connect API'}
                </Button>
              </div>
            </Card>
          ))}

          {/* Extra Integrations: Available / Coming Soon */}
          {extraIntegrations.map(integ => (
            <Card key={integ.id} className="p-6 flex flex-col justify-between space-y-4 opacity-80">
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="p-3 bg-zinc-950 rounded-xl border border-zinc-800">
                    {getIcon(integ.slug)}
                  </div>
                  {getStatusBadge(integ.status)}
                </div>

                <div>
                  <h3 className="text-lg font-bold text-white">{integ.name}</h3>
                  <p className="text-xs text-zinc-400 mt-1 leading-relaxed">{integ.description}</p>
                </div>

                <div className="text-[10px] text-zinc-500 font-mono">
                  Scopes: {integ.scopesRequired.join(', ')}
                </div>
              </div>

              <div className="pt-4 border-t border-zinc-800/80">
                <Button variant="secondary" size="sm" className="w-full" disabled>
                  {integ.status}
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* SCOPE DETAILS MODAL */}
        {selectedInteg && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
            <div className="bg-zinc-950 border border-zinc-800 rounded-2xl max-w-md w-full p-6 space-y-4 shadow-red-glow">
              <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  {getIcon(selectedInteg.slug)} {selectedInteg.name}
                </h3>
                <button onClick={() => setSelectedInteg(null)} className="text-zinc-500 hover:text-white">✕</button>
              </div>

              <div className="space-y-3 text-xs text-zinc-300">
                <p>{selectedInteg.description}</p>
                <div>
                  <strong className="text-zinc-400 block mb-1">Granted OAuth Scopes:</strong>
                  <ul className="space-y-1 font-mono text-[11px] bg-zinc-900 p-3 rounded-lg border border-zinc-800">
                    {selectedInteg.scopesRequired.map((s, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-emerald-400">
                        <ShieldCheck className="w-3.5 h-3.5" /> {s}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <Button onClick={() => setSelectedInteg(null)} className="w-full">Close Window</Button>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
