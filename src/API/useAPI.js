import axios from 'axios'

const VITE_API = import.meta.env.VITE_API
const VITE_API_KEY = import.meta.env.VITE_API_KEY

export const useListFetch = async (arrReguests, query = '')=>{
  const requests = arrReguests.map((category) => axios.get(`${VITE_API}${query ? category : `movie/${category}`}?${VITE_API_KEY}&language=pt-BR${query ? `&query=${query}` : ''}&include_adult=false`))
  const dataRes = await axios.all(requests)
  
  return arrReguests.reduce((acc, currentValue, index)=>{
    acc[currentValue] = dataRes[currentValue]
    acc[currentValue] = dataRes[index].data
    return acc
  }, {})
}