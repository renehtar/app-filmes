import Style from './footer.module.css'

import { AiOutlinePlayCircle } from 'react-icons/ai'

export default function Footer() {
  return (
    <footer className={Style.footerContainer}>
      <p>feito por: <a href="https://www.linkedin.com/in/francisco-reneilson" target='_blank'>Francisco Reneilson.</a></p>
      <a href="https://www.themoviedb.org/">API usada</a>
      <p>projeto feito para fins de estudo baseado neste <a href="https://www.youtube.com/watch?v=XqxUHVVO7-U" target='_blank'>video <AiOutlinePlayCircle /></a></p>
    </footer>
  )
}
