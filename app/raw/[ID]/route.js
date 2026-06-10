import { createClient } from '@supabase/supabase-js'

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY)

export async function GET(request, { params }) {
    const { id } = params
    const { data, error } = await supabase.from('scripts').select('content').eq('id', id).single()
    
    if (error || !data) return new Response('Script not found', { status: 404 })

    return new Response(data.content, {
        headers: { 
            'Content-Type': 'text/plain; charset=utf-8',
            'Access-Control-Allow-Origin': '*'
        }
    })
}
