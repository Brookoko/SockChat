import React, { Component, Dispatch } from 'react'
import { AppState } from '../reducer';
import { connect } from 'react-redux';
import './style.css';
import { Message, AllMessageResponse } from '../../../backend/messages/types';
import { MessageList } from '../Messages';
import { api_request } from '../auth/api';

type HistoryProps = {
};

type HistoryState = {
    messages: Message[]
};

const mapStateToProps = (state: AppState) => ({
});

class HistoryComponent extends Component<HistoryProps, HistoryState> {
    state: HistoryState = {
        messages: []
    }

    async componentDidMount() {
        const res = await api_request('message/all');
        const data = res!.body as AllMessageResponse;
        var messages = data.messages;
        this.setState({ ...this.state, messages });
    }


    render() {
        return (
            <div className='history'>
                <MessageList messages={this.state.messages} />
            </div>
        )
    }
}

export const History = connect(mapStateToProps)(HistoryComponent);
