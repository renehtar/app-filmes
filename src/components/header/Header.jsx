import Style from './header.module.css'

import { useState } from 'react'
import { BiSearchAlt } from 'react-icons/bi'
import { CgDarkMode } from 'react-icons/cg'
import { Link, useNavigate } from 'react-router-dom'

document.body.className = localStorage.getItem('theme')

const links = [
  {
    to:'/',
    title:'início',
  },
]

export default function Header() {
  const [searchValue, setSearchValue] = useState('')
  const navigate = useNavigate()

  const handleTheme = ()=>{
    document.body.classList.toggle('dark')
    localStorage.setItem('theme', document.body.className.includes('dark') ? 'dark' : '')
  }

  const handleSubmit = (e)=>{
    e.preventDefault()
    navigate(`/search/${searchValue.split(' ').join('-')}`, {replace: true})
  }

  return (
    <header className={Style.header}>
      <Link to="/">
        <h1 className={Style.title}>app filmes</h1>
      </Link>
      
      <nav className={Style.navbar}>
        {links.map(link => (
          <Link to={link.to} key={link.title}>{link.title}</Link>
        ))}
      </nav>

      <div className={Style.right}>

        <form onSubmit={handleSubmit}>
          <label className={Style.searchContainer}>
            <input type="text" className={Style.searchInput} name='textSearch' onChange={({currentTarget})=>setSearchValue(currentTarget.value)} value={searchValue} autoComplete='off' placeholder='procurar...' required minLength={2} />
            <button className={Style.buttonSubmit} type='submit'>
              <BiSearchAlt className={Style.searchIcon} type='submit' />
            </button>
          </label>
        </form>

        <CgDarkMode onClick={handleTheme} title='mudar thema'/>
      </div>
    </header>
  )
}
