import React from "react";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";
import { AppStateType } from "../redux/reduxStore";

export const withAuthRedirect = (Component: any) => {

    class wrapperComponent extends React.Component<any> {
        render() {
            if (!this.props.isAuth) return <Navigate to="/login"/>
            return <Component {...this.props}/>
        }
    }

    const mapStateToProps = (state: AppStateType)=> {
        return {
            isAuth: state.auth.isAuth
        }
    }

    return connect(mapStateToProps)(wrapperComponent);
};
