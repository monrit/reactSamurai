const ADD_MESSAGE = "ADD-MESSAGE";
const UPDATE_MESSAGE_INPUT = "UPDATE-MESSAGE-INPUT";

function messagesReducer(state, action) {
    switch (action.type) {
        case ADD_MESSAGE:
            let text = state.userInputText;
            if (!text) {
                return;
            }
            let message = {
                text: text,
                id: 3
            };
            state.userInputText = '';
            state.messages.push(message);
            return state;
        case UPDATE_MESSAGE_INPUT:
            state.userInputText = action.input;
            return state;
        default:
            return state;
    }
}

export const addMessageActionCreator = () => ({ type: ADD_MESSAGE });
export const updateMessageInputActionCreator = (text) => ({ type: UPDATE_MESSAGE_INPUT, input: text });

export default messagesReducer;