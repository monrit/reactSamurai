import { connect } from "react-redux";
import { addPost, updatePostInput } from "./../../../redux/profileReducer";
import MyPosts from "./MyPosts";

function mapStateToProps(state) {
    return {
        state: state.profilePage
    }
}

const mapDispatchToProps = {
    addPost,
    updatePostInput
}

export default connect(mapStateToProps, mapDispatchToProps)(MyPosts);