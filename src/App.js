import './App.css';
import React from "react";
import { connect } from "react-redux";
import { initializeApp } from "./redux/appReducer";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import HeaderContainer from "./components/Header/HeaderContainer";
import Preloader from "./components/common/Preloader/Preloader";
import Navbar from './components/Navbar/Navbar';
import { compose } from "redux";
import { Alert, Snackbar } from '@mui/material';
const UsersContainer = React.lazy(() => import("./components/Users/UsersContainer"));
const ProfileContainer = React.lazy(() => import("./components/Profile/ProfileContainer"));
const LoginContainer = React.lazy(() => import("./components/Login/LoginContainer"));
const News = React.lazy(() => import("./components/News/News"));
const Music = React.lazy(() => import("./components/Music/Music"));
const Settings = React.lazy(() => import("./components/Settings/Settings"));
const MessagesContainer = React.lazy(() => import("./components/Messages/MessagesContainer"));

class App extends React.Component {
    componentDidMount() {
        this.props.initializeApp();
    }

    render() {
        if (!this.props.initalized) {
            return <Preloader />;
        }
        return (
            <BrowserRouter>
                <Snackbar
                    open={!!this.props.globalError}
                >
                    <Alert severity="error" sx={{ width: '100%' }}>
                        {this.props.globalError?.message}
                    </Alert>
                </Snackbar>
                <div className="my-app-wrapper">
                    <HeaderContainer />
                    <Navbar friends={this.props.friends} />
                    <div className="my-app-content">
                        <React.Suspense fallback={<div>Lazy loading...</div>}>
                            <Routes>
                                <Route path="/" element={<Navigate to="/login" />} />
                                <Route path="/profile/:userId" element={<ProfileContainer />} />
                                <Route path="/profile" element={<ProfileContainer />} />
                                <Route path="/messages/*" element={<MessagesContainer />} />
                                <Route path="/news" element={<News />} />
                                <Route path="/music" element={<Music />} />
                                <Route path="/settings" element={<Settings />} />
                                <Route path="/users" element={<UsersContainer />} />
                                <Route path="/login/facebook" element={<div>facebook login</div>} />
                                <Route path="/login" element={<LoginContainer />} />
                                <Route path="*" element={<div>404 NOT FOUND</div>} />
                            </Routes>
                        </React.Suspense>
                    </div>
                </div>
            </BrowserRouter>
        );
    }
}

const mapStateToProps = state => {
    return {
        initalized: state.app.initialized,
        isAuth: state.auth.isAuth,
        globalError: state.app.globalError,
        friends: state.sidebar.friends
    };
};

export default compose(
    connect(mapStateToProps, { initializeApp })
)(App);
