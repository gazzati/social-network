import React, {FC} from 'react'
import s from './style.module.scss'
import {NewsType} from '../../types/types'

type PropsType = {
    newsItem: NewsType
}

const NewsItem: FC<PropsType> = ({ newsItem }) => {
    const date = newsItem.publishedAt
    const formattedDate = `${date.slice(8, 10)}.${date.slice(5, 7)}.${date.slice(0, 4)} - ${date.slice(11, 13)}:${date.slice(14, 16)}`

    return (
        <div className={s.newsContainer}>
            <div className={s.newItem}>
                <a href={newsItem.url} target="_blank" rel="noopener noreferrer" className={s.title}>
                    <b>{newsItem.title}</b>
                </a>
                <p className={s.description}>{newsItem.description}</p>
                <a href={newsItem.url} target="_blank" rel="noopener noreferrer" className={s.img}>
                    {newsItem.urlToImage && <img src={newsItem.urlToImage} alt=""/>}
                </a>
                <div className={s.info}>
                    <a href={newsItem.url} className={s.publish} target="_blank" rel="noopener noreferrer">
                        <b>{newsItem.source.name}</b>
                    </a>
                    <div className={s.date}>{formattedDate}</div>
                </div>
            </div>
        </div>)
}

export default NewsItem
