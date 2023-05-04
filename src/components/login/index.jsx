import React from 'react'
import { useState, useEffect } from "react"
import { usePostLoginMutation, usePostSignUpMutation } from "@/state/api"
function Login({ setUser, setSecret }) {
    const [isRegister, setIsRegister] = useState(false);
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [triggerLogin, resultLogin] = usePostLoginMutation();
    const [triggerSignUp] = usePostSignUpMutation();

    console.log("in login component")

    const handleLogin = () => {
        triggerLogin({ username, password })
    }

    const handleRegister = () => {
        triggerSignUp({ username, password })
    }

    useEffect(() => {
        if (resultLogin.data?.response) {
            setUser(username);
            setSecret(password);
            console.log('login return, set user and secret')
        }
    }, [resultLogin.data])

    return (
        <div className="login-page">
            <div className="login-container">
                <h2 className="title">强洲GPT深度智能在线学习平台</h2>
                <p className='register-change' onClick={() => setIsRegister(!isRegister)}>
                    {isRegister ? "已经注册?" : "是否为新用户?"}
                </p>

                <div>

                    <input className='login-input' type="text"
                        placeholder='用户名' value={username}
                        onChange={(e) => setUserName(e.target.value)}
                    ></input>

                    <input className='login-input' type="text"
                        placeholder='密码' value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    ></input>
                </div>

                <div className='login-action'>
                    {isRegister ? (<button type="button" onClick={handleRegister}>注册</button>) :
                        (<button type="button" onClick={handleLogin}>登录</button>)}
                </div>

            </div>

        </div>
    )
}

export default Login
