import { GoogleGenerativeAI } from '@google/generative-ai';

export interface AgentPlanStep {
  id: string;
  label: string;
  tool: string;
  description: string;
  requiresApproval?: boolean;
}

export interface DecompositionResult {
  title: string;
  originalGoal: string;
  intent: string;
  steps: AgentPlanStep[];
}

const geminiApiKey = process.env.GEMINI_API_KEY || '';

export async function decomposeGoalWithGemini(goal: string): Promise<DecompositionResult> {
  // If API Key is present, query Gemini API
  if (geminiApiKey) {
    try {
      const genAI = new GoogleGenerativeAI(geminiApiKey);
      const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro' });
      
      const prompt = `
You are an autonomous AI Agent orchestrator named NexaAgent.
Decompose the following user goal into structured execution steps:
Goal: "${goal}"

Available tools: "gcalendar", "gmail", "gmaps", "travel", "supabase".

Return ONLY a JSON object with this exact structure:
{
  "title": "Short descriptive title for task",
  "intent": "High-level goal summary",
  "steps": [
    {
      "id": "step_1",
      "label": "Short Action Title (e.g. UNDERSTAND GOAL)",
      "tool": "gcalendar | gmail | gmaps | travel | supabase",
      "description": "Details of step",
      "requiresApproval": true/false
    }
  ]
}
Note: Sensitive actions like sending emails or making hotel bookings MUST have requiresApproval: true.
`;
      const result = await model.generateContent(prompt);
      const responseText = result.response.text();
      const jsonMatch = responseText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]);
        return {
          title: parsed.title || 'Autonomous Execution Task',
          originalGoal: goal,
          intent: parsed.intent || goal,
          steps: parsed.steps || []
        };
      }
    } catch (err) {
      console.warn('Gemini API call failed or unconfigured, using fallback decomposition engine:', err);
    }
  }

  // Smart Fallback Decomposition Engine for Demo & Standalone Mode
  const lowerGoal = goal.toLowerCase();

  if (lowerGoal.includes('chennai') || lowerGoal.includes('trip') || lowerGoal.includes('travel') || lowerGoal.includes('flight')) {
    return {
      title: 'Chennai Trip Planner & Booking',
      originalGoal: goal,
      intent: 'Plan 2-day Chennai trip under budget constraint, find transport & stay, create itinerary, sync calendar.',
      steps: [
        { id: 'node_1', label: 'UNDERSTAND GOAL', tool: 'supabase', description: 'Parse goal, extract budget ₹15,000, destination Chennai, and travel constraints.' },
        { id: 'node_2', label: 'CREATE PLAN', tool: 'supabase', description: 'Generate multi-phase execution strategy: transport, stay, local conveyance, itinerary.' },
        { id: 'node_3', label: 'SEARCH TRANSPORT', tool: 'travel', description: 'Query trains (Vande Bharat, Shatabdi) and flights between Bengaluru & Chennai.' },
        { id: 'node_4', label: 'COMPARE OPTIONS', tool: 'travel', description: 'Evaluate price vs speed ratio to maximize value within ₹15,000 budget limit.' },
        { id: 'node_5', label: 'SEARCH HOTELS', tool: 'gmaps', description: 'Search top-rated hotel accommodations in central Chennai (T. Nagar, Egmore).' },
        { id: 'node_6', label: 'CHECK BUDGET', tool: 'travel', description: 'Verify total estimated expense (₹11,560) leaves ₹3,440 emergency safety margin.' },
        { id: 'node_7', label: 'CREATE ITINERARY', tool: 'gmaps', description: 'Synthesize 2-day optimal sightseeing schedule (Marina Beach, Kapaleeshwarar Temple).' },
        { id: 'node_8', label: 'ADD TO CALENDAR', tool: 'gcalendar', description: 'Sync confirmed itinerary events directly to Google Calendar.', requiresApproval: false },
        { id: 'node_9', label: 'VERIFY & REPORT', tool: 'supabase', description: 'Audit all outputs for budget compliance and generate complete execution summary report.' }
      ]
    };
  }

  if (lowerGoal.includes('meeting') || lowerGoal.includes('schedule') || lowerGoal.includes('sync')) {
    return {
      title: 'Team Meeting Coordination',
      originalGoal: goal,
      intent: 'Coordinate team meeting for tomorrow afternoon, inspect calendar availability, send invitations.',
      steps: [
        { id: 'node_1', label: 'UNDERSTAND GOAL', tool: 'supabase', description: 'Identify target participants, preferred time window (tomorrow afternoon).' },
        { id: 'node_2', label: 'IDENTIFY PARTICIPANTS', tool: 'gmail', description: 'Fetch contact records for engineering lead and product managers.' },
        { id: 'node_3', label: 'CHECK CALENDAR', tool: 'gcalendar', description: 'Query Google Calendar for mutual free slots tomorrow between 1:00 PM and 5:00 PM.' },
        { id: 'node_4', label: 'FIND AVAILABILITY', tool: 'gcalendar', description: 'Determine 02:30 PM - 03:30 PM IST as optimal slot with zero calendar collisions.' },
        { id: 'node_5', label: 'CREATE MEETING', tool: 'gcalendar', description: 'Create calendar event with Google Meet link.' },
        { id: 'node_6', label: 'SEND INVITATIONS', tool: 'gmail', description: 'Dispatch email notifications with calendar invites to team members.', requiresApproval: true },
        { id: 'node_7', label: 'VERIFY', tool: 'supabase', description: 'Confirm event creation in calendar and delivery status of emails.' }
      ]
    };
  }

  // Generic Default Goal Decomposition
  return {
    title: 'Autonomous Goal Execution',
    originalGoal: goal,
    intent: `Execute: ${goal}`,
    steps: [
      { id: 'node_1', label: 'UNDERSTAND GOAL', tool: 'supabase', description: 'Parse goal parameters, constraints, and target outcomes.' },
      { id: 'node_2', label: 'CREATE PLAN', tool: 'supabase', description: 'Decompose prompt into autonomous sub-tasks and tool invocations.' },
      { id: 'node_3', label: 'QUERY DATA SOURCES', tool: 'gmaps', description: 'Retrieve relevant external information and API schemas.' },
      { id: 'node_4', label: 'EXECUTE ACTIONS', tool: 'travel', description: 'Invoke selected integrations to fulfill requested actions.' },
      { id: 'node_5', label: 'VERIFY OUTCOME', tool: 'supabase', description: 'Verify execution results against initial user constraints.' }
    ]
  };
}
