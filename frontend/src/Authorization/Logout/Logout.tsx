import React, { Component, Dispatch } from 'react'
import { AppState } from '../../reducer';
import { connect } from 'react-redux';
import './style.css';
import { UserAction } from '../../reducers/user';
import { User, AUTH_DONE } from '../../types';
import { History } from 'history';

type LogoutComponentProps = {
    dispatch: Dispatch<UserAction>,
    onAuthDone: (user: User) => void,
};

type LogoutComponentState = {
};

const mapStateToProps = (state: AppState) => ({});

const mapDispatchToProps = (dispatch: Dispatch<UserAction>) => ({
    dispatch,
    onAuthDone: (user: User) => dispatch({ type: AUTH_DONE, user })
});

class LogoutComponent extends Component<LogoutComponentProps, LogoutComponentState> {

    logout() {
        localStorage.authorized = false;
        localStorage.authToken = undefined;

        const user: User = {
            authorized: false,
        };

        this.props.onAuthDone(user);
        window.location.href = '/';
    }

    render() {
        return (
            <ul className='logout'>
                <li key="log_out" onClick={this.logout.bind(this)}>Log out</li>
            </ul>
        )
    }
}

export const Logout = connect(mapStateToProps, mapDispatchToProps)(LogoutComponent);
