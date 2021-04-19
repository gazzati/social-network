import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { nanoid } from 'nanoid'

import { StateType } from 'src/redux'
import { getNews } from 'src/redux/news'

import Paginator from 'src/components/common/Paginator'
import Preloader from 'src/components/common/Preloader'
import NewsItem from './NewsItem'

import s from './style.module.scss'

const News: React.FC = () => {
  const { news, isFetching, total, limit, page, category } = useSelector((state: StateType) => state.news)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getNews(page, limit))
  }, [])

  const onPageChanged = (pageNumber: number) => {
    dispatch(getNews(pageNumber, limit))
  }

  const onCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const term = e.target.value
    dispatch(getNews(page, limit, term))
  }

  return (
    <div className={s.news}>
      <div className={s.topBlock}>
        <Paginator currentPage={page} onPageChanged={onPageChanged} totalItemsCount={total} pageSize={limit} />

        <select className={s.select} defaultValue={category} onChange={(e) => onCategoryChange(e)}>
          <option value="business">Business</option>
          <option value="entertainment">Entertainment</option>
          <option value="general">General</option>
          <option value="health">Health</option>
          <option value="science">Science</option>
          <option value="sports">Sports</option>
          <option value="technology">Technology</option>
        </select>
      </div>

      {isFetching ? <Preloader /> : null}
      <div className={s.newsList}>
        {!news.length && !isFetching && <div className={s.notFound}>Not found news</div>}
        {news.map((item) => (
          <NewsItem key={nanoid()} newsItem={item} />
        ))}
      </div>
    </div>
  )
}

export default News
