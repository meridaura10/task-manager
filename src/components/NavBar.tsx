import { Menu, Row } from 'antd'
import { Header } from 'antd/es/layout/layout'
import MenuItem from 'antd/es/menu/MenuItem'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { RoutesPathEnum } from '../models/route'
import { useActions, useAppSelector } from '../hooks/redux'
import { auth } from '../firebase'
import { signOut } from 'firebase/auth'

const NavBar: React.FC = () => {
  const navigate = useNavigate()
  const { isAuth, user } = useAppSelector(state => state.user)
  const { removeUser, changeLoadingUser } = useActions()

  const relogin = () => {
    changeLoadingUser(true)
    signOut(auth).then(() => {
      removeUser()
    }).catch((error) => {
      console.log(error);
    });
  }
  return (
    <Header className="header">
      <Row align='middle' justify='space-between'>
        <div className="logo">task manager</div>
        {isAuth
          ? <>
            <Row align='middle'>
              <div className='userInfo'>{user.login}</div>
              <Menu selectable={false} theme="dark">
                <MenuItem className='header__item' onClick={relogin}>sign out</MenuItem>
              </Menu>
            </Row>
          </>
          : <>
            <Menu selectable={false} theme="dark">
              <MenuItem className='header__item' onClick={() => navigate(RoutesPathEnum.loginPage)}>login</MenuItem>
            </Menu>
          </>
        }
      </Row>
    </Header>
  )
}

export default NavBar