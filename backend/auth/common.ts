import jwt from 'jsonwebtoken';
import { User } from './types';
import { AppSecret } from '../types';

export const generateAuthToken = async (user: User, appSecret: AppSecret): Promise<string> => new Promise((resolve, reject) => {
    jwt.sign({ username: user.username }, appSecret, { expiresIn: '1d' }, (error, token) => {
        if (error) {
            reject(error);
        } else {
            resolve(token);
        }
    });
});