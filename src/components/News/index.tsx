import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { NewsType } from '../../types/types'
import { AppStateType } from '../../redux'
import News from './News'
import { getNews } from '../../redux/news-reducer'

type MapStatePropsType = {
  isFetching: boolean
  news: Array<NewsType>
  currentPage: number
  totalNewsCount: number
  pageSize: number
  category: string
}

type MapDispatchPropsType = {
  getNews: (currentPage: number, pageSize: number, category: string) => void
}

type PropsType = MapStatePropsType & MapDispatchPropsType

const NewsContainer: React.FC<PropsType> = ({
  isFetching,
  news,
  currentPage,
  totalNewsCount,
  pageSize,
  category,
  getNews
}) => {
  useEffect(() => {
    getNews(currentPage, pageSize, '')
    // eslint-disable-next-line
  }, [])

  const onPageChanged = (pageNumber: number) => {
    getNews(pageNumber, pageSize, '')
  }

  const onCategoryChanged = (category: string) => {
    getNews(currentPage, pageSize, category)
  }

  return (
    <News
      onPageChanged={onPageChanged}
      onCategoryChanged={onCategoryChanged}
      news={news}
      isFetching={isFetching}
      totalNewsCount={totalNewsCount}
      pageSize={pageSize}
      currentPage={currentPage}
      category={category}
    />
  )
}

const mapStateToProps = (state: AppStateType): MapStatePropsType => ({
  news: state.news.news,
  isFetching: state.news.isFetching,
  pageSize: state.news.pageSize,
  totalNewsCount: state.news.totalNewsCount,
  currentPage: state.news.currentPage,
  category: state.news.category
})

export default connect(mapStateToProps, { getNews })(NewsContainer)
