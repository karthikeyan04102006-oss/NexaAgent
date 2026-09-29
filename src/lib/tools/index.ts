import { BaseTool, ToolExecutionResult } from './base-tool';
import { GoogleCalendarTool } from './google-calendar-tool';
import { GmailTool } from './gmail-tool';
import { GoogleMapsTool } from './google-maps-tool';
import { TravelTool } from './travel-tool';

export class ToolRegistry {
  private static instance: ToolRegistry;
  private tools: Map<string, BaseTool> = new Map();

  private constructor() {
    this.registerDefaultTools();
  }

  public static getInstance(): ToolRegistry {
    if (!ToolRegistry.instance) {
      ToolRegistry.instance = new ToolRegistry();
    }
    return ToolRegistry.instance;
  }

  private registerDefaultTools() {
    const calendar = new GoogleCalendarTool();
    const gmail = new GmailTool();
    const maps = new GoogleMapsTool();
    const travel = new TravelTool();

    this.tools.set(calendar.definition.slug, calendar);
    this.tools.set(gmail.definition.slug, gmail);
    this.tools.set(maps.definition.slug, maps);
    this.tools.set(travel.definition.slug, travel);
  }

  public getTool(slug: string): BaseTool | undefined {
    return this.tools.get(slug);
  }

  public getAllTools(): BaseTool[] {
    return Array.from(this.tools.values());
  }

  public async executeTool(slug: string, params: Record<string, any>): Promise<ToolExecutionResult> {
    const tool = this.getTool(slug);
    if (!tool) {
      return {
        success: false,
        message: `Tool with identifier "${slug}" is not installed or enabled in integration settings.`,
        data: null
      };
    }
    return await tool.execute(params);
  }
}

export const toolRegistry = ToolRegistry.getInstance();
