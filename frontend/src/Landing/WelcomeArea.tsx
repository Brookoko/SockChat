import React, { Component } from 'react'
import "./styles/welcome.css";
import { History } from 'history';

type WelcomeAreaProps = {
    history: History
}

type WelcomeAreaState = {
}

class WelcomeArea extends Component<WelcomeAreaProps, WelcomeAreaState> {

    redirect() {
        this.props.history.push('/sign-up');
    }

    render() {
        return (
            <div className="word_container">
                <div className="concept">
                    <div className='word'><h1>Local Chat</h1></div>
                    <button className="btn" onClick={this.redirect.bind(this)}>Let's start</button>
                </div>
            </div>
        )
    }
}

export default WelcomeArea;

