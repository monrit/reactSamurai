const ADD_POST = "ADD-POST";
const UPDATE_POST_INPUT = "UPDATE-POST-INPUT";

function profileReducer(state, action) {
    switch (action.type) {
        case ADD_POST:
            let text = state.userInputText;
            if (!text) {
                return;
            }
            let post = {
                id: 3,
                message: text,
                likes: 0
            };
            state.userInputText = '';
            state.posts.push(post);
            return state;
        case UPDATE_POST_INPUT:
            state.userInputText = action.input;
            return state;
        default:
            return state;
    }
}

export const addPostActionCreator = () => ({ type: ADD_POST });
export const updatePostInputActionCreator = (text) => ({ type: UPDATE_POST_INPUT, input: text });

export default profileReducer;