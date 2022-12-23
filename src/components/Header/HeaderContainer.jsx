import React from "react";
import { connect } from "react-redux";
import { getAuth } from "../../redux/authReducer";
import Header from "./Header";

class HeaderContainer extends React.Component {
    componentDidMount() {
        this.props.getAuth();
    }

    render() {
        return <Header
            isAuth={this.props.isAuth}
            login={this.props.login} />;
    }
}

function mstp(state) {
    return {
        isAuth: state.auth.isAuth,
        login: state.auth.login
    }
}

export default connect(mstp, { getAuth })(HeaderContainer);