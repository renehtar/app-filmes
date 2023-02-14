import Style from './carousel.module.css'
import { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom'

export default function Carousel({ data, VITE_IMG }) {
  const [currentImagePosition, setCurrentImage] = useState(0)
  let limitImages = 5
  let idTimer = useRef()

  const timer = ()=>{
    idTimer.current = setInterval(() => {
      setCurrentImage(prev => prev < limitImages - 1 ? prev + 1 : 0)
    }, 4 * 1000) // 3 segundos
  }

  const handleClickControl = (index)=>{
    setCurrentImage(index)
    clearInterval(idTimer.current)
    timer()
  }

  useEffect(() => {
    timer()
    return () => clearInterval(idTimer.current)
  }, [])

  if(data)
  return (
    <div className={Style.carousel}>
      <ul className={Style.carouselContent}>
        {data.results.slice(0, limitImages).map((movie, index) =>(
          <li key={index} className={Style.carouselItem} style={{transform: `translateX(-${currentImagePosition * 100}%)`}}>
            <Link to={`/movie/${movie.id}`}>
              <img className={Style.carouselImage} src={VITE_IMG + movie.poster_path} />
            </Link>
          </li>  
        ))}
      </ul>

      <div className={Style.controls}>
        {data.results.slice(0, limitImages).map((_, index)=>(
          <span className={`${Style.sliderButton} ${currentImagePosition === index && Style.currentButton}`} onClick={()=>handleClickControl(index)} key={index}></span>
        ))}
      </div>

    </div>
  )
}
