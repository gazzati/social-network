import React, { useEffect } from 'react'
import { HashRouter, Redirect, Route, Switch, withRouter } from 'react-router-dom'
import { Provider, useDispatch, useSelector } from 'react-redux'
import { compose } from 'redux'

import store, { StateType } from './redux'
import { toggleBlackTheme, toggleDynamicBackground } from './redux/settings'
import { getAuthUserData } from './redux/auth'

import Users from './components/Users'
import Navbar from './components/Navbar'
import Profile from './components/Profile'
import Dialogs from './components/Dialogs'
import Header from './components/Header'
import LoginPage from './components/Login'
import Settings from './components/Settings'
import News from './components/News'
import Follow from './components/Follow'
import BackgroundEffect from './components/common/BackgroundEffect'
import Notification from './components/common/Notification'

import './styles/index.scss'

const App: React.FC = () => {
  const { isAuth, userData } = useSelector((state: StateType) => state.auth)
  const { isDynamicBackgroundActivated } = useSelector((state: StateType) => state.settings)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAuthUserData())
    dispatch(toggleBlackTheme(localStorage.getItem('black-theme') === 'light'))
    dispatch(toggleDynamicBackground(localStorage.getItem('dynamic-bg') === 'false'))
  }, [])

  return (
    <>
      {isDynamicBackgroundActivated && <BackgroundEffect />}
      <Notification />
      <Header />
      <main>
        <Navbar />
        <div className="wrapper">
          <Switch>
            <Route path="/users" render={() => <Users />} />

            <Route exact path="/settings" render={() => <Settings />} />

            <Route path="/news" render={() => <News />} />

            {!isAuth ? (
              <LoginPage />
            ) : (
              <>
                <Route path="/profile::userId?" render={() => <Profile />} />

                <Route path="/dialogs/:chatId?" render={() => <Dialogs />} />

                <Route path="/following" render={() => <Follow type="following" />} />

                <Route path="/followers" render={() => <Follow type="followers" />} />

                <Route exact path="/profile">
                  <Redirect to={`/profile:${userData.id}`} />
                </Route>

                <Route exact path="/">
                  <Redirect to={`/profile:${userData.id}`} />
                </Route>
              </>
            )}
          </Switch>
        </div>
      </main>
    </>
  )
}

const AppContainer = compose<React.FC>(withRouter)(App)

const MainApp: React.FC = () => (
  <HashRouter>
    <Provider store={store}>
      <AppContainer />
    </Provider>
  </HashRouter>
)

export default MainApp
