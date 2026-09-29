'use client';

import React from 'react';
import { useAgent } from '@/context/AgentContext';
import { Button } from '@/components/ui/Button';
import { ShieldAlert, CheckCircle2, XCircle, DollarSign, Cpu, AlertTriangle } from 'lucide-react';

export const HumanApprovalModal: React.FC = () => {
  const { pendingApproval, approveAction, rejectAction, isExecuting } = useAgent();

  if (!pendingApproval) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in duration-200">
      <div className="bg-zinc-950 border border-red-600/70 rounded-2xl max-w-lg w-full p-6 shadow-red-glow-lg text-white space-y-5 relative overflow-hidden">
        {/* Glow Header Accent */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-600 via-rose-500 to-red-600 animate-pulse"></div>

        <div className="flex items-start gap-4">
          <div className="p-3 bg-red-950/80 rounded-xl border border-red-600/60 text-red-400 shrink-0 shadow-red-glow">
            <ShieldAlert className="w-7 h-7" />
          </div>
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-red-950 text-red-300 border border-red-800 uppercase tracking-wider mb-1">
              Human In The Loop Approval
            </div>
            <h3 className="text-xl font-bold tracking-tight text-white">Agent Requesting Approval</h3>
            <p className="text-xs text-zinc-400 mt-1">
              Autonomous execution paused. Require explicit authorization before executing sensitive action.
            </p>
          </div>
        </div>

        {/* Action Details Box */}
        <div className="bg-zinc-900/90 border border-zinc-800 rounded-xl p-4 space-y-3">
          <div>
            <div className="text-xs text-zinc-500 uppercase tracking-wider font-semibold">Requested Action</div>
            <div className="text-base font-semibold text-red-300 mt-0.5">{pendingApproval.action}</div>
          </div>

          <div>
            <div className="text-xs text-zinc-500 uppercase tracking-wider font-semibold">Reason & Purpose</div>
            <div className="text-sm text-zinc-300 mt-0.5">{pendingApproval.reason}</div>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-2 border-t border-zinc-800/80">
            <div className="flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-emerald-400 shrink-0" />
              <div>
                <div className="text-[10px] text-zinc-500 font-medium">Estimated Cost</div>
                <div className="text-xs font-semibold text-emerald-400">{pendingApproval.estimatedCost || 'Free ($0.00)'}</div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Cpu className="w-4 h-4 text-blue-400 shrink-0" />
              <div>
                <div className="text-[10px] text-zinc-500 font-medium">Affected Service</div>
                <div className="text-xs font-semibold text-zinc-200">{pendingApproval.affectedService}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Safety Warning */}
        <div className="flex items-center gap-2 text-xs text-amber-400/90 bg-amber-950/40 border border-amber-800/40 px-3 py-2 rounded-lg">
          <AlertTriangle className="w-4 h-4 shrink-0" />
          <span>Approving this action will instruct NexaAgent to proceed with live external execution.</span>
        </div>

        {/* Actions Buttons */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <Button
            variant="secondary"
            onClick={() => rejectAction(pendingApproval.id)}
            disabled={isExecuting}
            icon={<XCircle className="w-4 h-4" />}
          >
            Reject Action
          </Button>

          <Button
            variant="primary"
            onClick={() => approveAction(pendingApproval.id)}
            isLoading={isExecuting}
            icon={<CheckCircle2 className="w-4 h-4" />}
          >
            Approve & Continue
          </Button>
        </div>
      </div>
    </div>
  );
};
