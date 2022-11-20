import React from "react";
import style from "./MyPosts.module.css";
import Post from "./Post/Post";

function MyPosts(props) {

    let postsElements = props.posts.map(post => <Post message={post.message} likes={post.likes} />)

    let text = React.createRef();

    function changeInput() {
        props.updatePostInput(text.current.value);
    }

    return (
        <div className={style.postsBlock}>
            <h3>My Posts</h3>
            <div>
                <textarea ref={text} onChange={changeInput} value={props.userInputText} />
            </div>
            <div>
                <button onClick={props.addPost}>add post</button>
            </div>
            <div className={style.posts}>
                {postsElements}
            </div>
        </div>
    );
}

export default MyPosts;