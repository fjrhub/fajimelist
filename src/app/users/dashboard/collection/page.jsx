import Image from 'next/image'
import Link from 'next/link'
import Header from '@/components/dashboard/Header'
import { supabaseAdmin } from '@/libs/supabase'
import { authUserSession } from '@/libs/auth-libs'

const Page = async () => {
  const user = await authUserSession()
  const { data, error } = await supabaseAdmin
    .from('fajime')
    .select('*')
    .eq('user_email', user?.email)

  return (
    <section className="mt-4 px-4 w-full">
      <Header title={'My Collection'} />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid_cols-4">
        {data.map((data, index) => {
          return (
            <Link key={index} href={`/anime/${data.anime_mal_id}`} className="relative border-2 border-color-accent">
              <Image
                scr=""
                alt=""
                width={350}
                height={350}
                className="w-full"
              />
              <div className="absolute flex items-center justify-center bottom-0 w-full bg-color-accent h-16">
                <h5 className="text-xl text-center">{data.anime_mal_id}</h5>
              </div>
            </Link>
          )
        })}
      </div>
    </section>
  )
}

export default Page
