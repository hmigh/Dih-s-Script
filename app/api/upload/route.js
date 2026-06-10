import { createClient } from '@supabase/supabase-js'

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY)

export async function POST(request) {
    try {
        const { content } = await request.json()
        if (!content) return new Response(JSON.stringify({ error: 'No content' }), { status: 400 })

        const { data, error } = await supabase.from('scripts').insert([{ content }]).select('id').single()
        
        if (error) return new Response(JSON.stringify({ error: error.message }), { status: 500 })
        return new Response(JSON.stringify({ id: data.id }), { status: 200 })
    } catch (e) {
        return new Response(JSON.stringify({ error: 'Server Error' }), { status: 500 })
    }
}
