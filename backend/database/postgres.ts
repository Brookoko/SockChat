import { Client } from 'pg';

import { Database } from './types';
import { User } from '../auth';
import { Message } from '../messages';
import uuid = require('uuid');

export const databaseInit = async (connectionString: string): Promise<Database> => {
    const client = new Client(connectionString);
    await client.connect();

    return {
        createUser: async (id: string, username: string, password_hash: string): Promise<void> => {
            await client.query(
                'insert into users (id, username, password_hash) values ($1, $2, $3)',
                [id, username, password_hash]
            );
        },

        findUserByUsername: async (username: string): Promise<User | undefined> => {
            const res = await client.query(
                'select * from users where username = $1 limit 1',
                [username],
            );

            if (res.rowCount === 0) {
                return undefined;
            }

            return res.rows[0] as User;
        },

        createMessage: async (id: string, username: string, message: string, date: Date): Promise<void> => {
            await client.query(
                'insert into messages (id, username, message, date) values ($1, $2, $3, $4)',
                [id, username, message, date]
            );
        },

        loadAllMessages: async (): Promise<Message[]> => {
            const messages = await client.query(
                'select username, message from messages order by date asc',
            );
            return messages.rows.map<Message>((el: any) => {
                const m = { username: el.username, message: el.message };
                return m;
            });
        },

        loadRecentMessages: async (): Promise<Message[]> => {
            const messages = await client.query(
                'select username, message, date from messages order by date asc limit 50',
            );
            return messages.rows.map<Message>((el: any) => {
                const m = { username: el.username, message: el.message };
                return m;
            });
        },

        saveMessage: async (message: Message): Promise<void> => {
            const id = uuid.v4();
            const date = new Date();
            await client.query(
                'insert into messages (id, username, message, date) values ($1, $2, $3, $4)',
                [id, message.username, message.message, date]
            );
        }
    }
};