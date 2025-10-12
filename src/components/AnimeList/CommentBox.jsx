import { supabaseAdmin } from '@/libs/supabase'
import React from 'react'
import { MessageCircle } from 'lucide-react'

const CommentBox = async ({ anime_mal_id }) => {
  const { data, error } = await supabaseAdmin
    .from('fajimeComment')
    .select('id, username, comment, photo_url, created_at')
    .eq('anime_mal_id', anime_mal_id)
    .order('created_at', { ascending: false })

  if (error) {
    console.error(error)
    return <p className="text-red-500 text-center mt-6">Gagal memuat komentar.</p>
  }

  if (!data || data.length === 0) {
    return (
      <p className="text-gray-500 text-center italic mt-6">
        Belum ada komentar. Jadilah yang pertama!
      </p>
    )
  }

  return (
    <div className="space-y-8 mt-8 mb-8"> {/* Tambah jarak antar komentar */}
      {data.map((item) => (
        <div
          key={item.id}
          className="bg-[#141414] border border-[#2b2b2b] rounded-2xl p-6 hover:bg-[#1a1a1a] transition-all shadow-md"
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <img
                src={
                  item.photo_url && item.photo_url.trim() !== ''
                    ? item.photo_url
                    : `https://api.dicebear.com/9.x/adventurer/svg?seed=${item.username}`
                }
                alt={item.username}
                className="w-11 h-11 rounded-full border border-gray-700 object-cover"
              />
              <div>
                <p className="text-white font-semibold leading-tight">
                  {item.username}
                </p>
                <p className="text-xs text-gray-500 mt-0.5">
                  {new Date(item.created_at).toLocaleString('id-ID', {
                    dateStyle: 'short',
                    timeStyle: 'short',
                  })}
                </p>
              </div>
            </div>
            <MessageCircle size={18} className="text-gray-500" />
          </div>

          {/* Isi komentar */}
          <p className="text-gray-300 leading-relaxed border-l-2 border-color-accent pl-4">
            {item.comment}
          </p>
        </div>
      ))}
    </div>
  )
}

export default CommentBox
