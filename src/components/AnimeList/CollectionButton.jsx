'use client'

import React, { useState } from 'react'

const CollectionButton = ({ anime_mal_id, user_email }) => {
  const [isCreated, setIsCreated] = useState(false)

  const handleCollection = async (event) => {
    event.preventDefault()
    const data = { anime_mal_id, user_email }

    const response = await fetch('/api/v1/collection', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // penting!
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
          className="px-2 py-1 bg-color-accent"
        >
          Tambahkan ke Koleksi
        </button>
      )}
    </>
  )
}

export default CollectionButton
