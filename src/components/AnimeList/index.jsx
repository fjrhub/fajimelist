import Image from 'next/image'
import Link from 'next/link'

const AnimeList = ({ api }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-4 px-4">
      {api.data?.map((anime, index) => {
        return (
          <Link
            href={`/anime/${anime.mal_id}`}
            className="cursor-pointer text-color-primary hover:text-color-accent transition-all"
            key={index}
          >
            <div className="w-full aspect-[2/3] relative overflow-hidden rounded">
              <Image
                src={anime.images.webp.image_url}
                alt={anime.title}
                fill
                className="object-cover"
              />
            </div>

            <h3 className="md:text-xl text-md ">{anime.title}</h3>
          </Link>
        )
      })}
    </div>
  )
}

export default AnimeList
