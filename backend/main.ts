import appInit from './app';
import { databaseInit, Database } from './database';
import http from 'http';
import WebSocket from 'websocket';
import { Message } from './messages';

const port = 8080;
const postgresUser = 'postgres';
const postgresPassword = 'postgres';
const postgresHost = 'localhost';
const postgresPort = 5432;
const postgresDatabase = 'chat';

const databaseConnectionString = `postgres://${postgresUser}:${postgresPassword}@${postgresHost}:${postgresPort}/${postgresDatabase}`;
let db: Database;

const connectSocket = (app: any) => {
    const server = http.createServer(app.callback());
    const ws = new WebSocket.server({
        httpServer: server,
        autoAcceptConnections: false
    });

    const clients: WebSocket.connection[] = [];

    ws.on('request', req => {
        const connection = req.accept('', req.origin);
        clients.push(connection);
        connection.on('message', message => {
            const data = message.utf8Data;
            if (!data) return;
            const json = JSON.parse(data) as Message;
            console.dir(json);
            db.saveMessage(json);
            clients.forEach(client => {
                if (client !== connection) {
                    client.send(data);
                }
            });
        });
    });

    server.listen(port);
}

(async () => {
    db = await databaseInit(databaseConnectionString);
    const { app } = await appInit(db, 'some_secret');
    connectSocket(app);
    console.log(`server is started on port ${port}`);
})();