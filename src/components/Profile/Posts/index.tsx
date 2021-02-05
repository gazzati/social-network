import MyPosts from './Posts'
import {addPost, addLikes, deletePost} from '../../../redux/profile-reducer'
import {connect} from 'react-redux'
import {AppStateType} from '../../../redux'

const mapStateToProps = (state: AppStateType) => {
    return {
        profile: state.profilePage.profile
    }
}

const PostsContainer = connect(mapStateToProps, { addPost, addLikes, deletePost })(MyPosts)

export default PostsContainer
