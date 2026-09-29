export type UserRole = 'user' | 'client_admin';

export type AccountType = 'personal' | 'organization';

export interface UserProfile {
  id: string;
  email: string;
  fullName: string;
  avatarUrl?: string;
  role: UserRole;
  accountType: AccountType;
  organizationId?: string;
  organizationName?: string;
  createdAt: string;
  emailVerified: boolean;
}

export interface Organization {
  id: string;
  name: string;
  slug: string;
  ownerId: string;
  memberCount: number;
  plan: 'starter' | 'pro' | 'enterprise';
  createdAt: string;
}

export interface OrganizationMember {
  id: string;
  organizationId: string;
  userId: string;
  fullName: string;
  email: string;
  role: UserRole;
  status: 'active' | 'invited' | 'disabled';
  lastActive: string;
}

export type TaskStatus = 'pending' | 'running' | 'completed' | 'failed' | 'waiting' | 'cancelled' | 'approval_required';

export type StepStatus = 'pending' | 'running' | 'completed' | 'failed' | 'retrying' | 'waiting';

export interface ExecutionNode {
  id: string;
  label: string;
  status: StepStatus;
  tool?: string;
  output?: Record<string, any> | string;
  durationMs?: number;
  requiresApproval?: boolean;
  approvalDetails?: HumanApprovalRequest;
  description?: string;
}

export interface Task {
  id: string;
  title: string;
  originalGoal: string;
  userId: string;
  userName?: string;
  organizationId?: string;
  status: TaskStatus;
  createdAt: string;
  completedAt?: string;
  durationMs?: number;
  agentModel: string;
  toolsUsed: string[];
  nodes: ExecutionNode[];
  finalResult?: string;
  budgetLimit?: number;
  currency?: string;
}

export interface ActivityLogEvent {
  id: string;
  taskId: string;
  timestamp: string;
  timeFormatted: string;
  type: 'info' | 'tool_call' | 'decision' | 'success' | 'warning' | 'error' | 'approval';
  message: string;
  toolName?: string;
  data?: any;
}

export interface HumanApprovalRequest {
  id: string;
  taskId: string;
  stepId: string;
  action: string;
  reason: string;
  estimatedCost?: string;
  affectedService: string;
  params: Record<string, any>;
  status: 'pending' | 'approved' | 'rejected';
  requestedAt: string;
}

export interface Integration {
  id: string;
  name: string;
  slug: 'gcalendar' | 'gmail' | 'gmaps' | 'travel' | 'supabase' | 'gemini';
  description: string;
  icon: string;
  status: 'connected' | 'not_connected' | 'error';
  lastSync?: string;
  category: 'productivity' | 'communication' | 'location' | 'travel' | 'core';
  scopesRequired: string[];
}

export interface WorkflowNode {
  id: string;
  type: 'trigger' | 'agent' | 'tool' | 'condition' | 'action' | 'approval' | 'end';
  title: string;
  config: Record<string, any>;
  position: { x: number; y: number };
}

export interface WorkflowConnection {
  id: string;
  fromNodeId: string;
  toNodeId: string;
  label?: string;
}

export interface Workflow {
  id: string;
  name: string;
  description: string;
  triggerType: 'schedule' | 'manual' | 'webhook';
  triggerDetails: string;
  nodes: WorkflowNode[];
  connections: WorkflowConnection[];
  isActive: boolean;
  lastRun?: string;
  createdAt: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: 'task_complete' | 'approval_required' | 'integration_alert' | 'system';
  read: boolean;
  createdAt: string;
  actionUrl?: string;
}

export interface AnalyticsSummary {
  totalTasks: number;
  activeAgents: number;
  completedTasks: number;
  failedTasks: number;
  successRate: number;
  totalToolCalls: number;
  apiUsageTokens: number;
  teamMembersCount: number;
}
