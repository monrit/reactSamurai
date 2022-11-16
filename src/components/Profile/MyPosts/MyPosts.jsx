import style from "./MyPosts.module.css";
import Post from "./Post/Post";

function MyPosts(props) {

    let postsElements = props.posts.map(post => <Post message={post.message} likes={post.likes} />)

    return (
        <div className={style.postsBlock}>
            <h3>My Posts</h3>
            <div>
                <textarea></textarea>
            </div>
            <div>
                <button>add post</button>
            </div>
            <div className={style.posts}>
                {postsElements}
            </div>
        </div>
    );
}

export default MyPosts;