import AnimeList from "@/components/AnimeList"
import Header from "@/components/AnimeList/Header"

const Page = async () => {

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/top/anime?limit=8`)
  const topAnime = await response.json()
  return (
    <>
      {/* Anime Terpopuler */}
      <section>
      <Header title="Paling Populer" linkTitle="Lihat Semua" linkHref="/populer"/>
      </section>
      <AnimeList api={topAnime} />
    </>
  )
}

export default Page