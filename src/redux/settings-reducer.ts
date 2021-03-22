const TOGGLE_BLACK_THEME = 'settings/TOGGLE_BLACK_THEME'
const TOGGLE_DYNAMIC_BACKGROUND = 'settings/TOGGLE_DYNAMIC_BACKGROUND'

const initialState = {
    isBlackThemeActivated: false,
    isDynamicBackgroundActivated: false
}

const settingsReducer = (state = initialState, action: any): InitialState => {
    switch (action.type) {
        case TOGGLE_BLACK_THEME: {
            const theme = action.theme ? 'light' : 'dark'
            document.documentElement.setAttribute('data-theme', theme)
            localStorage.setItem('black-theme', theme)
            return {
                ...state,
                isBlackThemeActivated: !action.theme
            }
        }
        case TOGGLE_DYNAMIC_BACKGROUND: {
            const theme = action.theme ? 'false' : 'true'
            localStorage.setItem('dynamic-bg', theme)
            return {
                ...state,
                isDynamicBackgroundActivated: !action.theme
            }
        }
        default:
            return state
    }
}

type ToggleBlackThemeActionType = { type: typeof TOGGLE_BLACK_THEME, theme: boolean }

type ToggleDynamicBackgroundType = { type: typeof TOGGLE_DYNAMIC_BACKGROUND, theme: boolean }

export const toggleBlackTheme = (theme: boolean): ToggleBlackThemeActionType => ({ type: TOGGLE_BLACK_THEME, theme })
export const toggleDynamicBackground = (theme: boolean): ToggleDynamicBackgroundType => ({ type: TOGGLE_DYNAMIC_BACKGROUND, theme })

export default settingsReducer

type InitialState = typeof initialState
