import React, { Component, Dispatch } from 'react'
import { AppState } from '../reducer';
import { connect } from 'react-redux';
import WelcomeArea from './WelcomeArea';
import { History } from 'history';

type LandingComponentProps = {
    history: History
};

type LandingComponentState = {
};

const mapStateToProps = (state: AppState) => ({});

class LandingComponent extends Component<LandingComponentProps, LandingComponentState> {

    render() {
        return (
            <div>
                <WelcomeArea history={this.props.history}/>
            </div>
        );
    }
}

export const Landing = connect(mapStateToProps)(LandingComponent);
