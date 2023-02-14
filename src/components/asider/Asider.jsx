import { Link } from 'react-router-dom'
import Style from './asider.module.css'

export default function Asider({ data, VITE_IMG}) {
  return (
    <aside>
      <ul className={Style.releasesContainer}>
        {data.upcoming?.slice(0, 6).map((release, index)=>(
          <li className={Style.releasesCard} key={index}>
            <Link to={`/movie/${release.id}`} style={{textDecoration:'none'}}>
              <img src={VITE_IMG + release.poster_path} alt="" />
              <p className={Style.releaseTitle}>
                {release.title}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  )
}