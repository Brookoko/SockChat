import React, { Component, Dispatch } from 'react'
import "./styles/header.css";
import { Menu } from './Menu';
import { AppState } from '../reducer';
import { connect } from 'react-redux';
import { Logout } from '../Authorization/Logout';
import { User } from '../types';

type HeaderComponentProps = {
    user?: User
};

type HeaderComponentState = {
};

const mapStateToProps = (state: AppState) => ({
    user: state.user.user
});

class HeaderComponent extends Component<HeaderComponentProps, HeaderComponentState> {

    render() {
        const isAuthorized = this.props.user !== undefined && this.props.user.authorized;
        return (
            <div className="header-fixed">
                <Menu />
                {(isAuthorized ? <Logout /> : '')}
            </div>
        )
    }
}

export const Header = connect(mapStateToProps)(HeaderComponent);
