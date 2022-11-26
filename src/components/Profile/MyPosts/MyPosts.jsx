import React from "react";
import style from "./MyPosts.module.css";
import Post from "./Post/Post";
import { addPostActionCreator, updatePostInputActionCreator } from "./../../../redux/profileReducer";

function MyPosts(props) {

    let postsElements = props.state.posts.map(post => <Post message={post.message} likes={post.likes} />)

    function changeInput(event) {
        const input = event.target.value;
        props.dispatch( updatePostInputActionCreator(input) );
    }

    function addPost() {
        props.dispatch( addPostActionCreator() );
    }

    return (
        <div className={style.postsBlock}>
            <h3>My Posts</h3>
            <div>
                <textarea onChange={changeInput} value={props.state.userInputText} />
            </div>
            <div>
                <button onClick={addPost}>add post</button>
            </div>
            <div className={style.posts}>
                {postsElements}
            </div>
        </div>
    );
}

export default MyPosts;