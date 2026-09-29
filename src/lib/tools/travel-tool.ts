import { BaseTool, ToolDefinition, ToolExecutionResult } from './base-tool';

export class TravelTool extends BaseTool {
  definition: ToolDefinition = {
    name: 'Travel & Booking Engine',
    slug: 'travel',
    description: 'Search flights, trains, intercity transit, compare pricing tiers, find budget hotels, and generate itineraries.',
    permissions: ['travel.search', 'travel.book'],
    requiresApprovalFor: ['book_hotel', 'purchase_ticket'],
    inputSchema: {
      action: { type: 'string', description: 'search_transport | compare_options | search_hotels | book_hotel', required: true },
      origin: { type: 'string', description: 'Origin city', required: false },
      destination: { type: 'string', description: 'Destination city', required: false },
      budgetLimit: { type: 'number', description: 'Maximum budget constraint in INR', required: false }
    },
    outputSchema: {
      success: 'boolean',
      options: 'array of transport or hotel options',
      selectedOption: 'object'
    }
  };

  async execute(params: Record<string, any>): Promise<ToolExecutionResult> {
    const action = params.action || 'search_transport';
    const budget = params.budgetLimit || 15000;

    if (action === 'search_transport') {
      return {
        success: true,
        message: `Searched transport options from ${params.origin || 'Bengaluru'} to ${params.destination || 'Chennai'} within ₹${budget} budget.`,
        data: {
          transportOptions: [
            { mode: 'Vande Bharat Express (Train 20608)', departure: '05:45 AM', arrival: '10:10 AM', price: '₹1,080', status: 'Available' },
            { mode: 'Shatabdi Express (Train 12008)', departure: '06:00 AM', arrival: '11:00 AM', price: '₹985', status: 'Available' },
            { mode: 'IndiGo Flight 6E-6124', departure: '08:15 AM', arrival: '09:20 AM', price: '₹3,250', status: 'Available' }
          ]
        }
      };
    }

    if (action === 'compare_options') {
      return {
        success: true,
        message: `Compared 12 transport and stay combinations under ₹${budget}.`,
        data: {
          bestValueCombo: {
            transport: 'Vande Bharat Express (Round Trip)',
            transportCost: '₹2,160',
            stay: 'Treebo Trend Heritage (2 Nights)',
            stayCost: '₹3,900',
            localConveyance: '₹1,500',
            foodAndActivities: '₹4,000',
            totalEstimatedCost: '₹11,560',
            savingsVsBudget: '₹3,440 under maximum budget of ₹15,000'
          }
        }
      };
    }

    if (action === 'search_hotels') {
      return {
        success: true,
        message: 'Retrieved 8 vetted hotel options with ratings > 4.2',
        data: {
          hotels: [
            { name: 'Treebo Trend Heritage Central', rating: 4.3, pricePerNight: '₹1,950', total2Nights: '₹3,900', amenities: ['AC', 'Free WiFi', 'Breakfast Included'] },
            { name: 'FabHotel T Nagar', rating: 4.2, pricePerNight: '₹2,100', total2Nights: '₹4,200', amenities: ['AC', 'Free WiFi', 'Central Location'] }
          ]
        }
      };
    }

    if (action === 'book_hotel' || action === 'purchase_ticket') {
      return {
        success: true,
        requiresApproval: true,
        message: 'Financial transaction requires human authorization before placing booking.',
        approvalDetails: {
          action: 'Confirm Hotel Booking & Payment',
          reason: `Agent is ready to reserve 2 nights at Treebo Trend Heritage Central, Chennai for ₹3,900`,
          estimatedCost: '₹3,900.00 INR',
          affectedService: 'Travel Booking Gateway',
          params: params
        },
        data: null
      };
    }

    return {
      success: true,
      message: `Executed travel action ${action}`,
      data: { status: 'completed' }
    };
  }
}
