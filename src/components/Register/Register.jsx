import React, { useState, useContext } from 'react';
import classes from './Register.module.css';
import {Link} from 'react-router-dom'
import { MainStateContext } from '../MainState'
import { setCookie } from '../../helpers'
import { useHistory } from 'react-router-dom'
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';


const REGISTER_GQL = gql`
  mutation Login($username: String!, $password: String!, $email: String!) {
    register(username: $username, password: $password, email:$email) {
      success,
      message,
    }
  }
`;

const Register = () => {
    const [userName, setUserName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirm, setPasswordConfirm] = useState('')

    const [validUserName, setValidUserName] = useState('')
    const [validEmail, setValidEmail] = useState('')
    const [validPassword, setValidPassword] = useState('')
    const [validPasswordConfirm, setValidPasswordConfirm] = useState('')

    const usernameRef = React.createRef(null);
    const emailRef = React.createRef(null);
    const passwordRef = React.createRef(null);
    const passwordConfirmRef = React.createRef(null);

    const [register, { data, loading }] = useMutation(REGISTER_GQL, {
        onCompleted(data) {
            console.log(data.register)
        }
    })

    const mainStateContext = useContext(MainStateContext);
    let history = useHistory();
    let allowRegister = false;

    const userNameHandler = (event) => {
        setUserName(event.target.value)
        if (event.target.value.length == 0) {
            event.target.style.borderColor = "#F38370"
        } else {
            event.target.style.borderColor = "black"
            allowRegister = true;
        }
        //event.target.length == 0 ? 

        console.log(event.target.value.length);

        console.log(usernameRef);
    }

    const emailHandler = (event) => {
        setEmail(event.target.value)
        if (event.target.value.length == 0) {
            event.target.style.borderColor = "#F38370"
        } else {
            event.target.style.borderColor = "black"
            allowRegister = true;
        }
        console.log(event.target.value.length)
    }
    const passwordHandler = (event) => {
        setPassword(event.target.value)
        if (event.target.value.length == 0) {
            event.target.style.borderColor = "#F38370"
        } else {
            event.target.style.borderColor = "black"
            allowRegister = true;
        }
    }
    const paswordConfirmHandler = (event) => {
        setPasswordConfirm(event.target.value)
        if (event.target.value.length == 0) {
            event.target.style.borderColor = "#F38370"
        } else {
            event.target.style.borderColor = "black"
            allowRegister = true;
        }
    }
    const scrollToRef = (ref) => {
        
        window.scrollTo(0, ref.current.offsetTop)
        console.log(ref)

    }
    const myRef = React.createRef(null)
   const executeScroll = () => {
       scrollToRef(myRef)
    
   }
    const submitHandler = (e) => {
        console.log(userName, email, password, passwordConfirm)
        e.preventDefault();
        userNameHandler({ target: usernameRef.current });
        emailHandler({ target: emailRef.current })
        passwordHandler({ target: passwordRef.current })
        paswordConfirmHandler({ target: passwordConfirmRef.current })
        if (allowRegister) {
            register({ variables: { username: userName, password: password, email: email } })
        }
        return false;
    }
    let [firstArr, setArr] = useState(['Please click me'])
    const handleTest = () => {
        setArr(
           firstArr = [...firstArr],
            firstArr.push((Math.random() * (999)).toFixed(0)),
           
            

        )

        executeScroll()
        console.log(firstArr)
    }
    const logoutHandler = (props) => {
        mainStateContext.setState({
            ...mainStateContext.state,
            user: null,
        })
        setCookie('_token', null)
        history.push('/')

    }

    return (




        <div className={classes.main_form}>
            {mainStateContext.state.user ?

                <div className='auth-true' style={{ fontWeight: 900 }}>

                    Esti Autentificat !
                <div>
                        <a onClick={logoutHandler}>Logout </a>
                    </div>

                </div> :
                <form onSubmit={submitHandler}>
                    <div className="form-control">
                        <label for="username">Please enter your username: </label>
                        <input ref={usernameRef} id="username" onChange={userNameHandler} placeholder="Enter Your Username" value={userName} />
                    </div>
                    <div className="form-control">
                        <label for="email">Please enter your email: </label>
                        <input ref={emailRef} id="email" onChange={emailHandler} placeholder="Enter Your Email" value={email} />
                    </div>
                    <div className="form-control">
                        <label for="password">Please enter your password: </label>
                        <input ref={passwordRef} id="password" onChange={passwordHandler} placeholder="Enter Your Password" type="password" value={password} />
                    </div>
                    <div className="form-control">
                        <label for="passwordConfirm">Please confirm your password: </label>
                        <input ref={passwordConfirmRef} id="passwordConfirm" onChange={paswordConfirmHandler} placeholder="Confirm Your Password" type="password" value={passwordConfirm} />
                    </div>
                    <div>
                        {(data && data.register.success) ?
                            <div>
                                {data.register.message}
                         <br />
                                <Link to="/login">
                                    <button type='submit'>Login</button>
                                </Link>
                            </div>:
                             <div>{(data && data.register.message)}</div>
                            
                        }
                    </div>
                    <div onClick={handleTest} >
                       {firstArr.map(x => <div ref={myRef}>{x}</div>)}
                    </div>
                    <div>
                        {(data && data.register.success) ? null : <button type='submit'>Register</button>}
                    </div>
                </form>}
        </div>

    )

}

export default Register;