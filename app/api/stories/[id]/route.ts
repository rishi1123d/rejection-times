import { createClient as createSupabaseClient } from '@supabase/supabase-js';

const createClient = () => {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
};

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const supabase = createClient();

  console.log(params)
  const { data, error } = await supabase
    .from('stories')
    .select('*')
    .eq('id', params.id)
    .single();

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 404,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  return new Response(JSON.stringify(data), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}
