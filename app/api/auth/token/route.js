import { NextResponse } from 'next/server';

// Simple token validation - in production, use JWT or more secure tokens
const VALID_TOKENS = [
  process.env.API_SECRET_KEY
];

export async function POST(request) {
  try {
    const authHeader = request.headers.get('Authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { success: false, error: 'Missing authorization header' },
        { status: 401 }
      );
    }

    const token = authHeader.substring(7); // Remove "Bearer " prefix
    
    if (!token) {
      return NextResponse.json(
        { success: false, error: 'Token is required' },
        { status: 400 }
      );
    }

    // Validate token
    const isValidToken = VALID_TOKENS.includes(token);
    
    if (!isValidToken) {
      return NextResponse.json(
        { success: false, error: 'Invalid token' },
        { status: 401 }
      );
    }

    // Return success with user info
    return NextResponse.json({
      success: true,
      data: {
        authenticated: true,
        role: 'admin',
        permissions: ['admin.read', 'admin.write', 'game.manage', 'player.manage'],
        tokenValid: true,
        authenticatedAt: new Date().toISOString()
      }
    });

  } catch (error) {
    console.error('Token validation error:', error);
    return NextResponse.json(
      { success: false, error: 'Authentication failed' },
      { status: 500 }
    );
  }
}