import React from "react";
import axios from "axios";
import style from "./Users.module.css";
import profilePicture from "../../assets/images/profilePicture.jpg";

class Users extends React.Component {
    componentDidMount() {
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`)
            .then(response => {
                this.props.setUsers(response.data.items);
                //4400+ pages will apear !!NEEDS SOLUTION
                //this.props.setTotalUsers(response.data.totalCount);
            });
    }

    onPageChange = (currentPage) => {
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${currentPage}&count=${this.props.pageSize}`)
            .then(response => {
                this.props.setUsers(response.data.items);
            });
        this.props.setCurrentPage(currentPage);
    };

    render() {

        const numOfPages = Math.ceil(this.props.totalUsers / this.props.pageSize);

        const buttons = [];

        for (let i = 1; i <= numOfPages; i++) {
            buttons.push(i);
        }

        return (
            <div>
                {buttons.map(page => {
                    return (
                        <span onClick={() => this.onPageChange(page)} className={this.props.currentPage === page ? style.selected: undefined}>{page}</span>
                    );
                })}
                {this.props.users.map(user => {
                    return (
                        <div key={user.id} className={style.userFrame}>
                            <div>
                                <img src={user.photos.small || profilePicture} alt={user.name} className={style.image} width="50" height="50" />
                                {user.followed
                                    ? <button onClick={() => this.props.unfollow(user.id)}>UNFOLLOW</button>
                                    : <button onClick={() => this.props.follow(user.id)}>FOLLOW</button>}
                            </div>
                            <div>
                                <div>
                                    {user.name}
                                </div>
                                <div>
                                    {user.status}
                                </div>
                            </div>
                            <div>
                                <div>
                                    {"user.location.city"}
                                </div>
                                <div>
                                    {"user.location.country"}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    };
}

export default Users;