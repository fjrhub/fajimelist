import { supabaseAdmin } from "@/libs/supabase"

export async function POST(request) {
  try {
    const { anime_mal_id, user_email } = await request.json()

    if (!user_email || !anime_mal_id) {
      return Response.json({ status: 400, message: "Incomplete data", isCreated: false })
    }

    const { data: existing, error: checkError } = await supabaseAdmin
      .from("fajime")
      .select("user_email")
      .eq("user_email", user_email)
      .eq("anime_mal_id", anime_mal_id)

    if (checkError) {
      return Response.json({ status: 500, message: "Gagal cek data", isCreated: false })
    }

    if (existing.length > 0) {
      return Response.json({ status: 200, message: "Already added", isCreated: false })
    }

    const { error } = await supabaseAdmin
      .from("fajime")
      .insert([{ user_email, anime_mal_id }])

    if (error) {
      return Response.json({ status: 500, message: "Failed to add data", isCreated: false })
    }

    return Response.json({ status: 200, isCreated: true })
  } catch (err) {
    return Response.json({ status: 500, message: "A server error occurred", isCreated: false })
  }
}
