import profileReducer, { addPost } from "./profileReducer";

let state = {
    posts: [
        { id: 0, message: "First post", likes: 27 },
        { id: 1, message: "На могилі моїй посадіть молоду яворииинуу", likes: 15 }
    ]
};

test("Expected length to be incremented", () => {
    let action = addPost("Hell Yeah!");
    let localState = profileReducer(state, action);
    expect(localState.posts.length).toBe(3);
});