import { createClient as createSupabaseClient } from '@supabase/supabase-js';

const createClient = () => {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (!id) {
    return new Response(JSON.stringify({ error: 'ID parameter is required' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const supabase = createClient();
  console.log(`Fetching story with ID: ${id}`);
  
  const { data, error } = await supabase
    .from('stories')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching story:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  if (!data) {
    return new Response(JSON.stringify({ error: 'Story not found' }), {
      status: 404,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // Ensure compatibility with the mock data structure
  const story = {
    ...data,
    featured: data.featured || false,
    size: data.size || 'medium'
  };

  return new Response(JSON.stringify(story), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
} 