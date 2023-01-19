import { Button, Form, Input, Row } from 'antd'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from 'react'
import { rulesFrom } from '../utils/rules'
import { useActions, useAppSelector } from '../hooks/redux'
import { Link } from 'react-router-dom'
import { RoutesPathEnum } from '../models/route'
import { auth } from '../firebase'

const LoginForm: React.FC = () => {
    const { changeLoadingUser, setUser } = useActions()
    const { isLoading, error } = useAppSelector(state => state.user)
    const [password, setPassword] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const login = () => {
        changeLoadingUser(true)
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                if (user.email && user.displayName) {
                    setUser({
                        isAuth: true,
                        user: {
                            email: user.email,
                            id: user.uid,
                            login: user.displayName,
                        }
                    })
                }
            })
            .catch((error) => {
                console.log(error);

                // const errorCode = error.code;
                // const errorMessage = error.message;
            });
    }
    return (
        <Form
            name="basic"
            autoComplete="off"
            onFinish={login}
            className='form'
        >
            <div className='formText'>
                form login
            </div>
            {error && <div>
                error:  {error}
            </div>}
            <Form.Item
                label="Password"
                name="password"
                rules={[rulesFrom.require({
                    required: true,
                    message: 'Please input your password!',
                })]}
            >
                <Input type='password' value={password} onChange={(e => setPassword(e.target.value))} />
            </Form.Item>
            <Form.Item
                label="email"
                name="email"
                rules={[rulesFrom.require({
                    required: true,
                    message: 'Please input your email!',
                })]}
            >
                <Input type='email' value={email} onChange={(e => setEmail(e.target.value))} />
            </Form.Item>
            {/* 
            <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
                <Checkbox >Remember me</Checkbox>
            </Form.Item> */}
            <Row justify={'center'}>
                <Form.Item>
                    <Button loading={isLoading} type="primary" htmlType="submit">
                        sign in
                    </Button>
                </Form.Item>
            </Row>
            <div className='and'>
                and
            </div>
            <Row justify={'center'}>
                <Link to={RoutesPathEnum.registrationPage}>sign up</Link>
            </Row>
        </Form>
    )
}

export default LoginForm