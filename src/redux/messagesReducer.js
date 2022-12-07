const ADD_MESSAGE = "ADD-MESSAGE";
const UPDATE_MESSAGE_INPUT = "UPDATE-MESSAGE-INPUT";

let initialState = {
    people: [
        { name: "Asya", id: 1 },
        { name: "Dima", id: 2 },
        { name: "Ostap", id: 3 },
        { name: "Andrew", id: 4 },
        { name: "Orest", id: 5 },
        { name: "Vova", id: 6 }
    ],
    messages: [
        { text: "Ekstein Chorny", id: 1 },
        { text: "Blue Balls", id: 2 },
        { text: "Chornovil", id: 3 },
        { text: "Stus", id: 4 }
    ],
    userInputText: ""
};

function messagesReducer(state = initialState, action) {
    switch (action.type) {
        case ADD_MESSAGE:
            const text = state.userInputText;
            if (!text) {
                return;
            }
            const message = {
                text: text,
                id: 5
            };
            return {
                ...state,
                userInputText: "",
                messages: [...state.messages, message]
            };
        case UPDATE_MESSAGE_INPUT:
            return {
                ...state,
                userInputText: action.input
            };
        default:
            return state;
    }
}

export const addMessage = () => ({ type: ADD_MESSAGE });
export const updateMessageInput = (text) => ({ type: UPDATE_MESSAGE_INPUT, input: text });

export default messagesReducer;