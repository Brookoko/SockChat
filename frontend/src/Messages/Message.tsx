import React, { Component, Dispatch } from 'react'
import { AppState } from '../reducer';
import { connect } from 'react-redux';
import { User } from '../types';
import { Message } from '../../../backend/messages/types';
import './style.css';

type MessageProps = {
    user?: User,
    message: Message;
};

type MessageState = {
};

const mapStateToProps = (state: AppState) => ({
    user: state.user.user
});

class MessageComponent extends Component<MessageProps, MessageState> {

    render() {
        const isUserMessage = this.props.user!.name! === this.props.message.username;
        const hasData = this.props.message.username && this.props.message.message;
        const body = (
            <div className='.message_wrapper'>
                <div className={isUserMessage ? 'user-message' : 'message'}>
                    <div className='name'>{this.props.message.username}</div>
                    <div className='text'>{this.props.message.message}</div>
                </div>
            </div>
        )
        return hasData ? body : '';
    }
}

export const MessageView = connect(mapStateToProps)(MessageComponent);
