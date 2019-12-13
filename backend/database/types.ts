import { User } from '../auth';
import { Message } from '../messages';

export type Database = {

    createUser: (id: string, username: string, password: string) => Promise<void>,
    findUserByUsername: (username: string) => Promise<User | undefined>,
    createMessage: (id: string, username: string, message: string, date: Date) => Promise<void>,
    loadAllMessages: () => Promise<Message[]>,
    loadRecentMessages: () => Promise<Message[]>
    saveMessage: (message: Message) => Promise<void>,
};