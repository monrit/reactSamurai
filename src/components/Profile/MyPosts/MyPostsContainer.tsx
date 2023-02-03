import { connect } from "react-redux";
import { AppStateType } from "../../../redux/reduxStore";
import { PostType } from "../../../types/types";
import { addPost, like, deletePost } from "./../../../redux/profileReducer";
import MyPosts from "./MyPosts";

type MapStateType = {
    posts: Array<PostType>,
    userName: string | null,
    profileAvatar: string | null | undefined
};

type DispathStateToPropsType = {
    addPost: (text: string) => void
    like: (id: number) => void
    deletePost: (id: number) => void
};

const mapStateToProps = (state: AppStateType): MapStateType => {
    return {
        posts: state.profilePage.posts,
        userName: state.auth.login,
        profileAvatar: state.profilePage.profile?.photos.small
    }
};

export default connect<MapStateType, DispathStateToPropsType, Object, AppStateType>(mapStateToProps, { addPost, like, deletePost })(MyPosts);