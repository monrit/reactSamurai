const ADD_MESSAGE = "ADD-MESSAGE";

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
    ]
};

function messagesReducer(state = initialState, action) {
    switch (action.type) {
        case ADD_MESSAGE:
            const message = {
                text: action.text,
                id: 5
            };
            return {
                ...state,
                userInputText: "",
                messages: [...state.messages, message]
            };
        default:
            return state;
    }
}

export const addMessage = (text) => ({ type: ADD_MESSAGE, text });

export default messagesReducer;