import style from "./MyPosts.module.css";
import Post from "./Post/Post";

function MyPosts() {
    return (
        <div>
            <div>
                My Posts
            </div>
            <textarea></textarea>
            <button>add post</button>
            <div className={style.posts}>
                <Post message="ШО Я ТУТА ЗДЕЛАВ" likes="15"/>
                <Post message="ЄБАТЬ ШО Я НАРОБИВ" likes="20"/>
            </div>
        </div>
    );
}

export default MyPosts;