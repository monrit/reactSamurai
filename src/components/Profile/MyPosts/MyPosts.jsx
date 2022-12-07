import style from "./MyPosts.module.css";
import Post from "./Post/Post";

function MyPosts(props) {

    const state = props.state;

    const postsElements = state.posts.map(post => <Post key={post.id} message={post.message} likes={post.likes} />)

    function changeInput(event) {
        const input = event.target.value;
        props.updatePostInput(input);
    }

    function addPost() {
        props.addPost();
    }

    return (
        <div className={style.postsBlock}>
            <h3>My Posts</h3>
            <div>
                <textarea onChange={changeInput} value={state.userInputText} />
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