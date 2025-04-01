import { createClient as createSupabaseClient } from '@supabase/supabase-js';

const createClient = () => {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
};


export async function GET(req: Request) {

  const supabase = await createClient();
  console.log('Supabase client created');
  console.log('Fetching stories from Supabase...');
  const { data, error } = await supabase.from('stories').select("*");
  // SELECT * FROM stories WHERE featured = true;

  console.log(data, error);
  if (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  return new Response(JSON.stringify(data), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}
