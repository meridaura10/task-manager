import React, { useState } from 'react'
import { Button, Checkbox, Form, Input, Row } from 'antd'
import { rulesFrom } from '../utils/rules'
import { useActions, useAppSelector } from '../hooks/redux'
import { Link } from 'react-router-dom'
import { RoutesPathEnum } from '../models/route'
import { auth } from '../firebase'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../store'
import { setUserToFirebase } from '../store/slice/AsyncThunk/users/users'
const RegistrationForm: React.FC = () => {
    const dispath: AppDispatch = useDispatch()
    const { changeLoadingUser, setUser } = useActions()
    const { isLoading, error } = useAppSelector(state => state.user)
    const [username, setUsername] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [email, setEmail] = useState<string>('')

    const signUp = async () => {
        changeLoadingUser(true)
        try {
            createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                return userCredential.user;
            })
            .then((user) => {
                updateProfile(user, {
                    displayName: username,
                })
                return user
            }).then((user) => {
                dispath(setUserToFirebase({
                    email,
                    login: user.displayName || username,
                    id: user.uid,
                }))
            })
        } catch (error) {
            console.log(error);
            
        }
    }
    return (
        <Form
            name="basic"
            autoComplete="off"
            onFinish={signUp}
            className='form'
        >
            <div className='formText'>
                registration form
            </div>
            {error && <div>
                error:  {error}
            </div>}
            <Form.Item
                label="Username"
                name="username"
                rules={[rulesFrom.require({
                    required: true,
                    message: 'Please input your username!',
                })]}
            >
                <Input type='text' value={username} onChange={(e => setUsername(e.target.value))} />
            </Form.Item>

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
                        sign up
                    </Button>
                </Form.Item>
            </Row>
            <div className='and'>
                and
            </div>
            <Row justify={'center'}>
                <Link to={RoutesPathEnum.loginPage}>sign in</Link>
            </Row>
        </Form>
    )
}

export default RegistrationForm