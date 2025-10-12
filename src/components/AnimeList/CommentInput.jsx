'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

const CommentInput = ({ anime_mal_id, user_email, username, anime_title, photo_url }) => {
  const [comment, setComment] = useState('')
  const [isCreated, setIsCreated] = useState(false)
  const router = useRouter()

  const handlePosting = async (event) => {
    event.preventDefault()
    if (!comment.trim()) return

    const data = { anime_mal_id, user_email, username, anime_title, comment, photo_url }

    const response = await fetch('/api/v1/comment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })

    const postComment = await response.json()
    if (postComment.isCreated) {
      setIsCreated(true)
      setComment('')
      router.refresh()
      setTimeout(() => setIsCreated(false), 2500)
    }
  }

  return (
    <form onSubmit={handlePosting} className="flex flex-col gap-4 mt-10">
      {/* Notifikasi */}
      {isCreated && (
        <p className="text-green-400 text-sm bg-[#153d2b] px-3 py-2 rounded-lg border border-green-700">
          ✅ Komentar berhasil dikirim!
        </p>
      )}

      {/* Textarea */}
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Tulis pendapatmu di sini..."
        className="w-full h-28 p-4 rounded-xl bg-[#1a1a1a] border border-gray-700 text-gray-100 resize-none 
                   focus:outline-none focus:border-color-accent focus:ring-1 focus:ring-color-accent transition"
      />

      {/* Tombol */}
      <div className="flex justify-end">
        <button
          type="submit"
          className="bg-color-accent hover:bg-[#ffae00] text-black font-semibold px-6 py-2.5 rounded-xl transition"
        >
          Posting
        </button>
      </div>
    </form>
  )
}

export default CommentInput
