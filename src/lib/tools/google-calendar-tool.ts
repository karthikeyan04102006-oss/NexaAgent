import { BaseTool, ToolDefinition, ToolExecutionResult } from './base-tool';

export class GoogleCalendarTool extends BaseTool {
  definition: ToolDefinition = {
    name: 'Google Calendar Tool',
    slug: 'gcalendar',
    description: 'Interface with Google Calendar to read events, check slot availability, create events, and update schedules.',
    permissions: ['https://www.googleapis.com/auth/calendar.events', 'https://www.googleapis.com/auth/calendar.readonly'],
    requiresApprovalFor: ['delete_event'],
    inputSchema: {
      action: { type: 'string', description: 'Action: get_events | check_availability | create_event | update_event | delete_event', required: true },
      date: { type: 'string', description: 'Date in YYYY-MM-DD format', required: false },
      timeSlot: { type: 'string', description: 'Requested time slot e.g. 14:00-15:00', required: false },
      title: { type: 'string', description: 'Event title', required: false },
      attendees: { type: 'array', description: 'List of attendee emails', required: false }
    },
    outputSchema: {
      success: 'boolean',
      events: 'array of calendar events',
      availableSlots: 'array of strings',
      createdEventId: 'string'
    }
  };

  async execute(params: Record<string, any>): Promise<ToolExecutionResult> {
    const action = params.action || 'check_availability';
    const date = params.date || 'Tomorrow';

    if (action === 'check_availability' || action === 'get_events') {
      return {
        success: true,
        message: `Checked Google Calendar for ${date}. Found 3 open slots.`,
        data: {
          date: date,
          busySlots: ['10:00 AM - 11:30 AM (Product Review)', '01:00 PM - 02:00 PM (Lunch)'],
          availableSlots: ['02:30 PM - 03:30 PM', '04:00 PM - 05:00 PM', '05:30 PM - 06:30 PM'],
          timezone: 'Asia/Kolkata (IST)'
        }
      };
    }

    if (action === 'create_event') {
      return {
        success: true,
        message: `Successfully scheduled "${params.title || 'Team Sync'}" on ${date} at ${params.timeSlot || '02:30 PM'}`,
        data: {
          eventId: `evt_${Math.random().toString(36).substring(2, 9)}`,
          title: params.title || 'Team Meeting',
          startTime: `${date}T14:30:00+05:30`,
          endTime: `${date}T15:30:00+05:30`,
          attendees: params.attendees || ['alex@enterprise.com', 'dev-lead@nexa.io'],
          meetUrl: 'https://meet.google.com/nexa-sync-8492'
        }
      };
    }

    if (action === 'delete_event') {
      return {
        success: true,
        requiresApproval: true,
        message: 'Deleting calendar event requires human verification.',
        approvalDetails: {
          action: 'Delete Calendar Event',
          reason: `Requested removal of calendar entry "${params.title || 'Existing Meeting'}"`,
          affectedService: 'Google Calendar API',
          params: params
        },
        data: null
      };
    }

    return {
      success: true,
      message: `Executed Google Calendar action ${action}`,
      data: { status: 'ok', action }
    };
  }
}
