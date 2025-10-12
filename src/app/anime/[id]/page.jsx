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
    <main className="px-4 py-6 sm:px-10 text-color-primary bg-[#0f0f0f] min-h-screen">
      {/* Header */}
      <section className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <h1 className="text-3xl font-bold text-white">
          {anime.data.title} <span className="text-lg text-gray-400">({anime.data.year})</span>
        </h1>

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
      <section className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-8">
        {[
          { label: 'Peringkat', value: anime.data.rank },
          { label: 'Skor', value: anime.data.score },
          { label: 'Anggota', value: anime.data.members.toLocaleString() },
          { label: 'Episode', value: anime.data.episodes },
          { label: 'Source', value: anime.data.source },
        ].map((info) => (
          <div
            key={info.label}
            className="flex flex-col items-center justify-center bg-[#1c1c1c] border border-gray-700 rounded-2xl py-3 hover:bg-[#252525] transition"
          >
            <h3 className="text-sm text-gray-400">{info.label}</h3>
            <p className="text-xl font-semibold text-white">{info.value ?? '-'}</p>
          </div>
        ))}
      </section>

      {/* Gambar dan Sinopsis */}
      <section className="flex flex-col sm:flex-row gap-6 mb-10">
        <div className="sm:w-1/3 w-full">
          <Image
            src={anime.data.images.webp.image_url}
            alt={anime.data.title}
            width={400}
            height={600}
            className="rounded-2xl w-full h-auto shadow-xl"
          />
        </div>
        <div className="sm:w-2/3 w-full text-justify leading-relaxed text-gray-300 text-lg bg-[#1a1a1a] p-5 rounded-2xl border border-gray-800">
          <p>{anime.data.synopsis}</p>
        </div>
      </section>

      {/* Trailer */}
      {anime.data.trailer?.youtube_id && (
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-white mb-3">🎥 Trailer</h2>
          <div className="rounded-xl overflow-hidden shadow-xl border border-gray-800">
            <VideoPlayer youtubeId={anime.data.trailer.youtube_id} />
          </div>
        </section>
      )}

      {/* Komentar */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-white mb-5">💬 Komentar Penonton</h2>

        {/* Kotak komentar */}
        <div className="bg-[#1a1a1a] border border-gray-800 rounded-2xl p-5 shadow-lg space-y-6">
          <CommentBox anime_mal_id={id} />

          {user ? (
            <div className="bg-[#111] rounded-xl p-4 border border-gray-700">
              <h3 className="text-gray-300 mb-2 font-semibold">Tambahkan Komentar</h3>
              <CommentInput
                anime_mal_id={id}
                user_email={user?.email}
                username={user?.name}
                anime_title={anime.data.title}
              />
            </div>
          ) : (
            <p className="text-gray-400 text-sm text-center">
              Silakan login untuk menulis komentar.
            </p>
          )}
        </div>
      </section>
    </main>
  )
}

export default Page
