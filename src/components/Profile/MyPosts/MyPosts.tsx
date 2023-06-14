import React, { FC } from "react";
import { PostType } from "../../../types/types";
import MyPostForm from "./MyPostForm/MyPostForm";
import style from "./MyPosts.module.css";
import Post from "./Post/Post";

type PropsType = {
    posts: Array<PostType>,
    userName: string | null,
    profileAvatar: string | null | undefined,
    deletePost: (id: number) => void,
    like: (id: number) => void,
    addPost: (text: string) => void  
};

const MyPosts: FC<PropsType> = ({ posts, profileAvatar, userName, deletePost, like, addPost }) => {

    const postsElements = posts.map(post => <Post
        key={post.id}
        id={post.id}
        profileAvatar={profileAvatar}
        userName={userName}
        deletePost={deletePost}
        like={like}
        message={post.message}
        likes={post.likes} />
    );

    return (
        <div className={style.postsBlock}>
            <h3>My Posts</h3>
            <MyPostForm addPost={(text: string) => addPost(text)} />
            <div className={style.posts}>
                {postsElements.reverse()}
            </div>
        </div>
    );
};

export default MyPosts;