import React from 'react';
import { StepStatus, TaskStatus } from '@/types';

interface BadgeProps {
  status: StepStatus | TaskStatus | string;
  size?: 'sm' | 'md' | 'lg';
  showPulse?: boolean;
}

export const Badge: React.FC<BadgeProps> = ({ status, size = 'md', showPulse = true }) => {
  const getColors = () => {
    switch (status) {
      case 'completed':
        return 'bg-[#FAF9FC] text-[#17151C] border-[#E7E3EC]';
      case 'running':
        return 'bg-[#DDD6FE]/30 text-[#6D5BA6] border-[#A78BFA]/40';
      case 'retrying':
        return 'bg-amber-500/10 text-amber-800 border-amber-500/30';
      case 'approval_required':
      case 'waiting':
        return 'bg-[#A78BFA] text-white border-[#6D5BA6] animate-pulse';
      case 'failed':
        return 'bg-rose-500/10 text-rose-800 border-rose-500/30';
      case 'pending':
      default:
        return 'bg-[#FAF9FC] text-[#696572] border-[#E7E3EC]';
    }
  };

  const getLabel = () => {
    switch (status) {
      case 'approval_required':
        return 'Approval Required';
      case 'running':
        return 'Executing';
      default:
        return status.charAt(0).toUpperCase() + status.slice(1);
    }
  };

  const sizeClasses = {
    sm: 'px-2 py-0.5 text-[10px] tracking-wider uppercase font-semibold',
    md: 'px-2.5 py-1 text-xs tracking-wider uppercase font-semibold',
    lg: 'px-3 py-1.5 text-xs tracking-widest uppercase font-semibold'
  };

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border ${getColors()} ${sizeClasses[size]}`}>
      {showPulse && status === 'running' && (
        <span className="relative flex h-1.5 w-1.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#A78BFA] opacity-75"></span>
          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#A78BFA]"></span>
        </span>
      )}
      {showPulse && status === 'completed' && (
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-600"></span>
      )}
      {getLabel()}
    </span>
  );
};

