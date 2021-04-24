import React, { FC } from 'react'

import { NewsType } from '../../types/types'
import formatDate from '../../helpers/formatDate'

import style from './style.module.scss'

type PropsType = {
  newsItem: NewsType
}

const NewsItem: FC<PropsType> = ({ newsItem }) => (
  <div className={style.newsItem}>
    <div className={style.mainInfo}>
      <a href={newsItem.url} target="_blank" rel="noopener noreferrer" className={style.title}>
        <b>{newsItem.title}</b>
      </a>
      <p className={style.description}>{newsItem.description}</p>
      <div className={style.info}>
        <a href={newsItem.url} className={style.publish} target="_blank" rel="noopener noreferrer">
          <b>{newsItem.provider.name}</b>
        </a>
        <div className={style.date}>{formatDate(newsItem.datePublished).getDate}</div>
      </div>
    </div>

    {newsItem.image.url && <img src={newsItem.image.url} alt="img" className={style.image} />}
  </div>
)

export default NewsItem
