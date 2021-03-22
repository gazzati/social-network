import { connect } from 'react-redux'
import MyPosts from './Posts'
import { addLikes, addPost, deletePost } from '../../../redux/profile-reducer'
import { AppStateType } from '../../../redux'

const mapStateToProps = (state: AppStateType) => ({
  profile: state.profilePage.profile
})

const PostsContainer = connect(mapStateToProps, { addPost, addLikes, deletePost })(MyPosts)

export default PostsContainer
