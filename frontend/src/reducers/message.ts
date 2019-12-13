import { MESSAGE_SEND } from '../types';
import { Message } from '../../../backend/messages/types';
import { AnyAction } from 'redux';

export type MessageAction = {
    type: typeof MESSAGE_SEND,
    message: Message;
};

const defaultState: Message = { username: '', message: '' };

export function messageSended(state: Message = defaultState, action: AnyAction): Message {
    switch(action.type) {
        case MESSAGE_SEND: return action.message;
        default: return state;
    }
}
