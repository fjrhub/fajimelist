'use client'

import React, { useState } from 'react'

const CollectionButton = ({ anime_mal_id, user_email, anime_title, anime_image }) => {
  const [isCreated, setIsCreated] = useState(false)

  const handleCollection = async (event) => {
    event.preventDefault()
    const data = { anime_mal_id, user_email, anime_title, anime_image }

    const response = await fetch('/api/v1/collection', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    const collection = await response.json()
    console.log('Collection response:', collection)

    if (collection.isCreated) {
      setIsCreated(true)
    }
    return
  }

  return (
    <>
      {isCreated ? (
        <p className="text-color-primary">
          Berhasil ditambahkan ke koleksi!
        </p>
      ) : (
        <button
          onClick={handleCollection}
          className="bg-color-accent hover:bg-[#ffae00] text-black font-semibold px-4 py-2.5 rounded-xl transition"
        >
          Tambahkan ke Koleksi
        </button>
      )}
    </>
  )
}

export default CollectionButton
