import { supabaseAdmin } from '@/libs/supabase'

export async function POST(request) {
  try {
    const { anime_mal_id, user_email, comment, username, anime_title } = await request.json()

    if (!user_email || !anime_mal_id) {
      return Response.json({
        status: 400,
        message: 'Incomplete data',
        isCreated: false,
      })
    }

    const { data: existing, error: checkError } = await supabaseAdmin
      .from('fajimeComment')
      .select('user_email')
      .eq('user_email', user_email)
      .eq('anime_mal_id', anime_mal_id)
      .eq('username', username)
      .eq('comment', comment)
      .eq('anime_title', anime_title)

    if (checkError) {
      return Response.json({ status: 500, isCreated: false })
    }

    if (existing.length > 0) {
      return Response.json({ status: 200, isCreated: false })
    }

    const { error } = await supabaseAdmin
      .from('fajimeComment')
      .insert([{ anime_mal_id, user_email, username, comment, anime_title }])

    if (error) {
      return Response.json({ status: 500, isCreated: false })
    }

    return Response.json({ status: 200, isCreated: true })
  } catch (err) {
    return Response.json({ status: 500, isCreated: false })
  }
}
