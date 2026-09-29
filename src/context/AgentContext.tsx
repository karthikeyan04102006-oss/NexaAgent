'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Task, ExecutionNode, ActivityLogEvent, HumanApprovalRequest, Integration, Workflow, NotificationItem } from '@/types';
import { decomposeGoalWithGemini } from '@/lib/gemini';
import { toolRegistry } from '@/lib/tools';
import { useAuth } from '@/context/AuthContext';

interface AgentContextType {
  tasks: Task[];
  activeTask: Task | null;
  activityLogs: ActivityLogEvent[];
  pendingApproval: HumanApprovalRequest | null;
  integrations: Integration[];
  workflows: Workflow[];
  notifications: NotificationItem[];
  isExecuting: boolean;
  
  // Actions
  runGoal: (goal: string) => Promise<Task>;
  approveAction: (approvalId: string) => Promise<void>;
  rejectAction: (approvalId: string) => Promise<void>;
  retryTask: (taskId: string) => Promise<void>;
  deleteTask: (taskId: string) => void;
  toggleIntegration: (slug: string) => void;
  toggleWorkflow: (id: string) => void;
  markNotificationAsRead: (id: string) => void;
  setActiveTaskById: (taskId: string) => void;
  createWorkflow: (workflow: Partial<Workflow>) => void;
}

const AgentContext = createContext<AgentContextType | undefined>(undefined);

const DEFAULT_INTEGRATIONS: Integration[] = [
  {
    id: 'int_1',
    name: 'Google Calendar',
    slug: 'gcalendar',
    description: 'Schedule inspection, slot availability check, and meeting creation.',
    icon: 'Calendar',
    status: 'connected',
    lastSync: '10 minutes ago',
    category: 'productivity',
    scopesRequired: ['calendar.events', 'calendar.readonly']
  },
  {
    id: 'int_2',
    name: 'Gmail API',
    slug: 'gmail',
    description: 'Read inbox updates, prepare email drafts, and request approval before sending external messages.',
    icon: 'Mail',
    status: 'connected',
    lastSync: '25 minutes ago',
    category: 'communication',
    scopesRequired: ['gmail.compose', 'gmail.readonly']
  },
  {
    id: 'int_3',
    name: 'Google Maps & Places',
    slug: 'gmaps',
    description: 'Geocoding, hotel ratings lookup, commute calculations, and place reviews.',
    icon: 'MapPin',
    status: 'connected',
    lastSync: '1 hour ago',
    category: 'location',
    scopesRequired: ['places', 'directions']
  },
  {
    id: 'int_4',
    name: 'Travel & Booking API',
    slug: 'travel',
    description: 'Intercity train schedules, flight comparison engine, and hotel reservation connector.',
    icon: 'Plane',
    status: 'connected',
    lastSync: 'Just now',
    category: 'travel',
    scopesRequired: ['travel.search', 'travel.book']
  },
  {
    id: 'int_5',
    name: 'Gemini 1.5 Pro',
    slug: 'gemini',
    description: 'Primary AI orchestration engine for goal understanding and sub-task planning.',
    icon: 'Sparkles',
    status: 'connected',
    lastSync: 'Active',
    category: 'core',
    scopesRequired: ['generative-ai.execute']
  },
  {
    id: 'int_6',
    name: 'Supabase Database',
    slug: 'supabase',
    description: 'PostgreSQL cloud database for state persistence and Row Level Security.',
    icon: 'Database',
    status: 'connected',
    lastSync: 'Realtime',
    category: 'core',
    scopesRequired: ['postgres.read_write']
  }
];

