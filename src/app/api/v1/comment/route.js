import { supabaseAdmin } from '@/libs/supabase'

/**
 * 📝 POST — Menambahkan komentar baru
 * Body JSON:
 * {
 *   anime_mal_id: string,
 *   anime_title: string,
 *   user_email: string,
 *   username: string,
 *   comment: string,
 *   photo_url: string
 * }
 */
export async function POST(request) {
  try {
    const { anime_mal_id, user_email, comment, username, anime_title, photo_url } = await request.json()

    if (!user_email || !anime_mal_id || !comment || !username || !anime_title) {
      return Response.json({
        status: 400,
        message: 'Incomplete data',
        isCreated: false,
      })
    }

    // 🔎 Cek apakah komentar identik sudah pernah dikirim
    const { data: existing, error: checkError } = await supabaseAdmin
      .from('fajimeComment')
      .select('id')
      .eq('user_email', user_email)
      .eq('anime_mal_id', anime_mal_id)
      .eq('username', username)
      .eq('comment', comment)
      .eq('anime_title', anime_title)

    if (checkError) {
      console.error('Check error:', checkError)
      return Response.json({ status: 500, message: 'Database check error', isCreated: false })
    }

    if (existing.length > 0) {
      return Response.json({ status: 200, message: 'Duplicate comment', isCreated: false })
    }

    // 💾 Simpan komentar baru ke database
    const { error: insertError } = await supabaseAdmin
      .from('fajimeComment')
      .insert([{ anime_mal_id, user_email, username, comment, anime_title, photo_url }])

    if (insertError) {
      console.error('Insert error:', insertError)
      return Response.json({ status: 500, message: 'Insert failed', isCreated: false })
    }

    return Response.json({ status: 200, message: 'Comment created', isCreated: true })
  } catch (err) {
    console.error('Unexpected error:', err)
    return Response.json({ status: 500, message: 'Internal Server Error', isCreated: false })
  }
}

/**
 * 📥 GET — Mengambil daftar komentar berdasarkan anime_mal_id
 * Contoh: /api/comment?anime_mal_id=5114
 */
export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const anime_mal_id = searchParams.get('anime_mal_id')

  if (!anime_mal_id) {
    return Response.json({ status: 400, message: 'anime_mal_id required' })
  }

  const { data, error } = await supabaseAdmin
    .from('fajimeComment')
    .select('id, username, comment, photo_url, created_at')
    .eq('anime_mal_id', anime_mal_id)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Fetch error:', error)
    return Response.json({ status: 500, message: 'Database fetch error' })
  }

  return Response.json({
    status: 200,
    total: data.length,
    comments: data,
  })
}
