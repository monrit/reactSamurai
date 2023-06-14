import profileReducer, { addPost, deletePost, like, setUserProfile, setUserStatus } from "./profileReducer";

const state = {
    posts: [
        { id: 0, message: "First post", likes: 27 },
        { id: 1, message: "На могилі моїй посадіть молоду яворииинуу", likes: 15 },
        { id: 2, message: "На могилі моїй посадіть молоду яворииинуу", likes: 15 },
        { id: 3, message: "На могилі моїй посадіть молоду яворииинуу", likes: 15 },
        { id: 4, message: "На могилі моїй посадіть молоду яворииинуу", likes: 15 },
    ]
};

const niceId = 1;
const wrongId = -1;
const postMessage = "Hell Yeah BOYS!";
const status = "HELLO, WORLD!";
const userProfile = {
    something: "DSFDS"
}


test("Expected length to be incremented", () => {
    const localState = profileReducer(state, addPost(`${postMessage}`));
    expect(localState.posts.length).toBe(state.posts.length + 1);
});

test("Expected id to be incremented", () => {
    const localState = profileReducer(state, addPost(`${postMessage}`));
    expect(localState.posts[localState.posts.length - 1].id).toBe(state.posts[state.posts.length - 1].id + 1);
});

test("Expected likes to be zero", () => {
    const localState = profileReducer(state, addPost(`${postMessage}`));
    expect(localState.posts[localState.posts.length - 1].likes).toBe(0);
});

test(`Expected message to be ${postMessage}`, () => {
    const localState = profileReducer(state, addPost(`${postMessage}`));
    expect(localState.posts[localState.posts.length - 1].message).toBe(postMessage);
});

test(`Expected post length to decrease when post was deleted`, () => {
    const localState = profileReducer(state, deletePost(niceId));
    expect(localState.posts.length).toBe(state.posts.length - 1);
});

test(`Expected post length to stay the same when post with wrong id was passed into the function`, () => {
    const localState = profileReducer(state, deletePost(wrongId));
    expect(localState.posts.length).toBe(state.posts.length);
});

test(`Like sholud increase when like action is called`, () => {
    const localState = profileReducer(state, like(niceId));
    expect(localState.posts[niceId].likes).toBe(state.posts[niceId].likes + 1);
});

test(`Like sholud stay the same when like action is called with wrong like id`, () => {
    const localState = profileReducer(state, like(wrongId));
    expect(JSON.stringify(localState.posts)).toBe(JSON.stringify(state.posts));
});

test(`Expected status to be ${status} when setStatus action is called`, () => {
    const localState = profileReducer(state, setUserStatus(status));
    expect(localState.status).toBe(status);
});

test(`Expected user profile to be setted`, () => {
    const localState = profileReducer(state, setUserProfile(userProfile));
    expect(localState.profile).toBe(userProfile);
});