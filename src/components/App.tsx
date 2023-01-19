import React, { useEffect, useState } from 'react'
import { Row } from 'antd';
import { Layout, Menu, theme } from 'antd';
import AppRouter from './AppRouter';
import MenuItem from 'antd/es/menu/MenuItem';
import NavBar from './NavBar';
import { Content } from 'antd/es/layout/layout';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';
import { useActions, useAppSelector } from '../hooks/redux';



const App: React.FC = () => {
  const { setUser, changeLoadingUser,removeUser } = useActions()
  const { isLoading } = useAppSelector(state => state.user)
  useEffect(() => {
    changeLoadingUser(true)
    onAuthStateChanged(auth, (user) => {
      if (user && user.email && user.displayName) {
        setUser({
          isAuth: true,
          user: {
            login: user.displayName,
            email: user.email,
            id: user.uid,
          }
        })
      }else{
        removeUser()
      }
    });
  }, [])


  return (
    <Layout>
      {!isLoading && <>
        <NavBar />
        <Layout>
          <Content >
            <AppRouter />
          </Content>
        </Layout>
      </>}
    </Layout>
  )
}

export default App