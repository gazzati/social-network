import axios from 'axios'
import { NewsType } from '../types/types'

type NewsResponseType = {
  data: Array<NewsType>
  pagination: {
    count: number
    limit: number
    offset: number
    total: number
  }
}

const baseUrl = 'http://api.mediastack.com/v1/news'
const apiKey = '8589b3def0cb55eae5e810ea67bd8d67'

export const getNewsData = (page: number, limit: number, category: string = 'general') =>
  axios
    .get<NewsResponseType>(
      `${baseUrl}?access_key=${apiKey}&languages=en&categories=${category}&limit=${limit}&offset=${page * limit}`
    )
    .then((res) => res.data)
