import React, { useState } from 'react'
import Axios from 'axios'
import { useDispatch } from 'react-redux';
import { loginUser } from '../../../_actions/user_action';
import { withRouter } from 'react-router-dom';
import './style.css';
import Map from '../../../pictures/homepage-Gido.png'

function LoginPage(props) {
    const dispatch = useDispatch();

    const [Email, setEmail] = useState("")
    const [Password, setPassword] = useState("")

    const onEmailHandler = (event) => {
        setEmail(event.currentTarget.value)
    }
    const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value)
    }
    const onSubmitHandler = (event) => {
        event.preventDefault();
        let body = {
            email: Email,
            password: Password
        }
        dispatch(loginUser(body))
            .then(response => {
                if (response.payload.loginSuccess) {
                    window.localStorage.setItem('userId', response.payload.userId);
                    props.history.push('/Search')
                } else {
                    alert('Error˝')
                }
            })
    }
    return (
            <div id='smallbox'>
            
            <form style={{ display: 'flex', flexDirection: 'column' }}
                onSubmit={onSubmitHandler}
            >
            <div class="header">
                <div class="inner-header flex">
                    <div id='Bigbox'>
                   
                        
                    {/*<img src={Map} style={{width:600}} />*/}
                   
                    <label>Email</label>
                    <input type="email" value={Email} onChange={onEmailHandler} />
                    <p></p>
                    <label>Password</label>
                    <input type="password" value={Password} onChange={onPasswordHandler} />
                    <br />
                    <button style={{color:'white'}} type="submit">
                        Login
                    </button>
                    </div>
                </div>

                <div>
                <svg class="waves" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"
                viewBox="0 24 150 28" preserveAspectRatio="none" shape-rendering="auto">
                <defs>
                <path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
                </defs>
                <g class="parallax">
                        <use xlinkHref="#gentle-wave" x="48" y="0" fill="rgba(255,255,255,0.7" />
                <use xlinkHref="#gentle-wave" x="48" y="3" fill="rgba(255,255,255,0.5)" />
                <use xlinkHref="#gentle-wave" x="48" y="5" fill="rgba(255,255,255,0.3)" />
                <use xlinkHref="#gentle-wave" x="48" y="7" fill="#fff" />
                </g>
                </svg>
                </div>


              </div>
              
                
            </form>
            </div>
    )
}

export default withRouter(LoginPage)
