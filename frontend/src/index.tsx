import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import React from 'react';
import { store, history } from './store';

import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';

import * as serviceWorker from './serviceWorker';
import './app.css';
import { Header } from './Header';
import { Login } from './Authorization/Login';
import { SignUp } from './Authorization/SignUp';
import { Landing } from './Landing';
import { Chat } from './Chat';
import { History } from './History';

ReactDOM.render((
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <Header />
            <Switch>
                <Route exact path="/" component={Landing}/>
                <Route path='/login' component={Login} />
                <Route path='/sign-up' component={SignUp} />
                <Route path='/chat' component={Chat} />
                <Route path='/history' component={History} />
            </Switch>
        </ConnectedRouter>
    </Provider>
), document.getElementById('root'));

serviceWorker.register();
