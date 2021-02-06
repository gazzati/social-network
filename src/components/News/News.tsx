import React, {FC} from 'react'
import s from './style.module.scss'
import Paginator from '../common/Paginator'
import Preloader from '../common/Preloader'
import NewsItem from './NewsItem'
import {NewsType} from '../../types/types'

type PropsType = {
    totalNewsCount: number
    pageSize: number
    currentPage: number
    category: string
    onPageChanged: (pageNumber: number) => void
    onCategoryChanged: (category: string) => void
    news: Array<NewsType>
    isFetching: boolean
}

const News: FC<PropsType> = ({
                                 news, currentPage, totalNewsCount, pageSize,
                                 category, onPageChanged, onCategoryChanged, isFetching
                             }) => {


    const onCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        onCategoryChanged(e.target.value)
    }

    return (
        <div className={s.news}>

            <div className={s.topBlock}>
                <Paginator currentPage={currentPage}
                       onPageChanged={onPageChanged}
                       totalItemsCount={totalNewsCount}
                       pageSize={pageSize}
                />

                <select className={s.select} defaultValue={category} onChange={e => onCategoryChange(e)}>
                    <option value="business">Business</option>
                    <option value="entertainment">Entertainment</option>
                    <option value="general">General</option>
                    <option value="health">Health</option>
                    <option value="science">Science</option>
                    <option value="sports">Sports</option>
                    <option value="technology">Technology</option>
                </select>
            </div>

            {isFetching ? <Preloader/> : null}
            <div className={s.newsList}>
                {news.map(n => <NewsItem key={n.publishedAt.toString()} newsItem={n}/>)}

            </div>
        </div>
    )
}

export default News
