import {Redirect} from 'react-router-dom'
import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import {AppStateType} from '../redux'
import {getAuthUserData} from '../redux/auth-reducer'

type MapPropsType = {
    isAuth: boolean
    isFetching: boolean
    getAuthUserData: () => Promise<boolean | void>
}

export function withAuthRedirect<WCP>(WrappedComponent: React.ComponentType<WCP>) {

    function RedirectComponent(props: MapPropsType) {
        let { isAuth, isFetching, getAuthUserData, ...restProps } = props

        return <WrappedComponent {...restProps as WCP}/>
    }

    return connect(mapStateToPropsForRedirect, { getAuthUserData })(RedirectComponent)
}

const mapStateToPropsForRedirect = (state: AppStateType) => ({
    isAuth: state.auth.isAuth,
    isFetching: state.auth.isFetching
})
