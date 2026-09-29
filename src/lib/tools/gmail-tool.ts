import { BaseTool, ToolDefinition, ToolExecutionResult } from './base-tool';

export class GmailTool extends BaseTool {
  definition: ToolDefinition = {
    name: 'Gmail Integration',
    slug: 'gmail',
    description: 'Read inbox, search message threads, create email drafts, and dispatch emails to stakeholders.',
    permissions: ['https://www.googleapis.com/auth/gmail.compose', 'https://www.googleapis.com/auth/gmail.readonly'],
    requiresApprovalFor: ['send_email'],
    inputSchema: {
      action: { type: 'string', description: 'read_email | create_draft | send_email', required: true },
      to: { type: 'string', description: 'Recipient email address', required: false },
      subject: { type: 'string', description: 'Email subject line', required: false },
      body: { type: 'string', description: 'Email message body text', required: false }
    },
    outputSchema: {
      success: 'boolean',
      draftId: 'string',
      messageId: 'string'
    }
  };

  async execute(params: Record<string, any>): Promise<ToolExecutionResult> {
    const action = params.action || 'create_draft';

    if (action === 'read_email') {
      return {
        success: true,
        message: 'Scanned 5 recent emails related to team availability.',
        data: {
          messages: [
            { from: 'sarah@nexa.io', subject: 'Re: Tomorrow sync', snippet: '2 PM or 3 PM works fine for me!' },
            { from: 'david@nexa.io', subject: 'Availability', snippet: 'I am available after 2:30 PM IST.' }
          ]
        }
      };
    }

    if (action === 'create_draft') {
      return {
        success: true,
        message: `Created email draft to ${params.to || 'team'} titled "${params.subject || 'Meeting Confirmation'}"`,
        data: {
          draftId: `draft_${Math.random().toString(36).substring(2, 9)}`,
          to: params.to || 'team@company.com',
          subject: params.subject || 'Meeting Invite & Agenda',
          body: params.body || 'Hi team, scheduling our sync for tomorrow at 2:30 PM IST.'
        }
      };
    }

    if (action === 'send_email') {
      return {
        success: true,
        requiresApproval: true,
        message: 'Sending an email to external recipients requires human approval.',
        approvalDetails: {
          action: 'Send External Email',
          reason: `Agent is preparing to send email to "${params.to || 'team@nexa.io'}" with subject "${params.subject || 'Team Meeting Confirmation'}"`,
          estimatedCost: 'Free ($0.00)',
          affectedService: 'Gmail API (v1)',
          params: params
        },
        data: null
      };
    }

    return {
      success: true,
      message: `Executed Gmail action ${action}`,
      data: { status: 'completed' }
    };
  }
}
