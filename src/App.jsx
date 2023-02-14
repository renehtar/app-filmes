import './App.css'

import { Route, Routes } from 'react-router-dom'
import Footer from './components/footer/Footer'
import Header from './components/header/Header'
import Home from './pages/home/Home'
import Movie from './pages/movie/Movie'
import MovieSearched from './pages/movieSearched/MovieSearched'

export default function App() {

  return (
    <div className="App">
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='movie/:movieId' element={<Movie />} />
        <Route path='search/:movieSearchedId' element={<MovieSearched />} />
      </Routes>

      <Footer />
    </div>
  )
}
