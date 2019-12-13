import React, { FormEvent, Dispatch } from 'react';
import { connect } from 'react-redux';
import { AppState } from '../../reducer';
import { ErrorRenderer } from '../Error';
import '../styles/auth.css';
import { api_request, api_request_fetch } from '../../auth/api';
import { History } from 'history';
import { User, AUTH_DONE } from '../../types';
import { UserAction } from '../../reducers/user';

const mapStateToProps = (state: AppState) => ({});
const mapDispatchToProps = (dispatch: Dispatch<UserAction>) => ({
  onAuthDone: (user: User) => dispatch({ type: AUTH_DONE, user })
});

type SignUpProps = {
  dispatch: Dispatch<UserAction>,
  history: History;
  onAuthDone: (user: User) => void,
}

type SignUpState = {
  username: string;
  password: string;
  error?: Error;
}

class SignUpComponent extends React.Component<SignUpProps, SignUpState> {

  state: Readonly<SignUpState> = {
    username: '',
    password: ''
  }

  protected onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const target = event.target as HTMLFormElement;
    const data = new FormData(target);
    const username = data.get('username') as string;
    const password = data.get('password') as string;
    this.onSubmitInternal(username, password);
  }

  private proccessError(error: Error) {
    this.setState({
      username: '',
      password: '',
      error
    })
  }

  protected async updateState(data: any | undefined) {
    if (data == undefined) {
      const error = new Error('Cannot connect to server. Please try again later');
      this.proccessError(error);
      return;
    }

    if (data.body.status == 'error') {
      let message = data.body.message;
      message = message[0].toUpperCase() + message.slice(1);
      this.proccessError(new Error(data.body.message))
      return;
    }
  }

  protected async onSubmitInternal(username: string, password: string) {
    const signUpInfo = await api_request('auth/signup', 'POST', {
      username,
      password
    });

    if ((signUpInfo as any).status === 200) {
      
      localStorage.authorized = true;
      console.log(localStorage.authorized)
      localStorage.authToken = (signUpInfo as any).body.authToken;

      const user: User = {
        authorized: true,
        name: username,
      };

      this.props.onAuthDone(user);

      this.props.history.push('/chat')
    }

   this.updateState(signUpInfo);
  }

  render() {
    return (
      <div>
        {this.state.error ? <ErrorRenderer error={this.state.error} /> : ''}
        <div className="auth">
          <form onSubmit={this.onSubmit.bind(this)}>
            <h1>Sign up</h1>
            <input id="name" name="username" placeholder="Username" type="text" required={true}/>
            <input id="password" name="password" placeholder="Password" type="password" required={true}/>
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    );
  }
}

export const SignUp = connect(mapStateToProps, mapDispatchToProps)(SignUpComponent);