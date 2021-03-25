import React from 'react'
import cn from 'classnames'
import { useDispatch, useSelector } from 'react-redux'

import { toggleBlackTheme, toggleDynamicBackground } from '../../redux/settings-reducer'
import { StateType } from '../../redux'

import s from './style.module.scss'

const Settings: React.FC = () => {
  const { isBlackThemeActivated, isDynamicBackgroundActivated } = useSelector((state: StateType) => state.settings)
  const dispatch = useDispatch()

  return (
    <div className={s.settings}>
      <div className={s.settingsItem}>
        <span className={s.label}>Night theme</span>
        <span
          onClick={() => dispatch(toggleBlackTheme(isBlackThemeActivated))}
          className={cn({ [s.switchOn]: isBlackThemeActivated }, s.button)}
        />
      </div>
      <div className={s.settingsItem}>
        <span className={s.label}>Dynamic background</span>
        <span
          onClick={() => dispatch(toggleDynamicBackground(isDynamicBackgroundActivated))}
          className={cn({ [s.switchOn]: isDynamicBackgroundActivated }, s.button)}
        />
      </div>
    </div>
  )
}

export default Settings
