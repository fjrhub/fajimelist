import { supabaseAdmin } from '@/libs/supabase'
import React from 'react'

const CommentBox = async ({anime_mal_id}) => {
    const { data, error } = await supabaseAdmin
    .from('fajimeComment')
    .select('*')
    .eq('anime_mal_id', anime_mal_id)

  return (
  <div className='grid grid-cols-4 gap-4 mb-4'>
    {data.map(data => {
        return (
            <div key={data.id} className='text-color-dark bg-color-primary p-4'>
                <p>{data.username}</p>
                <p>{data.comment}</p>
            </div>
        )
    })}
  </div>
)
}

export default CommentBox
