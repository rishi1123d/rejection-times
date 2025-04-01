import { NextResponse } from 'next/server';

// A simple API route to serve a placeholder SVG image
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const source = searchParams.get('source') || 'Article';
  
  const svg = `
    <svg width="800" height="600" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#f0f0f0"/>
      <text x="50%" y="45%" font-family="Arial" font-size="24" fill="#666" text-anchor="middle">
        ${source}
      </text>
      <text x="50%" y="55%" font-family="Arial" font-size="18" fill="#999" text-anchor="middle">
        Image
      </text>
    </svg>
  `;
  
  return new NextResponse(svg, {
    headers: {
      'Content-Type': 'image/svg+xml',
      'Cache-Control': 'public, max-age=31536000, immutable'
    }
  });
} 