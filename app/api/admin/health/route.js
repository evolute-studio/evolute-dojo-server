import { NextResponse } from 'next/server';
import { getDojoClient } from '../../../lib/dojo-client.js';

export async function GET() {
  try {
    const dojoClient = getDojoClient();
    const isHealthy = dojoClient.isHealthy();
    
    return NextResponse.json({
      success: true,
      data: {
        status: 'healthy',
        dojoHealthy: isHealthy,
        timestamp: new Date().toISOString()
      }
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: 'Health check failed',
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}