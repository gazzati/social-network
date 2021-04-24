import axios from 'axios'
import { NewsType } from '../types/types'

type NewsResponseType = {
  value: Array<NewsType>
  totalCount: number
}

export const instance = axios.create({
  baseURL: 'https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/search/TrendingNewsAPI',
  headers: {
    'X-Rapidapi-Key': '2b0db3891emsh551209e8c62b87ep1346b2jsn00ceb6e160c4',
    'X-Rapidapi-Host': 'contextualwebsearch-websearch-v1.p.rapidapi.com',
    Host: 'contextualwebsearch-websearch-v1.p.rapidapi.com'
  }
})

export const getNewsData = (page: number, limit: number, category: string = 'general') => {
  console.log(category, page, limit)
  return instance.get<NewsResponseType>(`?location=us&pageNumber=${page}&pageSize=${limit}`).then((res) => res.data)
}
