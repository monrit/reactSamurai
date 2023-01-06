import { connect } from "react-redux";
import { addPost, like } from "./../../../redux/profileReducer";
import MyPosts from "./MyPosts";

function mapStateToProps(state) {
    return {
        posts: state.profilePage.posts
    }
}

const mapDispatchToProps = {
    addPost,
    like
}

export default connect(mapStateToProps, mapDispatchToProps)(MyPosts);