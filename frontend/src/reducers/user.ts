import { AUTH_DONE, User } from '../types';

export type UserState = {
    user?: User,
};

export type UserAction = {
    type: string,
    user?: User,
};

const defaultState = <UserState> {
    user: undefined,  
};

export default (state = defaultState, action: UserAction): UserState => {
    switch (action.type) {
        case AUTH_DONE:
            return {
                ...state,
                user: action.user
            }
        default:
            return state;
    }  
};