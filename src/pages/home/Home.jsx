import Style from './home.module.css'

import { useQuery } from 'react-query'
import { useListFetch } from '../../API/useAPI'
import Card from '../../components/card/Card'
import Carrousel from '../../components/carousel/Carousel'
import Asider from '../../components/asider/Asider'

const VITE_IMG = import.meta.env.VITE_IMG

export default function Home() {
  const {data, isFetching} = useQuery('home', async () => {
    const response = await useListFetch(['popular','top_rated','upcoming'])
    return { popular: response['popular'].results, top_rated: response['top_rated'], upcoming: response['upcoming'].results }
  },{
    refetchOnWindowFocus: false,
  })
  
  if(isFetching) return <p className={Style.homeLoading}>carregando...</p>
  if(!isFetching && !data) return <p  className={Style.pageError}>não foi possível carregar a página.</p>
  return (
    <main className={Style.main}>

      <Carrousel data={data.top_rated} VITE_IMG={VITE_IMG}/>

      <section className={Style.popularContainer}>

        <div className={Style.popularTitleContainer}>
          <h1 className={Style.popularTitle}>populares</h1>
        </div>

        <div className={Style.mainContent}>

          <ul className={Style.cardsContainer}>
            {data.popular?.map((movie, index)=>(
                <Card movie={movie} imgSRC={VITE_IMG + movie.poster_path} key={index}/>
            ))}
          </ul>

          <Asider data={data} VITE_IMG={VITE_IMG}/>

        </div>

      </section>
    </main>
  )
}
