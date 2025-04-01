// import { createClient } from '../../../lib/supabaseClient';

import { createClient as createSupabaseClient } from '@supabase/supabase-js';
import { v4 as uuidv4 } from 'uuid';

const createClient = () => {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
};

export async function POST(req: Request) {
  try {
    const supabase = createClient();
    console.log('Supabase client created');

    // Get form data instead of JSON
    const formData = await req.formData();
    const author = formData.get('author') as string;
    const email = formData.get('email') as string;
    const quote = formData.get('quote') as string;
    const description = formData.get('description') as string;
    const outcome = formData.get('outcome') as string;
    const date = formData.get('date') as string;
    const image = formData.get('image') as File | null;

    console.log('Received data:', { author, email, quote, description, outcome, date, hasImage: !!image });

    let imageUrl = null;

    // If an image was uploaded, store it in Supabase storage
    if (image) {
      // Generate a unique file name
      const fileExt = image.name.split('.').pop();
      const fileName = `${uuidv4()}.${fileExt}`;
      const filePath = `story-images/${fileName}`;

      // Convert File to ArrayBuffer
      const arrayBuffer = await image.arrayBuffer();
      const buffer = new Uint8Array(arrayBuffer);

      // Upload to Supabase Storage
      const { data: uploadData, error: uploadError } = await supabase
        .storage
        .from('rejection-times')
        .upload(filePath, buffer, {
          contentType: image.type,
          cacheControl: '3600',
          upsert: false
        });

      if (uploadError) {
        console.error('Error uploading image:', uploadError);
        return new Response(JSON.stringify({ error: uploadError.message }), {
          status: 500,
          headers: { 'Content-Type': 'application/json' },
        });
      }

      // Get the public URL for the uploaded image
      const { data: urlData } = supabase
        .storage
        .from('rejection-times')
        .getPublicUrl(filePath);

      imageUrl = urlData.publicUrl;
      console.log('Image uploaded successfully. URL:', imageUrl);
    }

    // Insert story into database
    const { data, error } = await supabase
      .from('stories')
      .insert([
        {
          author,
          email,
          quote,
          description,
          outcome,
          date,
          image_url: imageUrl,
          featured: false,
          size: 'medium', // Default size
        },
      ]);

    console.log('Database insert result:', data, error);
    
    if (error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ success: true, imageUrl }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Unexpected error:', error);
    return new Response(JSON.stringify({ 
      error: error instanceof Error ? error.message : 'An unexpected error occurred' 
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}