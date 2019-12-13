import React from 'react';
import { connect } from 'react-redux';
import { AppState } from '../reducer';
import './styles/chat.css';
import { InputField } from './InputField';
import { User, MESSAGE_SEND } from '../types';
import { Message, RecentMessageResponse } from '../../../backend/messages/types';
import { api_request } from '../auth/api';
import { MessageList } from '../Messages';
import { Dispatch } from 'redux';

const mapStateToProps = (state: AppState) => ({
    user: state.user.user
});
const mapDispatchToProps = (dispatch: Dispatch) => ({
    send: (message: Message) => dispatch({ type: MESSAGE_SEND, message })
});

const LIMIT = 10;

type ChatProps = {
    user?: User
    send: (message: Message) => void;
}

type ChatState = {
    ws: WebSocket | null;
    loading: boolean;
    messages: Message[];
}

class ChatComponent extends React.Component<ChatProps, ChatState> {

    state: ChatState = {
        ws: null,
        loading: false,
        messages: [],
    }

    componentDidMount() {
        this.loadRecentMessages();
        this.connect();
    }

    async loadRecentMessages() {
        this.setState({ ...this.state, loading: true });
        const data = await api_request('message/recent');
        if (!data) {
            this.setState({ ...this.state, loading: false });
            return;
        }
        const recent = data.body as RecentMessageResponse;
        this.setState({ ...this.state, loading: false, messages: recent.messages.slice(-LIMIT) });
    }

    connect() {
        const ws = new WebSocket('ws://localhost:8080/chat')
        ws.onopen = () => {
            console.log('open');
            this.setState({ ...this.state, ws })
        };
        ws.onmessage = this.onMessage.bind(this);
        ws.onclose = () => this.setState({ ...this.state, ws: null });
    }

    onMessage(ev: MessageEvent) {
        const message = JSON.parse(ev.data) as Message;
        this.addMessage(message);
    }

    onSend(message: Message) {
        this.addMessage(message);
    }

    addMessage(message: Message) {
        if (this.state.messages.length === LIMIT) this.state.messages.shift();
        this.state.messages.push(message);
        this.setState({ ...this.state, messages: this.state.messages });
        this.props.send(message);
    }

    render() {
        const isAuthorized = this.props.user !== undefined && this.props.user.authorized;
        return (
            <div className='chat'>
                <MessageList messages={this.state.messages}/>
                {(isAuthorized && this.state.ws ? <InputField ws={this.state.ws} onSend={this.onSend.bind(this)} /> : '')}
            </div>
        );
    }
}

export const Chat = connect(mapStateToProps, mapDispatchToProps)(ChatComponent);