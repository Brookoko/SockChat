import { MESSAGE_RECENT } from '../types';
import { Message } from '../../../backend/messages/types';
import { AnyAction } from 'redux';

export type RecentMessageAction = {
    type: typeof MESSAGE_RECENT,
    messages: Message[];
};

const defaultState: Message[] = [];

export function recentMessages(state: Message[] = defaultState, action: AnyAction): Message[] {
    switch(action.type) {
        case MESSAGE_RECENT: return action.messages;
        default: return state;
    }
}
