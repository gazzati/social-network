import React, {useEffect} from 'react'
import {/*BrowserRouter,*/ HashRouter, Route, Switch, withRouter} from 'react-router-dom'
import {connect, Provider} from 'react-redux'
import {compose} from 'redux'
import store, {AppStateType} from './redux'
import {toggleBlackTheme, toggleDynamicBackground} from './redux/settings-reducer'
import {getAuthUserData} from './redux/auth-reducer'

import UsersContainer from './components/Users'
import Navbar from './components/Navbar'
import ProfileContainer from './components/Profile'
import DialogsContainer from './components/Dialogs'
import Header from './components/Header'
import LoginPage from './components/Login'
import Settings from './components/Settings'
import NewsContainer from './components/News'
import FollowContainer from './components/Follow'
import BackgroundEffect from './components/BackgroundEffect'

import './styles/index.scss'
import Login from "./components/Login";

type PropsType = {
    isAuth: boolean
    isDynamicBackgroundActivated: boolean
    getAuthUserData: () => boolean
    toggleBlackTheme: (theme: boolean) => void
    toggleDynamicBackground: (theme: boolean) => void
}

const App: React.FC<PropsType> = ({ isAuth, isDynamicBackgroundActivated, getAuthUserData, toggleBlackTheme, toggleDynamicBackground}) => {
    useEffect(() => {
        getAuthUserData()
        toggleBlackTheme(localStorage.getItem('black-theme') === 'light')
        toggleDynamicBackground(localStorage.getItem('dynamic-bg') === 'false')
        // eslint-disable-next-line
    }, [])

    return (
        <>
            {isDynamicBackgroundActivated && <BackgroundEffect />}
            <Header/>
            <main>
                <Navbar/>
                <div className="wrapper">
                    <Switch>

                        <Route path='/users'
                               render={() => <UsersContainer/>}/>

                        <Route exact path='/settings'
                               render={() => <Settings/>}/>

                        <Route path='/news'
                               render={() => <NewsContainer/>}/>

                        {!isAuth
                            ? <Login/>
                            : <>
                                <Route path='/profile/:userId?'
                                       render={() => <ProfileContainer/>}/>

                                <Route path='/dialogs/:chatId?'
                                       render={() => <DialogsContainer/>}/>

                                <Route path='/following'
                                       render={() => <FollowContainer type='following'/>}/>

                                <Route path='/followers'
                                       render={() => <FollowContainer type='followers'/>}/>
                            </>
                        }

                        <Route exact path='/login'
                               render={() => <LoginPage/>}/>

                    </Switch>
                </div>
            </main>
        </>
    )
}

let mapStateToProps = (state: AppStateType) => ({
    isDynamicBackgroundActivated: state.settings.isDynamicBackgroundActivated,
    isAuth: state.auth.isAuth
})

const AppContainer = compose<React.FC>(withRouter, connect(
    mapStateToProps, { getAuthUserData, toggleBlackTheme, toggleDynamicBackground}))(App)

const MainApp: React.FC = () => {
    return <HashRouter>
        <Provider store={store}>
            <AppContainer/>
        </Provider>
    </HashRouter>
}

export default MainApp
