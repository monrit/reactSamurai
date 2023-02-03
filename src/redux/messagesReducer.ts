const ADD_MESSAGE = "messages/ADD-MESSAGE";

type PersonType = {
    name: string,
    id: number
};
type MessageType = {
    text: string,
    id: number
};
export type InitialStateType = {
    people: Array<PersonType>,
    messages: Array<MessageType>
};

const initialState: InitialStateType = {
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

type ActionType = AddMessageActionType;

function messagesReducer(state = initialState, action: ActionType): InitialStateType {
    switch (action.type) {
        case ADD_MESSAGE:
            const message: MessageType = {
                text: action.text,
                id: state.messages.length + 1
            };
            return {
                ...state,
                messages: [...state.messages, message]
            };
        default:
            return state;
    }
}

type AddMessageActionType = {
    type: typeof ADD_MESSAGE,
    text: string
};
export const addMessage = (text: string): AddMessageActionType => ({ type: ADD_MESSAGE, text });

export default messagesReducer;