let renderEntireTree = () => {};

let state = {
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
            {id: 1, username: "Asya", avatar: "https://www.rainforest-alliance.org/wp-content/uploads/2021/06/capybara-square-1.jpg.optimal.jpg"},
            {id: 2, username: "Ostap", avatar: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/Sea_Otter_%28Enhydra_lutris%29_%2825169790524%29_crop.jpg/800px-Sea_Otter_%28Enhydra_lutris%29_%2825169790524%29_crop.jpg"},
            {id: 3, username: "Andrew", avatar: "https://i.guim.co.uk/img/media/26392d05302e02f7bf4eb143bb84c8097d09144b/446_167_3683_2210/master/3683.jpg?width=1200&quality=85&auto=format&fit=max&s=a52bbe202f57ac0f5ff7f47166906403"}
        ]
    }
};

export const addPost = () => {
    let post = {
        id: 3,
        message: state.profilePage.userInputText,
        likes: 0
    };
    state.profilePage.userInputText = '';
    state.profilePage.posts.push(post);
    renderEntireTree(state);
};

export const updatePostInput = text => {
    state.profilePage.userInputText = text;
    renderEntireTree(state); 
}

export const updateMessageInput = text => {
    state.messagesPage.userInputText = text;
    renderEntireTree(state); 
}

export const addMessage = () => {
    let message = {
        text: state.messagesPage.userInputText,
        id: 3
    };
    state.messagesPage.userInputText = '';
    state.messagesPage.messages.push(message);
    renderEntireTree(state);
};

export const subscribe = observer => {
    renderEntireTree = observer;
};

export default state;