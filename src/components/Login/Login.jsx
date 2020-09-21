import React, { useState, useContext } from 'react';
import classes from './Login.module.css';
import {Link} from 'react-router-dom'

import { useHistory } from "react-router-dom";

import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import { MainStateContext } from '../MainState'

import { setCookie } from '../../helpers'

const LOGIN_GQL = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      success,
      token,
      user {
        id
        username,
        email
      }
    }
  }
`;

const Login = () => {
    let history = useHistory();

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const usernameRef = React.createRef(null);
    const passwordRef = React.createRef(null);

    const mainStateContext = useContext(MainStateContext);

    const [login, { data, loading }] = useMutation(LOGIN_GQL, {
            onCompleted(data) {
                if (data.login.success === true) {
                    setCookie("_token", data.login.token, 30);
                    history.push("listing/vand-bloc-mare/1");
                    mainStateContext.setState({
                        ...mainStateContext.state,
                        user: data.login.user // pentru logout setezi asta null
                    });
                }
            }
        }
    );

    const submitHandler = (e) => {
        e.preventDefault();
        login({ variables: { username: usernameRef.current.value, password: passwordRef.current.value } });
        return false;
    }


    return (
        <div className={classes.main_form}>
            <form onSubmit={submitHandler}>
                <div className="form-control">
                    <label for="username">Please enter your username: </label>
                    <input ref={usernameRef} id="username" onChange={(e) => setUsername(e.target.value)} placeholder="Enter Your Username" value={username} />
                </div>
                <div className="form-control">
                    <label for="password">Please enter your password: </label>
                    <input ref={passwordRef} id="password" onChange={(e) => setPassword(e.target.value)} placeholder="Enter Your Password" type="password" value={password} />
                </div>
                {(data && data.login.success == false) && <div style={{ color: '#cc0000' }}>Username or password is incorrect! Please try again</div>}
                <div>
                    <button type='submit' disabled={loading}>Login</button>
                   <Link to="/register"> <button type='submit' disabled={loading}>Register</button> </Link>
                </div>
            </form>
        </div>
    )

}

export default Login;