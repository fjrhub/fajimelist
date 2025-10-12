'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

const CommentInput = ({ anime_mal_id, user_email, username, anime_title, photo_url }) => {
  const [comment, setComment] = useState('')
  const [isCreated, setIsCreated] = useState(false)
  const router = useRouter()

  const handleInput = (event) => setComment(event.target.value)

  const handlePosting = async (event) => {
    event.preventDefault()

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
    }
  }

  return (
    <div className="flex flex-col gap-2">
      {isCreated && <p className="text-green-400">Komentar terkirim!</p>}
      <textarea
        onChange={handleInput}
        value={comment}
        placeholder="Tulis pendapatmu di sini..."
        className="w-full h-32 p-3 rounded-lg bg-[#1a1a1a] border border-gray-700 text-white resize-none"
      />
      <button
        onClick={handlePosting}
        className="w-40 py-2 px-3 bg-color-accent rounded-lg hover:opacity-80 transition"
      >
        Posting
      </button>
    </div>
  )
}

export default CommentInput
