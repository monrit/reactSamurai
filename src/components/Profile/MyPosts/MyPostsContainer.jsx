import { connect } from "react-redux";
import { addPost } from "./../../../redux/profileReducer";
import MyPosts from "./MyPosts";

function mapStateToProps(state) {
    return {
        state: state.profilePage
    }
}

const mapDispatchToProps = {
    addPost
}

export default connect(mapStateToProps, mapDispatchToProps)(MyPosts);