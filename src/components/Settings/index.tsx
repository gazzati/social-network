import React from 'react'
import s from './style.module.scss'
import cn from 'classnames'
import {connect} from 'react-redux'
import {toggleBlackTheme, toggleDynamicBackground} from '../../redux/settings-reducer'
import {compose} from 'redux'
import {AppStateType} from '../../redux'

let mapStateToProps = (state: AppStateType) => ({
    isBlackThemeActivated: state.settings.isBlackThemeActivated,
    isDynamicBackgroundActivated: state.settings.isDynamicBackgroundActivated
})

type PropsType = {
    isBlackThemeActivated: boolean
    isDynamicBackgroundActivated: boolean
    toggleBlackTheme: (theme: boolean) => void
    toggleDynamicBackground: (theme: boolean) => void
}

const Settings: React.FC<PropsType> = ({ isBlackThemeActivated, isDynamicBackgroundActivated,
                                           toggleBlackTheme, toggleDynamicBackground }) => {
    return (
        <div className={s.settings}>
            <div className={s.settingsItem}>
                <span className={s.label}>Night theme</span>
                <span onClick={() => toggleBlackTheme(isBlackThemeActivated)}
                      className={cn({ [s.switchOn]: isBlackThemeActivated }, s.button)}
                />
            </div>
            <div className={s.settingsItem}>
                <span className={s.label}>Dynamic background</span>
                <span onClick={() => toggleDynamicBackground(isDynamicBackgroundActivated)}
                      className={cn({ [s.switchOn]: isDynamicBackgroundActivated }, s.button)}
                />
            </div>
        </div>
    )
}

export default compose(connect(mapStateToProps, { toggleBlackTheme, toggleDynamicBackground }))(Settings)
