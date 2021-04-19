import { ThunkAction } from 'redux-thunk'
import { NewsType } from 'src/types/types'
import { getNewsData } from 'src/api/news-api'
import { StateType, InferActionsTypes } from '.'

const initialState = {
  news: [] as Array<NewsType>,
  isFetching: true as boolean,
  total: 0 as number,
  page: 1 as number,
  limit: 10 as number,
  category: 'general' as string
}

type InitialState = typeof initialState

const news = (state = initialState, action: ActionsTypes): InitialState => {
  switch (action.type) {
    case 'SET_NEWS':
      return {
        ...state,
        news: action.news.filter((v, i, a) => a.findIndex((t) => t.title === v.title) === i)
      }
    case 'SET_CURRENT_PAGE': {
      return { ...state, page: action.page }
    }
    case 'SET_TOTAL_NEWS_COUNT': {
      return { ...state, total: action.count }
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

export const actions = {
  setNews: (news: Array<NewsType>) => ({ type: 'SET_NEWS', news } as const),
  toggleIsFetching: (isFetching: boolean) => ({ type: 'TOGGLE_IS_FETCHING', isFetching } as const),
  setCurrentPage: (page: number) => ({ type: 'SET_CURRENT_PAGE', page } as const),
  setTotalNewsCount: (total: number) => ({ type: 'SET_TOTAL_NEWS_COUNT', count: total } as const),
  setCategory: (category: string) => ({ type: 'SET_CATEGORY', category } as const)
}

export const getNews = (page: number, limit: number, category?: string): ThunkType => async (dispatch) => {
  dispatch(actions.toggleIsFetching(true))
  dispatch(actions.setCurrentPage(page))
  category && dispatch(actions.setCategory(category))

  const res = await getNewsData(page, limit, category)
  dispatch(actions.setTotalNewsCount(res.pagination.total))
  dispatch(actions.setNews(res.data))
  dispatch(actions.toggleIsFetching(false))
}

type ActionsTypes = InferActionsTypes<typeof actions>
type ThunkType = ThunkAction<Promise<void>, StateType, unknown, ActionsTypes>

export default news
