import { NextResponse } from 'next/server';
import { config } from '../../../lib/dojo-config.js';

export async function GET() {
  try {
    // Check environment variables
    const envCheck = {
      adminAddress: !!process.env.ADMIN_ADDRESS,
      adminPrivateKey: !!process.env.ADMIN_PRIVATE_KEY,
      dojoWorldAddress: !!process.env.DOJO_WORLD_ADDRESS,
      dojoRpcUrl: !!process.env.DOJO_RPC_URL,
      actualAdminAddress: process.env.ADMIN_ADDRESS,
      actualWorldAddress: process.env.DOJO_WORLD_ADDRESS,
      configAdminAddress: config.admin.address,
      configWorldAddress: config.dojo.worldAddress
    };

    return NextResponse.json({
      success: true,
      data: {
        message: 'Environment check completed',
        environment: envCheck
      }
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error.message,
      stack: error.stack
    }, { status: 500 });
  }
}