'use client';

import React, { useState } from 'react';
import { useAgent } from '@/context/AgentContext';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Integration } from '@/types';
import { 
  Calendar, 
  Mail, 
  MapPin, 
  Plane, 
  Database, 
  Sparkles, 
  CheckCircle2, 
  ShieldCheck,
  Info,
  Globe,
  Brain,
  Zap
} from 'lucide-react';

export default function IntegrationsPage() {
  const { integrations, toggleIntegration } = useAgent();

  // Filter to show only the 5 specified tools
  const allowedSlugs = ['gcalendar', 'gmail', 'gmaps', 'gemini', 'supabase'];
  const displayIntegrations = integrations.filter(i => allowedSlugs.includes(i.slug));

  const getCleanName = (slug: string, originalName: string) => {
    switch (slug) {
      case 'gcalendar': return 'Google Calendar';
      case 'gmail': return 'Gmail';
      case 'gmaps': return 'Google Maps';
      case 'gemini': return 'Gemini';
      case 'supabase': return 'Supabase';
      default: return originalName;
    }
  };

  const getIcon = (slug: string) => {
    switch (slug) {
      case 'gcalendar':
        return <Calendar className="w-5 h-5 text-[#A78BFA]" />;
      case 'gmail':
        return <Mail className="w-5 h-5 text-[#A78BFA]" />;
      case 'gmaps':
        return <MapPin className="w-5 h-5 text-[#A78BFA]" />;
      case 'supabase':
        return <Database className="w-5 h-5 text-[#A78BFA]" />;
      case 'gemini':
      default:
        return <Sparkles className="w-5 h-5 text-[#A78BFA]" />;
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-8 max-w-5xl mx-auto">
        {/* HEADER */}
        <div className="border-b border-[#E7E3EC] pb-8">
          <div className="text-[10px] font-mono uppercase tracking-widest font-semibold text-[#A78BFA] mb-2">
            TOOLS
          </div>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tighter text-[#17151C]">
            Integrations
          </h1>
          <p className="text-sm text-[#696572] mt-1">
            Connect the tools your agent uses.
          </p>
        </div>

        {/* INTEGRATIONS CARDS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayIntegrations.map(integ => {
            const isConnected = integ.status === 'connected';
            const name = getCleanName(integ.slug, integ.name);

            return (
              <Card key={integ.id} className="p-6 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="p-3 bg-[#FAF9FC] rounded border border-[#E7E3EC]">
                      {getIcon(integ.slug)}
                    </div>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-semibold uppercase tracking-wider border ${
                      isConnected
                        ? 'bg-[#FAF9FC] text-[#17151C] border-[#E7E3EC]'
                        : 'bg-[#FAF9FC] text-[#96919F] border-[#E7E3EC]'
                    }`}>
                      {isConnected ? 'Connected' : 'Not connected'}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-[#17151C] tracking-tight">{name}</h3>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#E7E3EC]">
                  <Button
                    variant={isConnected ? 'danger' : 'primary'}
                    size="sm"
                    className="w-full"
                    onClick={() => toggleIntegration(integ.slug)}
                  >
                    {isConnected ? 'Disconnect' : 'Connect'}
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </DashboardLayout>
  );
}

