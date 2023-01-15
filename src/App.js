import './App.css';
import React from "react";
import { connect } from "react-redux";
import { initializeApp } from "./redux/appReducer";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HeaderContainer from "./components/Header/HeaderContainer";
import Preloader from "./components/common/Preloader/Preloader";
import Navbar from './components/Navbar/Navbar';
import { compose } from "redux";
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
                <div className="my-app-wrapper">
                    <HeaderContainer />
                    <Navbar state={this.props.state.sidebar} />
                    <div className="my-app-content">
                        <React.Suspense fallback={<div>Lazy loading...</div>}>
                            <Routes>
                                <Route path="/profile/:userId" element={<ProfileContainer />} />
                                <Route path="/profile" element={<ProfileContainer />} />
                                <Route path="/messages/*" element={<MessagesContainer />} />
                                <Route path="/news" element={<News />} />
                                <Route path="/music" element={<Music />} />
                                <Route path="/settings" element={<Settings />} />
                                <Route path="/users" element={<UsersContainer />} />
                                <Route path="/login" element={<LoginContainer />} />
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
        isAuth: state.auth.isAuth
    };
};

export default compose(
    connect(mapStateToProps, { initializeApp })
)(App);