export const AgentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();

  const [tasks, setTasks] = useState<Task[]>([]);
  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const [activityLogs, setActivityLogs] = useState<ActivityLogEvent[]>([]);
  const [pendingApproval, setPendingApproval] = useState<HumanApprovalRequest | null>(null);
  const [integrations, setIntegrations] = useState<Integration[]>(DEFAULT_INTEGRATIONS);
  const [workflows, setWorkflows] = useState<Workflow[]>([]);
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [isExecuting, setIsExecuting] = useState<boolean>(false);

  // Read saved user tasks & state from local storage or Supabase
  useEffect(() => {
    const savedTasks = localStorage.getItem('nexa_user_tasks');
    if (savedTasks) {
      try {
        const parsed = JSON.parse(savedTasks);
        setTasks(parsed);
        if (parsed.length > 0) setActiveTask(parsed[0]);
      } catch (e) {
        setTasks([]);
      }
    }

    const savedWorkflows = localStorage.getItem('nexa_user_workflows');
    if (savedWorkflows) {
      try {
        setWorkflows(JSON.parse(savedWorkflows));
      } catch (e) {
        setWorkflows([]);
      }
    }
  }, []);

  // Sync tasks to local storage
  const saveTasksState = (newTasks: Task[]) => {
    setTasks(newTasks);
    localStorage.setItem('nexa_user_tasks', JSON.stringify(newTasks));
  };

  const addLog = (taskId: string, type: ActivityLogEvent['type'], message: string, toolName?: string, data?: any) => {
    const now = new Date();
    const timeFormatted = now.toTimeString().split(' ')[0];
    const newLog: ActivityLogEvent = {
      id: `log_${Math.random().toString(36).substring(2, 9)}`,
      taskId,
      timestamp: now.toISOString(),
      timeFormatted,
      type,
      message,
      toolName,
      data
    };
    setActivityLogs(prev => [newLog, ...prev]);
  };

  const runGoal = async (goal: string): Promise<Task> => {
    setIsExecuting(true);
    const taskId = `task_${Math.random().toString(36).substring(2, 9)}`;
    
    // Step 1: Goal Understanding & Decomposition
    const decomp = await decomposeGoalWithGemini(goal);
    
    const initialNodes: ExecutionNode[] = decomp.steps.map(s => ({
      id: s.id,
      label: s.label,
      status: 'pending',
      tool: s.tool,
      description: s.description,
      requiresApproval: s.requiresApproval
    }));

    const newTask: Task = {
      id: taskId,
      title: decomp.title,
      originalGoal: goal,
      userId: user?.id || 'usr_current',
      userName: user?.fullName || 'Authenticated User',
      organizationId: user?.organizationId,
      status: 'running',
      createdAt: new Date().toISOString(),
      agentModel: 'Gemini 1.5 Pro',
      toolsUsed: Array.from(new Set(decomp.steps.map(s => s.tool))),
      nodes: initialNodes
    };

    saveTasksState([newTask, ...tasks]);
    setActiveTask(newTask);

    addLog(taskId, 'info', `✓ Goal understood: "${goal}"`);
    addLog(taskId, 'decision', `✓ Execution plan created with ${initialNodes.length} steps.`);

    let currentNodes = [...initialNodes];

    for (let i = 0; i < currentNodes.length; i++) {
      const node = currentNodes[i];

      // Check if required tool is connected
      const toolInteg = integrations.find(item => item.slug === node.tool);
      if (toolInteg && toolInteg.status !== 'connected') {
        addLog(taskId, 'warning', `⚠️ Integration "${toolInteg.name}" is not connected. Please connect it in Integrations settings.`, node.tool);
        currentNodes = currentNodes.map((n, idx) => idx === i ? { ...n, status: 'failed', output: `${toolInteg.name} is not connected.` } : n);
        
        const failedTask: Task = {
          ...newTask,
          status: 'failed',
          nodes: currentNodes,
          finalResult: `Task paused: ${toolInteg.name} is not connected.`
        };
        saveTasksState(tasks.map(t => t.id === taskId ? failedTask : t));
        setActiveTask(failedTask);
        setIsExecuting(false);
        return failedTask;
      }
      
      // Update Node to Running
      currentNodes = currentNodes.map((n, idx) => idx === i ? { ...n, status: 'running' } : n);
      setTasks(prev => prev.map(t => t.id === taskId ? { ...t, nodes: [...currentNodes] } : t));
      setActiveTask(prev => prev ? { ...prev, nodes: [...currentNodes] } : null);

      addLog(taskId, 'tool_call', `⚙ Executing step ${i+1}/${currentNodes.length}: ${node.label}`, node.tool);
      
      await new Promise(r => setTimeout(r, 1200));

      // Check for human approval requirement
      if (node.requiresApproval) {
        const approvalReq: HumanApprovalRequest = {
          id: `appr_${Math.random().toString(36).substring(2, 9)}`,
          taskId,
          stepId: node.id,
          action: node.label,
          reason: `Agent requires explicit authorization before executing: ${node.description}`,
          estimatedCost: node.tool === 'travel' ? '₹3,900.00' : 'Free ($0.00)',
          affectedService: node.tool === 'gmail' ? 'Gmail API' : node.tool === 'travel' ? 'Travel Gateway' : 'Connected API',
          params: { stepId: node.id, tool: node.tool },
          status: 'pending',
          requestedAt: new Date().toISOString()
        };

        setPendingApproval(approvalReq);
        
        currentNodes = currentNodes.map((n, idx) => idx === i ? { ...n, status: 'waiting', approvalDetails: approvalReq } : n);
        const waitingTask: Task = { ...newTask, status: 'approval_required', nodes: currentNodes };
        saveTasksState(tasks.map(t => t.id === taskId ? waitingTask : t));
        setActiveTask(waitingTask);

        addLog(taskId, 'approval', `⚠️ Authorization required for: ${approvalReq.action}`);
        
        setIsExecuting(false);
        return waitingTask;
      }

      // Execute Tool
      const toolResult = await toolRegistry.executeTool(node.tool || 'supabase', {
        action: 'execute',
        goal: goal,
        step: node.label
      });

      currentNodes = currentNodes.map((n, idx) => idx === i ? { 
        ...n, 
        status: 'completed', 
        output: toolResult.data || toolResult.message,
        durationMs: 1200
      } : n);

      setTasks(prev => prev.map(t => t.id === taskId ? { ...t, nodes: [...currentNodes] } : t));
      setActiveTask(prev => prev ? { ...prev, nodes: [...currentNodes] } : null);

      addLog(taskId, 'success', `✓ ${node.label} completed: ${toolResult.message}`, node.tool);
    }

    const completedTask: Task = {
      ...newTask,
      status: 'completed',
      completedAt: new Date().toISOString(),
      durationMs: currentNodes.length * 1400,
      finalResult: `Goal completed! Agent executed all ${currentNodes.length} steps successfully.`,
      nodes: currentNodes
    };

    saveTasksState(tasks.map(t => t.id === taskId ? completedTask : t));
    setActiveTask(completedTask);
    addLog(taskId, 'success', `🎉 Task "${newTask.title}" completed successfully.`);

    setIsExecuting(false);
    return completedTask;
  };

  const approveAction = async (approvalId: string) => {
    if (!pendingApproval) return;
    setIsExecuting(true);
    
    const taskId = pendingApproval.taskId;
    const stepId = pendingApproval.stepId;

    addLog(taskId, 'success', `✅ User APPROVED action: ${pendingApproval.action}`);
    setPendingApproval(null);

    const targetTask = tasks.find(t => t.id === taskId);
    if (!targetTask) return;

    let updatedNodes = targetTask.nodes.map(n => {
      if (n.id === stepId) {
        return { ...n, status: 'completed' as const, output: 'Action authorized by user.' };
      }
      return n;
    });

    for (let i = 0; i < updatedNodes.length; i++) {
      if (updatedNodes[i].status === 'pending') {
        updatedNodes[i] = { ...updatedNodes[i], status: 'running' };
        setTasks(prev => prev.map(t => t.id === taskId ? { ...t, nodes: [...updatedNodes] } : t));
        await new Promise(r => setTimeout(r, 1000));
        updatedNodes[i] = { ...updatedNodes[i], status: 'completed', output: 'Action verified.' };
      }
    }

    const finalCompletedTask: Task = {
      ...targetTask,
      status: 'completed',
      completedAt: new Date().toISOString(),
      finalResult: `Goal completed following user authorization.`,
      nodes: updatedNodes
    };

    saveTasksState(tasks.map(t => t.id === taskId ? finalCompletedTask : t));
    setActiveTask(finalCompletedTask);
    setIsExecuting(false);
  };

  const rejectAction = async (approvalId: string) => {
    if (!pendingApproval) return;
    const taskId = pendingApproval.taskId;
    
    addLog(taskId, 'warning', `❌ User REJECTED action: ${pendingApproval.action}.`);
    setPendingApproval(null);

    setTasks(prev => prev.map(t => {
      if (t.id === taskId) {
        return {
          ...t,
          status: 'cancelled',
          finalResult: `Execution stopped because user rejected action "${pendingApproval.action}".`
        };
      }
      return t;
    }));

    if (activeTask && activeTask.id === taskId) {
      setActiveTask(prev => prev ? { ...prev, status: 'cancelled' } : null);
    }
  };

  const retryTask = async (taskId: string) => {
    const task = tasks.find(t => t.id === taskId);
    if (task) {
      await runGoal(task.originalGoal);
    }
  };

  const deleteTask = (taskId: string) => {
    const nextTasks = tasks.filter(t => t.id !== taskId);
    saveTasksState(nextTasks);
    if (activeTask?.id === taskId) {
      setActiveTask(nextTasks[0] || null);
    }
  };

  const toggleIntegration = (slug: string) => {
    setIntegrations(prev => prev.map(item => {
      if (item.slug === slug) {
        const nextStatus = item.status === 'connected' ? 'not_connected' : 'connected';
        return { ...item, status: nextStatus, lastSync: nextStatus === 'connected' ? 'Just now' : undefined };
      }
      return item;
    }));
  };

  const toggleWorkflow = (id: string) => {
    const next = workflows.map(w => w.id === id ? { ...w, isActive: !w.isActive } : w);
    setWorkflows(next);
    localStorage.setItem('nexa_user_workflows', JSON.stringify(next));
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const setActiveTaskById = (taskId: string) => {
    const t = tasks.find(x => x.id === taskId);
    if (t) setActiveTask(t);
  };

  const createWorkflow = (newWf: Partial<Workflow>) => {
    const created: Workflow = {
      id: `wf_${Math.random().toString(36).substring(2, 9)}`,
      name: newWf.name || 'Custom Autonomous Workflow',
      description: newWf.description || 'Custom workflow',
      triggerType: newWf.triggerType || 'manual',
      triggerDetails: newWf.triggerDetails || 'Manual Trigger',
      nodes: newWf.nodes || [],
      connections: newWf.connections || [],
      isActive: true,
      createdAt: new Date().toISOString()
    };
    const next = [created, ...workflows];
    setWorkflows(next);
    localStorage.setItem('nexa_user_workflows', JSON.stringify(next));
  };

  return (
    <AgentContext.Provider
      value={{
        tasks,
        activeTask,
        activityLogs,
        pendingApproval,
        integrations,
        workflows,
        notifications,
        isExecuting,
        runGoal,
        approveAction,
        rejectAction,
        retryTask,
        deleteTask,
        toggleIntegration,
        toggleWorkflow,
        markNotificationAsRead,
        setActiveTaskById,
        createWorkflow
      }}
    >
      {children}
    </AgentContext.Provider>
  );
};

export const useAgent = () => {
  const context = useContext(AgentContext);
  if (!context) {
    throw new Error('useAgent must be used within an AgentProvider');
  }
  return context;
};
