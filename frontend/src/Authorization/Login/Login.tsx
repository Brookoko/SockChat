import React, { Dispatch, FormEvent } from 'react'
import { connect } from 'react-redux';
import { api_request } from '../../auth/api';
import { ErrorRenderer } from '../Error';
import '../styles/auth.css';
import { User, AUTH_DONE, LoginError, LoginResponse } from '../../types';
import { UserAction } from '../../reducers/user';
import { History } from 'history';

type LoginComponentProps = {
  dispatch: Dispatch<UserAction>,
  onAuthDone: (user: User) => void,
  history: History,
};

type LoginComponentState = {
  username: string,
  password: string,
  error?: LoginError,
};

const mapStateToProps = (state: any) => ({
  user: state.user,
});

const mapDispatchToProps = (dispatch: Dispatch<UserAction>) => ({
  onAuthDone: (user: User) => dispatch({ type: AUTH_DONE, user })
});

class LoginComponent extends React.Component<LoginComponentProps, LoginComponentState>  {

  state: LoginComponentState = {
    username: '',
    password: '',
  }

  render() {
    return (
      <div>
      {this.state.error ? <ErrorRenderer error={this.state.error} /> : ''}
        <div className="auth">
          <form onSubmit={this.onSubmit.bind(this)}>
            <h1>Log in</h1>
            <input id="name" name="username" placeholder="Username" type="text" required={true}/>
            <input id="password" name="password" placeholder="Password" type="password" required={true}/>
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    );
  }

  protected async onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const target = event.target as HTMLFormElement;
    const data = new FormData(target);
    const username = data.get('username') as string;
    const password = data.get('password') as string;

    const loginInfo = await api_request('auth/login', 'POST', {
      username,
      password
    }) as LoginResponse;

    if (loginInfo.status === 200) {
      localStorage.authorized = true;
      localStorage.authToken = loginInfo.body.authToken;

      const user: User = {
        authorized: true,
        name: username,
      };

      this.props.onAuthDone(user);

      this.props.history.push('/chat')
    }

    this.updateState(loginInfo);
  }

  private proccessError(error: LoginError) {
    this.setState({
      username: '',
      password: '',
      error
    } as LoginComponentState);
  }

  protected async updateState(data: LoginResponse) {
    if (data == undefined) {
      this.proccessError({
        status: 'error',
        message: 'Cannot connect to server. Please try again later',
      });
      return;
    }

    if (data.body.status == 'error') {
      let message = data.body.message;
      message = message[0].toUpperCase() + message.slice(1);
      this.proccessError(data.body as LoginError);
      return;
    }
  }
}

export const Login = connect(mapStateToProps, mapDispatchToProps)(LoginComponent);