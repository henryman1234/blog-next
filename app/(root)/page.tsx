import StartupCard, { StartupTypeCard } from "@/components/StartupCard";
import SearchForm from "../../components/SearchForm";
import { STARTUPS_QUERY } from "@/sanity/lib/queries";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import { auth } from "@/auth";

export default async function Home ({searchParams}: {searchParams:Promise<{query?: string}>}) {

  const query = (await searchParams).query
  const params = {search: query || null}
  const session =  await auth()
  
  const {data: posts} = await sanityFetch({query: STARTUPS_QUERY, params})


  return (
    <>
      <section className="pink_container">
        <h1 className="heading ">La connaissance se multiplie,<br/> 
        lorsqu'elle est partagée.</h1>

        <p className="sub-heading !max-w-3xl">
        Des articles pour chaque esprit curieux,
        partagez vos découvertes, inspirez les autres.
        </p>

        <SearchForm query={query}/>
        
      </section>

      <section className="section_container">
        <p className="text-30-semibold">
            {query ? `Résultats de recherche pour "${query}".`: "Tous les artcicles."}
        </p>

        <ul className="mt-7 card_grid">
          {posts?.length > 0 ? (
            posts.map(function(post: StartupTypeCard, index: number){
              return <StartupCard key={post?._id} post={post}/>
            }) 
          ): (<p className="no-results">Pas d'articles trouvés</p>)}
          
        </ul>

      </section>
      
      <SanityLive/>


    </>
  )
}