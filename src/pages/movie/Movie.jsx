import Style from './movie.module.css'

import { useParams } from "react-router-dom"
import { useListFetch } from '../../API/useAPI.js'
import { AiOutlineRight } from 'react-icons/ai'
import Card from '../../components/card/Card'
import { useEffect, useState } from 'react'

const VITE_IMG = import.meta.env.VITE_IMG

export default function Movie() {
  const { movieId } = useParams()
  const [data, setData] = useState()
  
  const getMovie = async (currentMovie)=>{
    const response = await useListFetch([`${currentMovie}/similar`, currentMovie, `${currentMovie}/videos`])
    setData({ similar: response[`${currentMovie}/similar`], movieDetails: response[currentMovie], movieVideo: response[`${currentMovie}/videos`].results })
  }

  const getMoneyBR = (date) => date.split('-').reverse().join('/')

  const getRuntimerFormated = (time) => {
    let hor = Math.floor(time/60).toString()
    let min = (time%60).toString()
    return `${hor.padStart(2, 0)}:${min.padStart(2, 0)}${+hor > 0 ? 'h' : 'm'}`
  }

  const formatNumber = (num) => num === 0 ? 'sem informações' : new Intl.NumberFormat('pt-BR', {style: 'currency',currency: 'BRL', minimumFractionDigits: 2}).format(num)

  useEffect(()=>{
    getMovie(movieId)
  }, [movieId])

  if(!data) return <h2 className={Style.movieNotFound}>não foi possível encontrar o filme.</h2>
  
  return (
    <main>
      <h1 className={Style.movieTitle}>{data.movieDetails.title}</h1>

      <div>
        <div className={Style.details}>
          <img src={VITE_IMG + data.movieDetails.poster_path} title={`poster de ${data.movieDetails.title}`} />
          <div className={Style.info}>
            <h3>infomações</h3>
            <p>nome original: {data.movieDetails.original_title}</p>
            <p>nome traduzido: {data.movieDetails.title}</p>
            <p>duração: {getRuntimerFormated(data.movieDetails.runtime)}</p>
            <p>lançamento: {getMoneyBR(data.movieDetails.release_date)}</p>
            <p>orçamento: {formatNumber(data.movieDetails.budget)}</p>
            <p>receita: {formatNumber(data.movieDetails.revenue)}</p>
            <p className={Style.genres}>genêro: {data.movieDetails.genres.map(genre => <span key={genre.name}>{genre.name}</span>)}</p>
            <p className={Style.productionCompanies}>produzido por: {data.movieDetails.production_companies.map(company => <span key={company.name}>{company ? company.name : 'sem informações'}</span>)}</p>
          </div>
        </div>

        <p className={Style.sinopse}>
          <span>Sinopse: </span>
          {data.movieDetails.overview ? data.movieDetails.overview : 'sem informações'}
        </p>

        {data.movieVideo.length > 0 && 
          <div className={Style.videoPlay}>
            <iframe className={Style.trailer} src={`https://www.youtube-nocookie.com/embed/${data.movieVideo[0].key}`} title="YouTube video player" frameBorder='0' allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture;"></iframe>
            <a href={`https://www.youtube.com/watch?v=${data.movieVideo[0].key}`} target='_blank'>ver no youtube <AiOutlineRight /></a>
          </div>
        }
      </div>

      <div className={Style.similar}>
        <h2 className={Style.similarTitle}>semelhantes</h2>
        <ul className={Style.similarCardsContainer}>
          {data.similar && data.similar.results.slice(0, 6).map((movie, index)=>(
            <Card movie={movie} imgSRC={VITE_IMG + movie.poster_path} key={index}/>
          ))}
        </ul>
      </div>
    </main>
  )
}