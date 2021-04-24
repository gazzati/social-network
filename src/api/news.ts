import axios from 'axios'
import { NewsType } from '../types/types'

type NewsResponseType = {
  value: Array<NewsType>
}

export const instance = axios.create({
  baseURL: 'https://bing-news-search1.p.rapidapi.com/news',
  headers: {
    'x-bingapis-sdk': 'true',
    'x-rapidapi-key': '2b0db3891emsh551209e8c62b87ep1346b2jsn00ceb6e160c4',
    'x-rapidapi-host': 'bing-news-search1.p.rapidapi.com'
  }
})

export const getNewsData = (page: number, limit: number, category: string) => {
  return instance
    .get<NewsResponseType>(`?mkt=en-US&category=${category}&offset=${limit * page}`)
    .then((res) => res.data)
}
