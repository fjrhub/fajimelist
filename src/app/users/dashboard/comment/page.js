import Header from '@/components/dashboard/Header'
import { authUserSession } from '@/libs/auth-libs'
import { supabaseAdmin } from '@/libs/supabase'
import Link from 'next/link'
import React from 'react'

const page = async () => {
  const user = await authUserSession()
  const { data, error } = await supabaseAdmin
    .from('fajimeComment')
    .select('*')
    .eq('user_email', user.email)

  return (
    <section className="mt-4 px-4 w-full">
      <Header title={'My Comment'} />

      <div className="grid grid-cols-1 py-2 gap-4">
        {data.map((data) => {
          return (
            <Link
              href={`/anime/${data.anime_mal_id}`}
              key={data.id}
              className="bg-color-primary text-color-dark p-4"
            >
              <p className="text-sm">{data.anime_title}</p>
              <p className="italic">{data.comment}</p>
            </Link>
          )
        })}
      </div>
    </section>
  )
}

export default page
