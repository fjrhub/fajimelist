import { getAnimeResponse } from '@/libs/api-libs'
import VideoPlayer from '@/components/Utilities/VideoPlayer'
import Image from 'next/image'
import CollectionButton from '@/components/AnimeList/CollectionButton'
import { authUserSession } from '@/libs/auth-libs'
import { supabaseAdmin } from '@/libs/supabase'
import CommentInput from '@/components/AnimeList/CommentInput'
import CommentBox from '@/components/AnimeList/CommentBox'

const Page = async ({ params: { id } }) => {
  const anime = await getAnimeResponse(`anime/${id}`)
  const user = await authUserSession()
  const { data } = await supabaseAdmin
    .from('fajime')
    .select('*')
    .eq('user_email', user?.email)
    .eq('anime_mal_id', id)
    .single()

  return (
    <main className="w-full px-4 py-8 sm:px-6 md:px-10 lg:px-20 xl:px-32 text-color-primary bg-[#0f0f0f] min-h-screen">
      {/* Header */}
      <section className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">
            {anime.data.title}{' '}
            <span className="text-lg text-gray-400">
              ({anime.data.year})
            </span>
          </h1>
          <div className="w-20 h-1 bg-yellow-500 rounded-full" />
        </div>
        {!data && user && (
          <CollectionButton
            anime_mal_id={id}
            user_email={user?.email}
            anime_title={anime.data.title}
            anime_image={anime.data.images.webp.image_url}
          />
        )}
      </section>

      {/* Info Cards */}
      <section className="grid grid-cols-2 sm:grid-cols-5 gap-4 mb-10">
        {[
          { label: 'Peringkat', value: anime.data.rank },
          { label: 'Skor', value: anime.data.score },
          { label: 'Anggota', value: anime.data.members.toLocaleString() },
          { label: 'Episode', value: anime.data.episodes },
          { label: 'Source', value: anime.data.source },
        ].map((info) => (
          <div
            key={info.label}
            className="flex flex-col items-center justify-center bg-gradient-to-b from-[#1c1c1c] to-[#121212] border border-gray-800 rounded-2xl py-4 shadow-lg hover:shadow-xl hover:bg-[#1f1f1f] transition-all duration-200"
          >
            <h3 className="text-sm text-gray-400">{info.label}</h3>
            <p className="text-xl font-semibold text-white mt-1">
              {info.value ?? '-'}
            </p>
          </div>
        ))}
      </section>

      {/* Gambar + Sinopsis */}
      <section className="grid grid-cols-1 lg:grid-cols-[350px_1fr] gap-8 mb-12">
        <div className="flex flex-col items-center">
          <Image
            src={anime.data.images.webp.image_url}
            alt={anime.data.title}
            width={400}
            height={600}
            priority
            className="rounded-2xl w-full h-auto shadow-2xl border border-gray-800"
          />
        </div>
        <div className="bg-[#1a1a1a] p-6 rounded-2xl border border-gray-800 leading-relaxed text-gray-300 text-base sm:text-lg text-justify shadow-md hover:shadow-lg transition-all duration-200">
          <p>{anime.data.synopsis}</p>
        </div>
      </section>

      {/* Trailer */}
      {anime.data.trailer?.youtube_id && (
        <section className="mb-14 w-full">
          <h2 className="text-2xl font-semibold text-white mb-4 border-l-4 border-yellow-500 pl-3">
            🎥 Trailer
          </h2>
          <div className="relative w-full pb-[56.25%] h-0 overflow-hidden rounded-xl shadow-xl border border-gray-800">
            <div className="absolute top-0 left-0 w-full h-full">
              <VideoPlayer youtubeId={anime.data.trailer.youtube_id} />
            </div>
          </div>
        </section>
      )}

      {/* Komentar */}
      <section className="mb-16 mt-12 w-full">
        <h2 className="text-2xl font-semibold text-white mb-6 border-l-4 border-yellow-500 pl-3">
          💬 Komentar Penonton
        </h2>

        <div className="space-y-10 w-full">
          <CommentBox anime_mal_id={id} />

          {user ? (
            <div className="bg-[#111] rounded-2xl p-6 border border-gray-700 w-full shadow-md hover:shadow-lg transition-all duration-200">
              <h3 className="text-gray-300 mb-4 font-semibold text-lg">
                Tambahkan Komentar
              </h3>
              <CommentInput
                anime_mal_id={id}
                user_email={user?.email}
                username={user?.name}
                anime_title={anime.data.title}
                photo_url={user?.image}
              />
            </div>
          ) : (
            <p className="text-gray-400 text-sm py-10 text-center w-full">
              Silakan login untuk menulis komentar.
            </p>
          )}
        </div>
      </section>
    </main>
  )
}

export default Page
