import { NextResponse } from 'next/server';
import { getDojoServer } from '../../../lib/dojo-server.js';
import { config } from '../../../lib/dojo-config.js';

function authenticateApiKey(request) {
  const apiKey = request.headers.get('x-api-key') || 
                 request.headers.get('authorization')?.replace('Bearer ', '');
  
  if (!apiKey || apiKey !== config.security.apiSecretKey) {
    return false;
  }
  return true;
}

function validateTransactionRequest(body) {
  const { contractAddress, functionName } = body;

  if (!contractAddress || !functionName) {
    return 'Contract address and function name are required';
  }

  // Basic validation for contract address format
  if (!/^0x[a-fA-F0-9]{64}$/.test(contractAddress)) {
    return 'Invalid contract address format';
  }

  return null;
}

export async function POST(request) {
  if (!authenticateApiKey(request)) {
    return NextResponse.json({
      success: false,
      error: 'Invalid API key'
    }, { status: 401 });
  }

  try {
    const body = await request.json();
    
    const validationError = validateTransactionRequest(body);
    if (validationError) {
      return NextResponse.json({
        success: false,
        error: validationError
      }, { status: 400 });
    }

    const { contractAddress, functionName, calldata = [] } = body;

    const dojoServer = getDojoServer();
    const result = await dojoServer.executeTransaction(
      contractAddress,
      functionName,
      calldata
    );

    return NextResponse.json({
      success: true,
      data: result,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Transaction execution error:', error);
    return NextResponse.json({
      success: false,
      error: error.message || 'Failed to execute transaction',
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}