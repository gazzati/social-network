import { ThunkAction } from 'redux-thunk'
import { NewsType } from '../types/types'
import { StateType, InferActionsTypes } from '.'
import { getNewsData } from '../api/news-api'

const initialState = {
  news: [] as Array<NewsType>,
  isFetching: true as boolean,
  pageSize: 5 as number,
  totalNewsCount: 0 as number,
  currentPage: 1 as number,
  category: 'general' as string
}

type InitialState = typeof initialState

const newsReducer = (state = initialState, action: ActionsTypes): InitialState => {
  switch (action.type) {
    case 'SET_NEWS':
      return {
        ...state,
        news: action.news
      }
    case 'SET_CURRENT_PAGE': {
      return { ...state, currentPage: action.currentPage }
    }
    case 'SET_TOTAL_NEWS_COUNT': {
      return { ...state, totalNewsCount: action.count }
    }
    case 'SET_CATEGORY': {
      return { ...state, category: action.category }
    }
    case 'TOGGLE_IS_FETCHING': {
      return { ...state, isFetching: action.isFetching }
    }
    default:
      return state
  }
}

type ActionsTypes = InferActionsTypes<typeof actions>

export const actions = {
  setNews: (news: Array<NewsType>) => ({ type: 'SET_NEWS', news } as const),
  toggleIsFetching: (isFetching: boolean) => ({ type: 'TOGGLE_IS_FETCHING', isFetching } as const),
  setCurrentPage: (currentPage: number) => ({ type: 'SET_CURRENT_PAGE', currentPage } as const),
  setTotalNewsCount: (totalNewsCount: number) => ({ type: 'SET_TOTAL_NEWS_COUNT', count: totalNewsCount } as const),
  setCategory: (category: string) => ({ type: 'SET_CATEGORY', category } as const)
}

type ThunkType = ThunkAction<Promise<void>, StateType, unknown, ActionsTypes>

export const getNews = (page: number, pageSize: number, category: string): ThunkType => async (dispatch) => {
  dispatch(actions.toggleIsFetching(true))
  dispatch(actions.setCurrentPage(page))
  dispatch(actions.setCategory(category))

  const data = await getNewsData(page, pageSize, category)
  dispatch(actions.setTotalNewsCount(data.totalResults))
  dispatch(actions.setNews(data.articles))
  dispatch(actions.toggleIsFetching(false))
}

export default newsReducer
