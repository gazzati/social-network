import axios from 'axios'
import {NewsType} from '../types/types'

type NewsResponseType = {
    totalResults: number
    status: string
    articles: Array<NewsType>
}

const apiKey = '3d368681f4414a9fb4ffa48ef6d52ea6'

export const getNewsData = (currentPage: number, pageSize: number, category: string) => {
    return axios.get<NewsResponseType>(`https://newsapi.org/v2/top-headlines?` +
        `category=${category}&country=ru&apiKey=${apiKey}&pageSize=${pageSize}&page=${currentPage}`)
        .then(res => res.data)

}
