import React from 'react';
import { connect } from 'react-redux';
import { AppState } from '../reducer';
import { User, MESSAGE_SEND } from '../types';
import { Message } from '../../../backend/messages/types';
import { Dispatch } from 'redux';
import './styles/input.css';

const mapStateToProps = (state: AppState) => ({
    user: state.user.user
});
const mapDispatchToProps = (dispatch: Dispatch) => ({
});

type InputFieldProps = {
    user?: User,
    ws: WebSocket,
    onSend: (message: Message) => void;
}

type InputFieldState = {
}

class InputFieldComponent extends React.Component<InputFieldProps, InputFieldState> {

    onPress(event: React.KeyboardEvent<HTMLTextAreaElement>) {
        if (event.keyCode == 13) {
            this.sendMessage();
        }
    }

    sendMessage() {
        const input = document.getElementById('input');
        const text = input! as HTMLTextAreaElement;
        var data = text.value;
        if (!data) return;
        const username = this.props.user!.name!;
        const message: Message = { username, message: data };
        const json = JSON.stringify(message);
        this.props.ws.send(json);
        text.value = '';
        this.props.onSend(message);
    }

    render() {
        return (
            <div className='input_container'>
                <textarea name="input" id="input" cols={30} rows={10} maxLength={200} onKeyDown={this.onPress.bind(this)}></textarea>
                <button onClick={this.sendMessage.bind(this)}>Send</button>
            </div>
        );
    }
}

export const InputField = connect(mapStateToProps, mapDispatchToProps)(InputFieldComponent);