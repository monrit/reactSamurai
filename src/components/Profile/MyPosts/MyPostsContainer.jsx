import { connect } from "react-redux";
import { addPostActionCreator, updatePostInputActionCreator } from "./../../../redux/profileReducer";
import MyPosts from "./MyPosts";

function mapStateToProps(state) {
    return {
        state: state.profilePage
    }
}

function mapDispatchToProps(dispatch) {
    return {
        addPost: () => {
            dispatch( addPostActionCreator() );
        },
        onInputChange: (text) => {
            dispatch( updatePostInputActionCreator(text) );
        }
    }
}

const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts);

export default MyPostsContainer;