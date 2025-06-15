import { getAnimeResponse } from "@/libs/api-libs"
import AnimeList from "@/components/AnimeList"
import Header from "@/components/AnimeList/Header"

const Page = async ({ params }) => {
  const { keyword } = params
  const decodedKeyword = decodeURI(keyword)
  const searchAnime = await getAnimeResponse("anime", `q=${decodedKeyword}`)
  return (
    <>
      {/* Anime Terpopuler */}
      <section>
      <Header title={`Pencarian untuk ${decodedKeyword}...`}/>
      </section>
      <AnimeList api={searchAnime} />
    </>
  )
}

export default Page