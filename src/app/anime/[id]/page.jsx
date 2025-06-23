import { getAnimeResponse } from '@/libs/api-libs'
import VideoPlayer from '@/components/Utilities/VideoPlayer'
import Image from 'next/image'
import CollectionButton from '@/components/AnimeList/CollectionButton'
import { authUserSession } from '@/libs/auth-libs'
import { supabaseAdmin } from '@/libs/supabase'

const Page = async ({ params: { id } }) => {
  const anime = await getAnimeResponse(`anime/${id}`)
  const user = await authUserSession()
  const { data, error } = await supabaseAdmin
    .from('fajime')
    .select('*')
    .eq('user_email', user?.email)
    .eq('anime_mal_id', id)
    .single()

  return (
    <>
      <div className="pt-4 px-4">
        <h3 className="text-2xl text-color-primary">
          {anime.data.title} - {anime.data.year}
        </h3>
        {!data && user && (
          <CollectionButton anime_mal_id={id} user_email={user?.email} />
        )}
      </div>
      <div className="pt-4 px-4 flex gap-2 text-color-primary overflow-x-auto ">
        <div className="w-36 flex flex-col justify-center items-center rounded border border-color-primary p-2">
          <h3>Peringkat</h3>
          <p>{anime.data.rank}</p>
        </div>
        <div className="w-36 flex flex-col justify-center items-center rounded border border-color-primary p-2">
          <h3>Skor</h3>
          <p>{anime.data.score}</p>
        </div>
        <div className="w-36 flex flex-col justify-center items-center rounded border border-color-primary p-2">
          <h3>Anggota</h3>
          <p>{anime.data.members}</p>
        </div>
        <div className="w-36 flex flex-col justify-center items-center rounded border border-color-primary p-2">
          <h3>Episode</h3>
          <p>{anime.data.episodes}</p>
        </div>
        <div className="w-36 flex flex-col justify-center items-center rounded border border-color-primary p-2">
          <h3>source</h3>
          <p>{anime.data.source}</p>
        </div>
      </div>
      <div className="pt-4 px-4 flex gap-2 text-color-primary sm:flex-nowrap flex-wrap">
        <Image
          src={anime.data.images.webp.image_url}
          alt={anime.data.images.jpg.image_url}
          width={250}
          height={250}
          className="w-full rounded object-cover"
        />
        <p className="text-justify text-xl">{anime.data.synopsis}</p>
      </div>
      <div>
        <VideoPlayer youtubeId={anime.data.trailer.youtube_id} />
      </div>
    </>
  )
}

export default Page
