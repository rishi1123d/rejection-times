import { NextResponse } from 'next/server';
import * as cheerio from 'cheerio';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get('url');

  if (!url) {
    return new NextResponse('URL parameter is required', { status: 400 });
  }

  try {
    // Fetch the HTML content of the URL
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      },
      cache: 'force-cache'
    });

    if (!response.ok) {
      // Return placeholder SVG if can't fetch the page
      return getPlaceholderImage(new URL(url).hostname);
    }

    const html = await response.text();
    const $ = cheerio.load(html);

    // Try to extract Open Graph image
    let imageUrl = $('meta[property="og:image"]').attr('content') || 
                  $('meta[name="twitter:image"]').attr('content');

    // If no OG image, try to find the first large image on the page
    if (!imageUrl) {
      $('img').each((i, img) => {
        const src = $(img).attr('src');
        if (src && !imageUrl) {
          imageUrl = src;
        }
      });
    }

    // If image URL is relative, convert it to absolute
    if (imageUrl && !imageUrl.startsWith('http')) {
      const baseUrl = new URL(url).origin;
      imageUrl = new URL(imageUrl, baseUrl).toString();
    }

    // If we found an image URL, fetch and return the actual image
    if (imageUrl) {
      const imageResponse = await fetch(imageUrl, {
        cache: 'force-cache'
      });
      
      if (imageResponse.ok) {
        const imageBuffer = await imageResponse.arrayBuffer();
        const contentType = imageResponse.headers.get('content-type') || 'image/jpeg';
        
        return new NextResponse(imageBuffer, {
          headers: {
            'Content-Type': contentType,
            'Cache-Control': 'public, max-age=86400' // Cache for 24 hours
          }
        });
      }
    }
    
    // Return placeholder if no image found or couldn't fetch image
    return getPlaceholderImage(new URL(url).hostname);
  } catch (error) {
    console.error('Error fetching image:', error);
    return getPlaceholderImage(new URL(url).hostname);
  }
}

// Helper function to generate placeholder image
function getPlaceholderImage(source: string) {
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