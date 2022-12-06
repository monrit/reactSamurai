let initialState = {
    friends: [
        { id: 55, username: "Asya", avatar: "https://www.rainforest-alliance.org/wp-content/uploads/2021/06/capybara-square-1.jpg.optimal.jpg" },
        { id: 77, username: "Ostap", avatar: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/Sea_Otter_%28Enhydra_lutris%29_%2825169790524%29_crop.jpg/800px-Sea_Otter_%28Enhydra_lutris%29_%2825169790524%29_crop.jpg" },
        { id: 99, username: "Andrew", avatar: "https://i.guim.co.uk/img/media/26392d05302e02f7bf4eb143bb84c8097d09144b/446_167_3683_2210/master/3683.jpg?width=1200&quality=85&auto=format&fit=max&s=a52bbe202f57ac0f5ff7f47166906403" }
    ]
};

function sidebarReducer(state = initialState, action) {
    return state;
}

export default sidebarReducer;