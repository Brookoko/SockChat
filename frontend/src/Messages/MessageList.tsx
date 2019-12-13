import React, { Component, Dispatch } from 'react'
import { AppState } from '../reducer';
import { connect } from 'react-redux';
import { Message } from '../../../backend/messages/types';
import { MessageView } from './Message';
import './style.css';

type HeaderComponentProps = {
    messages: Message[],
    sended: Message,
};

type HeaderComponentState = {
};

const mapStateToProps = (state: AppState) => ({
    sended: state.messageSended
});

class HeaderComponent extends Component<HeaderComponentProps, HeaderComponentState> {

    renderMessages(): any {
        const messageComponents = [];
        for (const message of this.props.messages) {
            const component = this.createMessageComponent(message);
            messageComponents.push(component);
        }
        return messageComponents;
    }

    private createMessageComponent(message: Message): any {
        return <MessageView message={message} />
    }


    render() {
        return (
            <div className="message-list">
                {this.renderMessages()}
            </div>
        )
    }
}

export const MessageList = connect(mapStateToProps)(HeaderComponent);
