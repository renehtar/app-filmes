import Style from './movieSearched.module.css'

import { useParams } from 'react-router-dom'
import { useListFetch } from '../../API/useAPI'
import Card from '../../components/card/Card'
import { useEffect, useState } from 'react'

const VITE_IMG = import.meta.env.VITE_IMG

export default function MovieSearched() {
  const { movieSearchedId } = useParams()
  const [searchedList, setSearchedList] = useState()

  const getMovieSearched = async (currentSearch)=>{
    const response = await useListFetch([`/search/movie`], currentSearch)
    setSearchedList(response[`/search/movie`].results)
  }

  useEffect(()=>{
    getMovieSearched(movieSearchedId)
  },[movieSearchedId])

  if(searchedList?.length === 0) return <h2 className={Style.movieNotFound}>não foi possível encontrar "{movieSearchedId.split('-').join(' ')}"</h2>
  return (
    <main className={Style.mainContainer}>
      <h2 className={Style.textResult}>resultados para "{movieSearchedId.split('-').join(' ')}"</h2>
      
      <ul className={Style.cardsContainer}>
        {searchedList?.map((movie, index)=>(
          <Card movie={movie} imgSRC={VITE_IMG + movie.poster_path} key={index} />
        ))}
      </ul>
    </main>
  )
}