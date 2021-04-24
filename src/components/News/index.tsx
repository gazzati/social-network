import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { StateType } from 'src/redux'
import { getNewsByPage, getNewsByCategory } from 'src/redux/news'

import Paginator from 'src/components/common/Paginator'
import Preloader from 'src/components/common/Preloader'
import NewsItem from './NewsItem'

import s from './style.module.scss'

const News: React.FC = () => {
  const { news, isFetching, total, limit, page, category } = useSelector((state: StateType) => state.news)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getNewsByPage(1))
  }, [])

  const onPageChanged = (pageNumber: number) => {
    dispatch(getNewsByPage(pageNumber))
  }

  const onCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const term = e.target.value
    dispatch(getNewsByCategory(term))
  }

  return (
    <div className={s.news}>
      <div className={s.topBlock}>
        <Paginator currentPage={page} onPageChanged={onPageChanged} totalItemsCount={total} pageSize={limit} />

        <select className={s.select} defaultValue={category} onChange={(e) => onCategoryChange(e)}>
          <option value="Business">Business</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Health">Health</option>
          <option value="Politics">Politics</option>
          <option value="ScienceAndTechnology">Science</option>
          <option value="Sports">Sports</option>
          <option value="World">World</option>
        </select>
      </div>

      {isFetching ? <Preloader /> : null}
      <div className={s.newsList}>
        {!news.length && !isFetching && <div className={s.notFound}>Not found news</div>}
        {news.map((item) => (
          <NewsItem key={item.datePublished} newsItem={item} />
        ))}
      </div>
    </div>
  )
}

export default News
