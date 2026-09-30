'use client';

import React from 'react';
import { useAgent } from '@/context/AgentContext';
import { Button } from '@/components/ui/Button';
import { ShieldAlert, CheckCircle2, XCircle, DollarSign, Cpu, AlertTriangle } from 'lucide-react';

export const HumanApprovalModal: React.FC = () => {
  const { pendingApproval, approveAction, rejectAction, isExecuting } = useAgent();

  if (!pendingApproval) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-[#FFFFFF] dark:bg-[#1F1E1B] border border-[#830000] dark:border-[#BC0202] rounded-lg max-w-lg w-full p-6 shadow-editorial text-[#111111] dark:text-[#EAE8E3] space-y-5 relative overflow-hidden">
        {/* Top Hairline Accent */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-[#830000]"></div>

        <div className="flex items-start gap-4">
          <div className="p-3 bg-[#FAFAF7] dark:bg-[#181715] rounded border border-[#DAD8D2] dark:border-[#2D2B27] text-[#830000] shrink-0">
            <ShieldAlert className="w-6 h-6 text-[#830000]" />
          </div>
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded text-[10px] font-mono font-semibold uppercase tracking-widest bg-[#F5F4F0] dark:bg-[#121210] text-[#830000] dark:text-[#FF2A2A] border border-[#830000]/30 mb-1">
              HUMAN IN THE LOOP AUTHORIZATION
            </div>
            <h3 className="text-lg font-semibold tracking-tight text-[#111111] dark:text-[#EAE8E3]">Agent Authorization Required</h3>
            <p className="text-xs text-[#555555] dark:text-[#A8A6A0] mt-1">
              Autonomous loop paused. Requires explicit authorization before dispatching sensitive action.
            </p>
          </div>
        </div>

        {/* Action Details Box */}
        <div className="bg-[#FAFAF7] dark:bg-[#181715] border border-[#DAD8D2] dark:border-[#2D2B27] rounded p-4 space-y-3">
          <div>
            <div className="text-[10px] font-mono text-[#777777] uppercase tracking-widest font-semibold">Requested Action</div>
            <div className="text-sm font-semibold text-[#830000] dark:text-[#FF2A2A] mt-0.5">{pendingApproval.action}</div>
          </div>

          <div>
            <div className="text-[10px] font-mono text-[#777777] uppercase tracking-widest font-semibold">Reason & Purpose</div>
            <div className="text-xs text-[#111111] dark:text-[#EAE8E3] mt-0.5 leading-relaxed">{pendingApproval.reason}</div>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-3 border-t border-[#DAD8D2] dark:border-[#2D2B27]">
            <div className="flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <div>
                <div className="text-[10px] text-[#777777] font-mono uppercase">ESTIMATED COST</div>
                <div className="text-xs font-semibold text-emerald-800 dark:text-emerald-400">{pendingApproval.estimatedCost || 'Free ($0.00)'}</div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Cpu className="w-4 h-4 text-[#830000] dark:text-[#FF2A2A] shrink-0" />
              <div>
                <div className="text-[10px] text-[#777777] font-mono uppercase">TARGET SERVICE</div>
                <div className="text-xs font-semibold text-[#111111] dark:text-[#EAE8E3]">{pendingApproval.affectedService}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Safety Warning */}
        <div className="flex items-center gap-2 text-xs text-[#555555] dark:text-[#A8A6A0] bg-[#FAFAF7] dark:bg-[#181715] border border-[#DAD8D2] dark:border-[#2D2B27] px-3.5 py-2.5 rounded">
          <AlertTriangle className="w-4 h-4 text-[#830000] shrink-0" />
          <span>Authorizing will instruct NexaAgent to execute this live action immediately.</span>
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
            Authorize & Execute
          </Button>
        </div>
      </div>
    </div>
  );
};

