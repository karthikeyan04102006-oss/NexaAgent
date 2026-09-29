import { Task, Integration, Workflow, OrganizationMember, AnalyticsSummary, NotificationItem } from '@/types';

export const DEMO_USER = {
  id: 'usr_demo_101',
  email: 'alex.vance@enterprise-nexa.io',
  fullName: 'Alex Vance',
  role: 'client_admin' as const,
  accountType: 'organization' as const,
  organizationId: 'org_nexa_tech_99',
  organizationName: 'Nexa Technologies Inc.',
  emailVerified: true,
  createdAt: '2026-01-15T08:30:00Z'
};

export const DEMO_ORGANIZATION = {
  id: 'org_nexa_tech_99',
  name: 'Nexa Technologies Inc.',
  slug: 'nexa-tech',
  ownerId: 'usr_demo_101',
  memberCount: 8,
  plan: 'enterprise' as const,
  createdAt: '2026-01-15T08:30:00Z'
};

export const INITIAL_INTEGRATIONS: Integration[] = [
  {
    id: 'int_1',
    name: 'Google Calendar',
    slug: 'gcalendar',
    description: 'Autonomous schedule inspection, slot availability check, and meeting creation.',
    icon: 'Calendar',
    status: 'connected',
    lastSync: '10 minutes ago',
    category: 'productivity',
    scopesRequired: ['calendar.events', 'calendar.readonly']
  },
  {
    id: 'int_2',
    name: 'Gmail',
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
    description: 'Geocoding, hotel ratings lookup, commute calculations, and local place reviews.',
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
    description: 'Primary AI orchestration model for intent parsing, sub-task planning, and result verification.',
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
    description: 'PostgreSQL cloud database for state persistence, audit events, and user RBAC.',
    icon: 'Database',
    status: 'connected',
    lastSync: 'Realtime',
    category: 'core',
    scopesRequired: ['postgres.read_write']
  }
];

