// import { createClient } from '../../../lib/supabaseClient';

import { createClient as createSupabaseClient } from '@supabase/supabase-js';

const createClient = () => {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
};
export async function POST(req: Request) {
    const supabase = await createClient();
    console.log('Supabase client created');
    console.log('Creating new story entry...');
    const { author, email, quote, description, outcome, date } = await req.json();
  
    console.log('Received data:', { author, email, quote, description, outcome, date });
    const { data, error } = await supabase
      .from('stories')
      .insert([
        {
          author,
          email,
          quote,
          description,
          outcome,
          date
        },
      ]);
  
      console.log(data, error);
    if (error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  
    return new Response(JSON.stringify(data), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  }