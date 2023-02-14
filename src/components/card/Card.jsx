import Style from './card.module.css'
import { AiFillStar } from 'react-icons/ai'
import { Link } from 'react-router-dom'

export default function Card({ movie, imgSRC }) {
  const { title = movie.title, rating = movie.vote_average, movieId = movie.id } = movie
  
  return (
    <li className={Style.card} title={title}>
      <Link to={`/movie/${movieId}`}>
        <span className={Style.rating}>
          <AiFillStar className={Style.starRating}/>
          {rating.toString().substr(0, 3)}
        </span>
        <img className={Style.moviePoster} src={imgSRC} alt={`poster de ${movie.title}`} />
        <h2 className={Style.movieTitle}>{title}</h2>
      </Link>
    </li>
  )
}