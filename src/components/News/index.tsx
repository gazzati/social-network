import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { StateType } from '../../redux'
import { getNews } from '../../redux/news-reducer'

import Paginator from '../common/Paginator'
import Preloader from '../common/Preloader'
import NewsItem from './NewsItem'

import s from './style.module.scss'

const News: React.FC = () => {
  const { news, isFetching, totalNewsCount, pageSize, currentPage, category } = useSelector(
    (state: StateType) => state.news
  )
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getNews(currentPage, pageSize, ''))
  }, [])

  const onPageChanged = (pageNumber: number) => {
    dispatch(getNews(pageNumber, pageSize, ''))
  }

  const onCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(getNews(currentPage, pageSize, e.target.value))
  }

  return (
    <div className={s.news}>
      <div className={s.topBlock}>
        <Paginator
          currentPage={currentPage}
          onPageChanged={onPageChanged}
          totalItemsCount={totalNewsCount}
          pageSize={pageSize}
        />

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
        {!news.length && !isFetching && <div>Sorry, only available with localhost</div>}
        {news.map((n) => (
          <NewsItem key={n.publishedAt.toString()} newsItem={n} />
        ))}
      </div>
    </div>
  )
}

export default News
