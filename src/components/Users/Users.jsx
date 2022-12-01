function Users(props) {

    if (props.users.length === 0) {
        props.setUsers([
            {
                id: 1, avatarURL: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/Gatto_europeo4.jpg/250px-Gatto_europeo4.jpg",
                followed: true, fullName: "Asya", status: "I'AM A DIMA'S WIFE!", location: { city: "Novopskov", country: "Ukraine" }
            },
            {
                id: 2, avatarURL: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/Gatto_europeo4.jpg/250px-Gatto_europeo4.jpg",
                followed: false, fullName: "Andrew", status: "am stupid af", location: { city: "Urizh", country: "Ukraine" }
            },
            {
                id: 3, avatarURL: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/Gatto_europeo4.jpg/250px-Gatto_europeo4.jpg",
                followed: false, fullName: "Vova", status: "EBANA OLYA", location: { city: "Shidnitsya", country: "Ukraine" }
            }
        ]);
    }

    return (
        <div>
            {props.users.map(user => {
                return (
                    <div key={user.id}>
                        <div>
                            <img src={user.avatarURL} alt={user.fullName} width="50px" height="50px" />
                            {user.followed
                                ? <button onClick={() => props.unfollow(user.id)}>UNFOLLOW</button>
                                : <button onClick={() => props.follow(user.id)}>FOLLOW</button>}
                        </div>
                        <div>
                            <div>
                                {user.fullName}
                            </div>
                            <div>
                                {user.status}
                            </div>
                        </div>
                        <div>
                            <div>
                                {user.location.city}
                            </div>
                            <div>
                                {user.location.country}
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

export default Users;