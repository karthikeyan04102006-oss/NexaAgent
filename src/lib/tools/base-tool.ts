export interface ToolParameter {
  type: 'string' | 'number' | 'boolean' | 'object' | 'array';
  description: string;
  required?: boolean;
}

export interface ToolDefinition {
  name: string;
  slug: string;
  description: string;
  permissions: string[];
  requiresApprovalFor?: string[];
  inputSchema: Record<string, ToolParameter>;
  outputSchema: Record<string, string>;
}

export interface ToolExecutionResult {
  success: boolean;
  data: any;
  message: string;
  requiresApproval?: boolean;
  approvalDetails?: {
    action: string;
    reason: string;
    estimatedCost?: string;
    affectedService: string;
    params: Record<string, any>;
  };
}

export abstract class BaseTool {
  abstract definition: ToolDefinition;

  abstract execute(params: Record<string, any>): Promise<ToolExecutionResult>;
}
