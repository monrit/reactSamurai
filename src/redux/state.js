const ADD_POST = "ADD-POST";
const UPDATE_POST_INPUT = "UPDATE-POST-INPUT";
const ADD_MESSAGE = "ADD-MESSAGE";
const UPDATE_MESSAGE_INPUT = "UPDATE-MESSAGE-INPUT";

let store = {
    _state: {
        messagesPage: {
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
        },
        profilePage: {
            posts: [
                { id: 1, message: "ШО Я ТУТА ЗДЕЛАВ", likes: 15 },
                { id: 2, message: "ЄБАТЬ ШО Я НАРОБИВ", likes: 27 }
            ],
            userInputText: ""
        },
        sidebar: {
            friends: [
                { id: 1, username: "Asya", avatar: "https://www.rainforest-alliance.org/wp-content/uploads/2021/06/capybara-square-1.jpg.optimal.jpg" },
                { id: 2, username: "Ostap", avatar: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/Sea_Otter_%28Enhydra_lutris%29_%2825169790524%29_crop.jpg/800px-Sea_Otter_%28Enhydra_lutris%29_%2825169790524%29_crop.jpg" },
                { id: 3, username: "Andrew", avatar: "https://i.guim.co.uk/img/media/26392d05302e02f7bf4eb143bb84c8097d09144b/446_167_3683_2210/master/3683.jpg?width=1200&quality=85&auto=format&fit=max&s=a52bbe202f57ac0f5ff7f47166906403" }
            ]
        }
    },
    _subscriber() {
        console.log("No subscribers (observers)");
    },

    getState() {
        return this._state;
    },
    subscribe(observer) {
        this._subscriber = observer;
    },
    dispatch(action) {
        if (action.type === ADD_POST) {
            let text = this._state.profilePage.userInputText;
            if (!text) {
                return;
            }
            let post = {
                id: 3,
                message: text,
                likes: 0
            };
            this._state.profilePage.userInputText = '';
            this._state.profilePage.posts.push(post);
            this._subscriber(this);
        } else if (action.type === UPDATE_POST_INPUT) {
            this._state.profilePage.userInputText = action.input;
            this._subscriber(this);
        } else if (action.type === ADD_MESSAGE) {
            let text = this._state.messagesPage.userInputText;
            if (!text) {
                return;
            }
            let message = {
                text: text,
                id: 3
            };
            this._state.messagesPage.userInputText = '';
            this._state.messagesPage.messages.push(message);
            this._subscriber(this);
        } else if (action.type === UPDATE_MESSAGE_INPUT) {
            this._state.messagesPage.userInputText = action.input;
            this._subscriber(this);
        }
    }
}

export const addPostActionCreator = () => ({ type: ADD_POST });
export const updatePostInputActionCreator = (text) => ({ type: UPDATE_POST_INPUT, input: text });
export const addMessageActionCreator = () => ({ type: ADD_MESSAGE });
export const updateMessageInputActionCreator = (text) => ({ type: UPDATE_MESSAGE_INPUT, input: text });

window.store = store;
export default store;