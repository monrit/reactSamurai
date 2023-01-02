import MyPostForm from "./MyPostForm/MyPostForm";
import style from "./MyPosts.module.css";
import Post from "./Post/Post";

function MyPosts(props) {

    const state = props.state;

    const postsElements = state.posts.map(post => <Post key={post.id} message={post.message} likes={post.likes} />)

    function addPost(text) {
        props.addPost(text);
    }

    return (
        <div className={style.postsBlock}>
            <h3>My Posts</h3>
            <MyPostForm addPost={addPost}/>
            <div className={style.posts}>
                {postsElements}
            </div>
        </div>
    );
}

export default MyPosts;