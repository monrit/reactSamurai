import React from "react";
import Navbar from "./Navbar";
import { getFriends } from "../../redux/sidebarReducer";
import { connect } from "react-redux";
import { UserType } from "../../types/types";
import { AppStateType } from "../../redux/reduxStore";

type MapStateType = {
    friends: Array<UserType>;
};
type DispathStateToPropsType = {
    getFriends: () => void;
};

type NavbarPropsType = MapStateType & DispathStateToPropsType;

class NavbarContainer extends React.Component<NavbarPropsType> {
    componentDidMount() {
        this.props.getFriends();
    }

    render() {
        return (
            <Navbar friends={this.props.friends}/>
        );
    }
}

const mapStateToProps = (state: AppStateType) => {
    return {
        friends: state.sidebar.friends
    };
} 

export default connect<MapStateType, DispathStateToPropsType, null, AppStateType>(mapStateToProps, { getFriends })(NavbarContainer);