import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { History } from 'history';
import userReducer, { UserState } from './reducers/user';
import { messageSended } from './reducers/message';
import { recentMessages } from './reducers/recentMessages';
import { Message } from '../../backend/messages/types';


export const rootReducer = (history: History) => combineReducers({
    router: connectRouter(history),
    user: userReducer,
    messageSended,
    recentMessages
})

export type AppState = {
    user: UserState,
    messageSended: Message,
    recentMessages: Message[],
}