import {Redirect} from 'react-router-dom'
import React from 'react'
import {connect} from 'react-redux'
import {AppStateType} from '../redux'
import {getAuthUserData} from '../redux/auth-reducer'

type MapPropsType = {
    isAuth: boolean
    isFetching: boolean
    getAuthUserData: () => void
}

export function withAuthRedirect<WCP>(WrappedComponent: React.ComponentType<WCP>) {

    function RedirectComponent(props: MapPropsType) {
        let { isAuth, isFetching, getAuthUserData, ...restProps } = props

        if (!isAuth) return <Redirect to="/login"/>
        return <WrappedComponent {...restProps as WCP}/>
    }

    return connect(mapStateToPropsForRedirect, { getAuthUserData })(RedirectComponent)
}

const mapStateToPropsForRedirect = (state: AppStateType) => ({
    isAuth: state.auth.isAuth,
    isFetching: state.auth.isFetching
})
