const ADD_POST = "ADD-POST";
const UPDATE_POST_INPUT = "UPDATE-POST-INPUT";

let initialState = {
    posts: [
        { id: 1, message: "ШО Я ТУТА ЗДЕЛАВ", likes: 15 },
        { id: 2, message: "ЄБАТЬ ШО Я НАРОБИВ", likes: 27 }
    ],
    userInputText: ""
};

function profileReducer(state = initialState, action) {
    switch (action.type) {
        case ADD_POST:
            const text = state.userInputText;
            if (!text) {
                return;
            }
            const post = {
                id: 3,
                message: text,
                likes: 0
            };
            return {
                ...state,
                userInputText: "",
                posts: [...state.posts, post]
            };
        case UPDATE_POST_INPUT:
            return {
                ...state,
                userInputText: action.input
            };
        default:
            return state;
    }
}

export const addPost = () => ({ type: ADD_POST });
export const updatePostInput = (text) => ({ type: UPDATE_POST_INPUT, input: text });

export default profileReducer;