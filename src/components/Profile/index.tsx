import React, {useEffect, useState} from 'react'
import Profile from './Profile'
import ProfileEditForm from './ProfileEditForm'
import {connect} from 'react-redux'
import {getUserProfile, savePhoto, saveProfile, updateStatus} from '../../redux/profile-reducer'
import {compose} from 'redux'
import {withRouter, RouteComponentProps} from 'react-router-dom'
import {withAuthRedirect} from '../../hoc/withAuthRedirect'
import {AppStateType} from '../../redux'
import {ProfileType, ProfileInfoType} from '../../types/types'
import Preloader from '../common/Preloader'

type MapPropsType = ReturnType<typeof mapStateToProps>

type DispatchPropsType = {
    getUserProfile: (userId: string) => void
    updateStatus: (status: string) => void
    savePhoto: (photo: File) => void
    saveProfile: (profile: ProfileInfoType) => Promise<any>
}

type PathParamsType = {
    userId: string
}

type PropsType = MapPropsType & DispatchPropsType & RouteComponentProps<PathParamsType>

const ProfileContainer: React.FC<PropsType> = (props) => {
    const [editMode, setEditMode] = useState(false)
    const isOwner = props.authId === props.match.params.userId || !props.match.params.userId

    const exitOfEditMode = () => {
        setEditMode(false)
    }

    const goToEditMode = () => {
        setEditMode(true)
    }

    const onSubmit = (formData: ProfileInfoType) => {
        // TODO: remove then
        props.saveProfile(formData).then(
            () => exitOfEditMode()
        )
    }

    useEffect(() => {
        let userId: string | null = props.match.params.userId
        if (!userId) {
            userId = props.authorizedUserId
            if (!userId) {
                props.history.push('/login')
            }
        }

        if (!userId) {
            console.error('ID should exists in URI params or in state (\'authorizedUserId\')')
        } else {
            props.getUserProfile(userId)
        }
        // eslint-disable-next-line
    }, [])

    return (
        <div>
            {props.isLoading && <Preloader/>}
            {editMode ?
                <ProfileEditForm
                    profile={props.profile as ProfileType}
                    onSubmit={onSubmit}
                    savePhoto={props.savePhoto}
                    exitOfEditMode={exitOfEditMode}
                    isOwner={isOwner}
                    isLoading={props.isLoading}
                />
                : <Profile
                    savePhoto={props.savePhoto}
                    isOwner={isOwner}
                    profile={props.profile}
                    updateStatus={props.updateStatus}
                    goToEditMode={goToEditMode}
                />
            }
        </div>
    )
}

const mapStateToProps = (state: AppStateType) => ({
    profile: state.profilePage.profile,
    authorizedUserId: state.auth.userData.id,
    authId: state.auth.userData.id,
    isLoading: state.profilePage.isFetching
})

export default compose<React.ComponentType>(
    connect(mapStateToProps, { getUserProfile, updateStatus, savePhoto, saveProfile }),
    withRouter,
    withAuthRedirect)
(ProfileContainer)