export const INITIAL_TASKS: Task[] = [
  {
    id: 'task_demo_chennai',
    title: 'Plan Chennai Trip under ₹15,000',
    originalGoal: 'Plan my Chennai trip under ₹15,000 including train, hotel stay, and calendar schedule.',
    userId: 'usr_demo_101',
    userName: 'Alex Vance',
    organizationId: 'org_nexa_tech_99',
    status: 'completed',
    createdAt: '2026-09-29T14:20:00Z',
    completedAt: '2026-09-29T14:22:15Z',
    durationMs: 135000,
    agentModel: 'Gemini 1.5 Pro',
    toolsUsed: ['Travel API', 'Google Maps', 'Google Calendar', 'Supabase'],
    finalResult: 'Successfully planned 2-day Chennai trip for total ₹11,560 (under ₹15,000 budget). Vande Bharat Train booked, Treebo Trend hotel selected, and itinerary synced to Google Calendar.',
    budgetLimit: 15000,
    currency: 'INR',
    nodes: [
      { id: 'n1', label: 'UNDERSTAND GOAL', status: 'completed', tool: 'supabase', description: 'Extracted target: Chennai trip, Budget: ₹15,000, Origin: Bengaluru.', durationMs: 1200 },
      { id: 'n2', label: 'CREATE PLAN', status: 'completed', tool: 'supabase', description: 'Decomposed goal into transport search, hotel booking, budget verification, itinerary sync.', durationMs: 2400 },
      { id: 'n3', label: 'SEARCH TRANSPORT', status: 'completed', tool: 'travel', description: 'Identified Vande Bharat Express (₹1,080 each way) as optimal mode.', durationMs: 3100 },
      { id: 'n4', label: 'COMPARE OPTIONS', status: 'completed', tool: 'travel', description: 'Evaluated 12 options. Selected train over flight to preserve ₹3,440 budget cushion.', durationMs: 2800 },
      { id: 'n5', label: 'SEARCH HOTELS', status: 'completed', tool: 'gmaps', description: 'Retrieved 8 hotels in T. Nagar area. Selected Treebo Trend Heritage (₹1,950/night).', durationMs: 4100 },
      { id: 'n6', label: 'CHECK BUDGET', status: 'completed', tool: 'travel', description: 'Total cost: ₹11,560 (Transport ₹2,160 + Hotel ₹3,900 + Food/Local ₹5,500). Within budget!', durationMs: 1500 },
      { id: 'n7', label: 'CREATE ITINERARY', status: 'completed', tool: 'gmaps', description: 'Generated 2-day sightseeing timeline (Marina Beach, Santhome Cathedral).', durationMs: 2900 },
      { id: 'n8', label: 'ADD TO CALENDAR', status: 'completed', tool: 'gcalendar', description: 'Synced travel events directly to Google Calendar.', durationMs: 1800 },
      { id: 'n9', label: 'VERIFY', status: 'completed', tool: 'supabase', description: 'Verified zero budget overruns and confirmed schedule integrity.', durationMs: 1100 }
    ]
  },
  {
    id: 'task_demo_meeting',
    title: 'Schedule Team Sync Tomorrow',
    originalGoal: 'Schedule a meeting with my engineering team tomorrow afternoon and notify attendees.',
    userId: 'usr_demo_101',
    userName: 'Alex Vance',
    organizationId: 'org_nexa_tech_99',
    status: 'completed',
    createdAt: '2026-09-29T11:15:00Z',
    completedAt: '2026-09-29T11:16:45Z',
    durationMs: 105000,
    agentModel: 'Gemini 1.5 Pro',
    toolsUsed: ['Google Calendar', 'Gmail'],
    finalResult: 'Scheduled "Engineering Q3 Alignment" meeting for tomorrow at 2:30 PM - 3:30 PM IST with 4 attendees. Invites dispatched via Gmail.',
    nodes: [
      { id: 'n1', label: 'UNDERSTAND GOAL', status: 'completed', tool: 'supabase', description: 'Parsed request: Team sync tomorrow afternoon.' },
      { id: 'n2', label: 'CREATE PLAN', status: 'completed', tool: 'supabase', description: 'Step plan: query calendar, find free slots, create event, dispatch email.' },
      { id: 'n3', label: 'CHECK CALENDAR', status: 'completed', tool: 'gcalendar', description: 'Inspected Google Calendar for mutual open slots between 1 PM and 5 PM.' },
      { id: 'n4', label: 'CREATE EVENT', status: 'completed', tool: 'gcalendar', description: 'Created event "Engineering Q3 Alignment" with Google Meet link.' },
      { id: 'n5', label: 'SEND EMAIL', status: 'completed', tool: 'gmail', description: 'User approved sending email invite to team members.', requiresApproval: true },
      { id: 'n6', label: 'VERIFY', status: 'completed', tool: 'supabase', description: 'Confirmed Google Meet link generated and calendar invitations delivered.' }
    ]
  }
];

export const INITIAL_MEMBERS: OrganizationMember[] = [
  {
    id: 'mem_1',
    organizationId: 'org_nexa_tech_99',
    userId: 'usr_demo_101',
    fullName: 'Alex Vance',
    email: 'alex.vance@enterprise-nexa.io',
    role: 'client_admin',
    status: 'active',
    lastActive: '2 mins ago'
  },
  {
    id: 'mem_2',
    organizationId: 'org_nexa_tech_99',
    userId: 'usr_demo_102',
    fullName: 'Elena Rostova',
    email: 'elena.r@enterprise-nexa.io',
    role: 'user',
    status: 'active',
    lastActive: '1 hour ago'
  },
  {
    id: 'mem_3',
    organizationId: 'org_nexa_tech_99',
    userId: 'usr_demo_103',
    fullName: 'Marcus Brody',
    email: 'marcus.b@enterprise-nexa.io',
    role: 'user',
    status: 'active',
    lastActive: '3 hours ago'
  },
  {
    id: 'mem_4',
    organizationId: 'org_nexa_tech_99',
    userId: 'usr_demo_104',
    fullName: 'Priya Sharma',
    email: 'priya.s@enterprise-nexa.io',
    role: 'client_admin',
    status: 'active',
    lastActive: 'Just now'
  },
  {
    id: 'mem_5',
    organizationId: 'org_nexa_tech_99',
    userId: 'usr_demo_105',
    fullName: 'David Chen',
    email: 'david.c@enterprise-nexa.io',
    role: 'user',
    status: 'invited',
    lastActive: 'Pending Invite'
  }
];

