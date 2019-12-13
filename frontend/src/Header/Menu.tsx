import React, { Component } from 'react'
import { AppState } from '../reducer';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { User } from '../types';
import "./styles/menu.css";

type MenuComponentProps = {
    user?: User,
};

type MenuComponentState = {
};

const mapStateToProps = (state: AppState) => ({
    user: state.user.user,
});

const mapDispatchToProps = (dispatch: {}) => ({});
   
class MenuComponent extends Component<MenuComponentProps, MenuComponentState> {

    render() {
        const isAuthorized = this.props.user !== undefined && this.props.user.authorized === true;
        const authorizationBasedLinks = isAuthorized ? [
            (<li key="history"><Link className='item' to="/history">History</Link></li>),
        ] : [
            (<li key="sign_up"><Link className='item' to="/sign-up">Sign Up</Link></li>),
            (<li key="login"><Link className='item' to="/login">Login</Link></li>),
        ];

        return (
            <ul className="nav">
                <li key="home"><Link className='item' to="/">Home</Link></li>
                <li key="chat"><Link className='item' to="/chat">Chat</Link></li>
                { authorizationBasedLinks }
            </ul>
        );
    }
}


export const Menu = connect(mapStateToProps, mapDispatchToProps)(MenuComponent);