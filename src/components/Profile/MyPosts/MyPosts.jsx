import React from "react";
import MyPostForm from "./MyPostForm/MyPostForm";
import style from "./MyPosts.module.css";
import Post from "./Post/Post";

const MyPosts = props => {
    
    const postsElements = props.posts.map(post => <Post key={post.id} id={post.id} like={props.like} message={post.message} likes={post.likes} />)

    function addPost(text) {
        props.addPost(text);
    }

    return (
        <div className={style.postsBlock}>
            <h3>My Posts</h3>
            <MyPostForm addPost={addPost}/>
            <div className={style.posts}>
                {postsElements.reverse()}
            </div>
        </div>
    );
};

export default MyPosts;