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
        return 'bg-emerald-950/60 text-emerald-400 border-emerald-800/50';
      case 'running':
        return 'bg-nexa-darkred/40 text-red-300 border-nexa-crimson/60 shadow-red-glow';
      case 'retrying':
        return 'bg-amber-950/60 text-amber-400 border-amber-800/50';
      case 'approval_required':
      case 'waiting':
        return 'bg-red-950/80 text-red-200 border-red-600/80 animate-pulse';
      case 'failed':
        return 'bg-rose-950/60 text-rose-400 border-rose-800/50';
      case 'pending':
      default:
        return 'bg-zinc-900 text-zinc-400 border-zinc-800';
    }
  };

  const getLabel = () => {
    switch (status) {
      case 'approval_required':
        return 'Approval Required';
      case 'running':
        return 'Executing...';
      default:
        return status.charAt(0).toUpperCase() + status.slice(1);
    }
  };

  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-xs',
    lg: 'px-3 py-1.5 text-sm'
  };

  return (
    <span className={`inline-flex items-center gap-1.5 font-medium rounded-full border ${getColors()} ${sizeClasses[size]}`}>
      {showPulse && status === 'running' && (
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
        </span>
      )}
      {showPulse && status === 'completed' && (
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400"></span>
      )}
      {getLabel()}
    </span>
  );
};