export const INITIAL_WORKFLOWS: Workflow[] = [
  {
    id: 'wf_1',
    name: 'Weekly Executive Briefing & Scheduler',
    description: 'Scans Google Calendar every Monday morning at 8 AM, compiles open availability, drafts weekly agenda email, and seeks approval before sending to management.',
    triggerType: 'schedule',
    triggerDetails: 'Every Monday at 08:00 AM IST',
    isActive: true,
    lastRun: 'Yesterday at 08:00 AM',
    createdAt: '2026-08-10T10:00:00Z',
    nodes: [
      { id: 'w_1', type: 'trigger', title: 'Schedule Trigger: Mon 8 AM', config: { cron: '0 8 * * 1' }, position: { x: 50, y: 150 } },
      { id: 'w_2', type: 'tool', title: 'Inspect Calendar Slots', config: { tool: 'gcalendar', action: 'get_events' }, position: { x: 280, y: 150 } },
      { id: 'w_3', type: 'agent', title: 'AI Agenda Synthesis', config: { model: 'gemini-1.5-pro' }, position: { x: 510, y: 150 } },
      { id: 'w_4', type: 'approval', title: 'Require Email Approval', config: { action: 'Send Email' }, position: { x: 740, y: 150 } },
      { id: 'w_5', type: 'action', title: 'Dispatch Email Digest', config: { tool: 'gmail' }, position: { x: 970, y: 150 } }
    ],
    connections: [
      { id: 'c1', fromNodeId: 'w_1', toNodeId: 'w_2' },
      { id: 'c2', fromNodeId: 'w_2', toNodeId: 'w_3' },
      { id: 'c3', fromNodeId: 'w_3', toNodeId: 'w_4' },
      { id: 'c4', fromNodeId: 'w_4', toNodeId: 'w_5' }
    ]
  },
  {
    id: 'wf_2',
    name: 'Auto Travel & Expenses Audit Workflow',
    description: 'Triggers when a new travel booking receipt is saved, searches Google Maps for hotel distance, and updates database records.',
    triggerType: 'webhook',
    triggerDetails: 'Webhook: /api/v1/webhooks/travel-receipt',
    isActive: true,
    lastRun: '3 days ago',
    createdAt: '2026-09-01T12:00:00Z',
    nodes: [
      { id: 'w_10', type: 'trigger', title: 'New Receipt Webhook', config: {}, position: { x: 50, y: 150 } },
      { id: 'w_11', type: 'agent', title: 'Extract Expense Items', config: {}, position: { x: 280, y: 150 } },
      { id: 'w_12', type: 'tool', title: 'Verify Distance via Maps', config: { tool: 'gmaps' }, position: { x: 510, y: 150 } },
      { id: 'w_13', type: 'action', title: 'Log to Database', config: { tool: 'supabase' }, position: { x: 740, y: 150 } }
    ],
    connections: [
      { id: 'c10', fromNodeId: 'w_10', toNodeId: 'w_11' },
      { id: 'c11', fromNodeId: 'w_11', toNodeId: 'w_12' },
      { id: 'c12', fromNodeId: 'w_12', toNodeId: 'w_13' }
    ]
  }
];

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif_1',
    title: 'Agent Task Completed',
    message: 'Task "Plan Chennai Trip under ₹15,000" executed successfully.',
    type: 'task_complete',
    read: false,
    createdAt: '10 minutes ago',
    actionUrl: '/tasks/task_demo_chennai'
  },
  {
    id: 'notif_2',
    title: 'Human Approval Required',
    message: 'Gmail tool requires approval to send email "Team Sync Invites".',
    type: 'approval_required',
    read: false,
    createdAt: '25 minutes ago',
    actionUrl: '/agent'
  },
  {
    id: 'notif_3',
    title: 'Integration Active',
    message: 'Google Calendar API connected and verified.',
    type: 'integration_alert',
    read: true,
    createdAt: '2 hours ago',
    actionUrl: '/integrations'
  }
];

export const DEMO_ANALYTICS: AnalyticsSummary = {
  totalTasks: 148,
  activeAgents: 12,
  completedTasks: 142,
  failedTasks: 6,
  successRate: 95.9,
  totalToolCalls: 1240,
  apiUsageTokens: 482900,
  teamMembersCount: 8
};
