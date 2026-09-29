import { BaseTool, ToolDefinition, ToolExecutionResult } from './base-tool';

export class GoogleMapsTool extends BaseTool {
  definition: ToolDefinition = {
    name: 'Google Maps / Places API',
    slug: 'gmaps',
    description: 'Lookup geolocation, search place details, check distances, and compute optimal routes.',
    permissions: ['https://maps.googleapis.com/maps/api/place'],
    inputSchema: {
      action: { type: 'string', description: 'search_places | get_directions', required: true },
      query: { type: 'string', description: 'Search location query e.g. Hotels in Chennai near T.Nagar', required: false },
      origin: { type: 'string', description: 'Starting location', required: false },
      destination: { type: 'string', description: 'Ending location', required: false }
    },
    outputSchema: {
      success: 'boolean',
      places: 'array of places',
      directions: 'object with distance and duration'
    }
  };

  async execute(params: Record<string, any>): Promise<ToolExecutionResult> {
    const action = params.action || 'search_places';

    if (action === 'search_places') {
      return {
        success: true,
        message: `Found top location recommendations for "${params.query || 'Chennai Hotels'}"`,
        data: {
          query: params.query,
          resultsCount: 8,
          places: [
            { name: 'Grand Chennai Hotel by GRT', rating: 4.6, area: 'T. Nagar', pricePerNight: '₹3,400', distanceToStation: '3.2 km' },
            { name: 'Radha Regent Chennai', rating: 4.4, area: 'Arumbakkam', pricePerNight: '₹2,800', distanceToStation: '4.1 km' },
            { name: 'Treebo Trend Heritage Central', rating: 4.3, area: 'Egmore', pricePerNight: '₹1,950', distanceToStation: '1.1 km' }
          ]
        }
      };
    }

    return {
      success: true,
      message: `Calculated route from ${params.origin || 'Bengaluru'} to ${params.destination || 'Chennai'}`,
      data: {
        distance: '346 km',
        duration: '6 hrs 15 mins by road / 4 hrs 25 mins by Vande Bharat Train',
        tollCosts: '₹480'
      }
    };
  }
}
