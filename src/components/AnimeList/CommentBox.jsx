import { supabaseAdmin } from '@/libs/supabase'
import React from 'react'
import { MessageCircle } from 'lucide-react'

const CommentBox = async ({ anime_mal_id }) => {
  // Ambil komentar berdasarkan anime_mal_id
  const { data, error } = await supabaseAdmin
    .from('fajimeComment')
    .select('id, username, comment, photo_url, created_at')
    .eq('anime_mal_id', anime_mal_id)
    .order('created_at', { ascending: false })

  // Error handling
  if (error) {
    console.error(error)
    return <p className="text-red-500 text-center">Gagal memuat komentar.</p>
  }

  // Jika belum ada komentar
  if (!data || data.length === 0) {
    return (
      <p className="text-gray-400 text-center italic">Belum ada komentar.</p>
    )
  }

  return (
    <div className="space-y-4 mt-6">
      {data.map((item) => (
        <div
          key={item.id}
          className="bg-[#1c1c27] hover:bg-[#232334] border border-[#2a2a3b] transition rounded-2xl p-5 shadow-sm"
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-3 text-sm text-gray-400">
            <p className="text-lg font-semibold text-white">{item.username}</p>

            <div className="flex items-center gap-1">
              <MessageCircle size={16} />
              <span>1</span>
            </div>
          </div>

          {/* Isi komentar */}
          <div className="space-y-3">
            <p className="text-gray-300 leading-relaxed">{item.comment}</p>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between mt-4 text-sm text-gray-400">
            <div className="flex items-center gap-3">
              <img
                src={
                  item.photo_url && item.photo_url.trim() !== ''
                    ? item.photo_url // gunakan foto asli user
                    : `https://api.dicebear.com/9.x/adventurer/svg?seed=${item.username}` // fallback
                }
                alt={item.username}
                className="w-8 h-8 rounded-full border border-gray-600 object-cover"
              />
              <span className="text-gray-300">{item.username}</span>
            </div>
            <span>
              {new Date(item.created_at).toLocaleString('id-ID', {
                dateStyle: 'short',
                timeStyle: 'short',
              })}
            </span>
          </div>
        </div>
      ))}
    </div>
  )
}

export default CommentBox
