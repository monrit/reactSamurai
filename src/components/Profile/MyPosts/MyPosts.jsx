import React from "react";
import style from "./MyPosts.module.css";
import Post from "./Post/Post";

function MyPosts(props) {

    let postsElements = props.state.posts.map(post => <Post message={post.message} likes={post.likes} />)

    let text = React.createRef();

    function changeInput() {
        props.dispatch({
            type: "UPDATE-POST-INPUT",
            input: text.current.value
        });
    }

    function addPost() {
        props.dispatch({
            type: "ADD-POST"
        });
    }

    return (
        <div className={style.postsBlock}>
            <h3>My Posts</h3>
            <div>
                <textarea ref={text} onChange={changeInput} value={props.state.userInputText} />
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