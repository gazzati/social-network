import React, {FC} from 'react'
import s from './style.module.scss'
import ProfileInfo from './ProfileInfo'
import {ProfileType} from '../../types/types'
import PostsContainer from './Posts'

type PropsType = {
    profile: ProfileType
    isOwner: boolean
    savePhoto: (photo: any) => void
    updateStatus: (status: string) => void
    goToEditMode: () => void
}

const Profile: FC<PropsType> = (props) => {
    return (
        <div className={s.profile}>
            {props.profile && <>
                <ProfileInfo
                    isOwner={props.isOwner}
                    profile={props.profile}
                    updateStatus={props.updateStatus}
                    goToEditMode={props.goToEditMode}
                />
                <PostsContainer isOwner={props.isOwner}/>
            </>}
        </div>
    )
}

export default Profile
