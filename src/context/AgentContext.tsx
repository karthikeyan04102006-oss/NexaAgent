'use client';

import React, { createContext, useContext, useState } from 'react';
import { Task, ExecutionNode, ActivityLogEvent, HumanApprovalRequest, Integration, Workflow, NotificationItem } from '@/types';
import { INITIAL_TASKS, INITIAL_INTEGRATIONS, INITIAL_WORKFLOWS, INITIAL_NOTIFICATIONS } from '@/lib/demo-data';
import { decomposeGoalWithGemini } from '@/lib/gemini';
import { toolRegistry } from '@/lib/tools';

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

export const AgentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);
  const [activeTask, setActiveTask] = useState<Task | null>(INITIAL_TASKS[0]);
  const [activityLogs, setActivityLogs] = useState<ActivityLogEvent[]>([
    {
      id: 'log_1',
      taskId: 'task_demo_chennai',
      timestamp: new Date().toISOString(),
      timeFormatted: '14:20:01',
      type: 'info',
      message: 'Goal understood: Plan Chennai trip under ₹15,000.'
    },
    {
      id: 'log_2',
      taskId: 'task_demo_chennai',
      timestamp: new Date().toISOString(),
      timeFormatted: '14:20:02',
      type: 'decision',
      message: 'Execution plan created with 9 sub-tasks.'
    },
    {
      id: 'log_3',
      taskId: 'task_demo_chennai',
      timestamp: new Date().toISOString(),
      timeFormatted: '14:20:04',
      type: 'tool_call',
      toolName: 'Travel Engine',
      message: 'Searching transport options (Vande Bharat, Flights).'
    },
    {
      id: 'log_4',
      taskId: 'task_demo_chennai',
      timestamp: new Date().toISOString(),
      timeFormatted: '14:20:08',
      type: 'success',
      message: 'Selected Vande Bharat Train (₹2,160 round trip).'
    },
    {
      id: 'log_5',
      taskId: 'task_demo_chennai',
      timestamp: new Date().toISOString(),
      timeFormatted: '14:20:15',
      type: 'success',
      message: 'Task completed. Itinerary added to Google Calendar.'
    }
  ]);
  const [pendingApproval, setPendingApproval] = useState<HumanApprovalRequest | null>(null);
  const [integrations, setIntegrations] = useState<Integration[]>(INITIAL_INTEGRATIONS);
  const [workflows, setWorkflows] = useState<Workflow[]>(INITIAL_WORKFLOWS);
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);
  const [isExecuting, setIsExecuting] = useState<boolean>(false);

  // Helper to add activity log
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

  // Run AI Agent Execution Loop
  const runGoal = async (goal: string): Promise<Task> => {
    setIsExecuting(true);
    const taskId = `task_${Math.random().toString(36).substring(2, 9)}`;
    
    // Step 1: Intent Parsing & Plan Decomposition
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
      userId: 'usr_demo_101',
      userName: 'Alex Vance',
      organizationId: 'org_nexa_tech_99',
      status: 'running',
      createdAt: new Date().toISOString(),
      agentModel: 'Gemini 1.5 Pro',
      toolsUsed: Array.from(new Set(decomp.steps.map(s => s.tool))),
      nodes: initialNodes
    };

    setTasks(prev => [newTask, ...prev]);
    setActiveTask(newTask);

    addLog(taskId, 'info', `✓ Goal understood: "${goal}"`);
    addLog(taskId, 'decision', `✓ Intent: ${decomp.intent}`);
    addLog(taskId, 'decision', `✓ Execution plan created with ${initialNodes.length} nodes.`);

    // Execute Autonomous Loop through Nodes
    let currentNodes = [...initialNodes];
    let hasApprovalHold = false;

    for (let i = 0; i < currentNodes.length; i++) {
      const node = currentNodes[i];
      
      // Update Node to Running
      currentNodes = currentNodes.map((n, idx) => idx === i ? { ...n, status: 'running' } : n);
      setTasks(prev => prev.map(t => t.id === taskId ? { ...t, nodes: [...currentNodes] } : t));
      setActiveTask(prev => prev ? { ...prev, nodes: [...currentNodes] } : null);

      addLog(taskId, 'tool_call', `⚙ Executing step ${i+1}/${currentNodes.length}: ${node.label}`, node.tool);
      
      // Simulate real step execution delay
      await new Promise(r => setTimeout(r, 1400));

      // Check for human approval requirement
      if (node.requiresApproval) {
        hasApprovalHold = true;
        
        const approvalReq: HumanApprovalRequest = {
          id: `appr_${Math.random().toString(36).substring(2, 9)}`,
          taskId,
          stepId: node.id,
          action: node.label === 'SEND INVITATIONS' ? 'Send Email Invitations' : 'Confirm Financial Reservation',
          reason: `Agent requires human authorization to complete sensitive action: ${node.description}`,
          estimatedCost: node.tool === 'travel' ? '₹3,900.00' : 'Free ($0.00)',
          affectedService: node.tool === 'gmail' ? 'Gmail API' : node.tool === 'travel' ? 'Travel Booking Engine' : 'External Integration',
          params: { stepId: node.id, tool: node.tool },
          status: 'pending',
          requestedAt: new Date().toISOString()
        };

        setPendingApproval(approvalReq);
        
        currentNodes = currentNodes.map((n, idx) => idx === i ? { ...n, status: 'waiting', approvalDetails: approvalReq } : n);
        setTasks(prev => prev.map(t => t.id === taskId ? { ...t, status: 'approval_required', nodes: [...currentNodes] } : t));
        setActiveTask(prev => prev ? { ...prev, status: 'approval_required', nodes: [...currentNodes] } : null);

        addLog(taskId, 'approval', `⚠️ Human approval required for: ${approvalReq.action}`);
        
        setNotifications(prev => [
          {
            id: `notif_${Date.now()}`,
            title: 'Human Approval Request',
            message: `Task "${newTask.title}" is holding for authorization: ${approvalReq.action}`,
            type: 'approval_required',
            read: false,
            createdAt: 'Just now',
            actionUrl: '/agent'
          },
          ...prev
        ]);

        setIsExecuting(false);
        return newTask;
      }

      // Execute tool logic via ToolRegistry
      const toolResult = await toolRegistry.executeTool(node.tool || 'supabase', {
        action: 'execute',
        goal: goal,
        step: node.label
      });

      // Update Node to Completed
      currentNodes = currentNodes.map((n, idx) => idx === i ? { 
        ...n, 
        status: 'completed', 
        output: toolResult.data || toolResult.message,
        durationMs: 1200 + Math.floor(Math.random() * 1500)
      } : n);

      setTasks(prev => prev.map(t => t.id === taskId ? { ...t, nodes: [...currentNodes] } : t));
      setActiveTask(prev => prev ? { ...prev, nodes: [...currentNodes] } : null);

      addLog(taskId, 'success', `✓ ${node.label} completed: ${toolResult.message}`, node.tool);
    }

    // Task Completed Fully
    const completedTask: Task = {
      ...newTask,
      status: 'completed',
      completedAt: new Date().toISOString(),
      durationMs: currentNodes.length * 1600,
      finalResult: `Goal successfully executed! Autonomous agent completed all ${currentNodes.length} steps with zero errors.`,
      nodes: currentNodes
    };

    setTasks(prev => prev.map(t => t.id === taskId ? completedTask : t));
    setActiveTask(completedTask);
    addLog(taskId, 'success', `🎉 Task "${newTask.title}" completed successfully.`);

    setNotifications(prev => [
      {
        id: `notif_${Date.now()}`,
        title: 'Task Execution Complete',
        message: `Goal "${newTask.title}" completed successfully.`,
        type: 'task_complete',
        read: false,
        createdAt: 'Just now',
        actionUrl: `/tasks/${taskId}`
      },
      ...prev
    ]);

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

    // Resume Task
    const targetTask = tasks.find(t => t.id === taskId);
    if (!targetTask) return;

    let updatedNodes = targetTask.nodes.map(n => {
      if (n.id === stepId) {
        return { ...n, status: 'completed' as const, output: 'Action explicitly approved by user.' };
      }
      return n;
    });

    // Resume remaining pending nodes
    setTasks(prev => prev.map(t => t.id === taskId ? { ...t, status: 'running', nodes: updatedNodes } : t));
    
    for (let i = 0; i < updatedNodes.length; i++) {
      if (updatedNodes[i].status === 'pending') {
        updatedNodes[i] = { ...updatedNodes[i], status: 'running' };
        setTasks(prev => prev.map(t => t.id === taskId ? { ...t, nodes: [...updatedNodes] } : t));
        await new Promise(r => setTimeout(r, 1200));
        updatedNodes[i] = { ...updatedNodes[i], status: 'completed', output: 'Step verified successfully.' };
        setTasks(prev => prev.map(t => t.id === taskId ? { ...t, nodes: [...updatedNodes] } : t));
      }
    }

    const finalCompletedTask: Task = {
      ...targetTask,
      status: 'completed',
      completedAt: new Date().toISOString(),
      finalResult: `Goal completed following user approval of ${pendingApproval.action}.`,
      nodes: updatedNodes
    };

    setTasks(prev => prev.map(t => t.id === taskId ? finalCompletedTask : t));
    setActiveTask(finalCompletedTask);
    setIsExecuting(false);
  };

  const rejectAction = async (approvalId: string) => {
    if (!pendingApproval) return;
    const taskId = pendingApproval.taskId;
    
    addLog(taskId, 'warning', `❌ User REJECTED action: ${pendingApproval.action}. Agent replanning...`);
    setPendingApproval(null);

    setTasks(prev => prev.map(t => {
      if (t.id === taskId) {
        return {
          ...t,
          status: 'cancelled',
          finalResult: `Task halted because step "${pendingApproval.action}" was rejected by user.`
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
    setTasks(prev => prev.filter(t => t.id !== taskId));
    if (activeTask?.id === taskId) {
      setActiveTask(null);
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
    setWorkflows(prev => prev.map(w => w.id === id ? { ...w, isActive: !w.isActive } : w));
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
      description: newWf.description || 'Custom user created workflow',
      triggerType: newWf.triggerType || 'manual',
      triggerDetails: newWf.triggerDetails || 'Manual Trigger',
      nodes: newWf.nodes || [],
      connections: newWf.connections || [],
      isActive: true,
      createdAt: new Date().toISOString()
    };
    setWorkflows(prev => [created, ...prev]);
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
