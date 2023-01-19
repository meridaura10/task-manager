import React, { FC } from 'react'
import { Route, Routes } from 'react-router-dom'
import { PrivaeRoutes, publicRoutes } from '../routes/routes'
import { useAppSelector } from '../hooks/redux'

const AppRouter: FC = () => {
    const {isAuth} = useAppSelector(state => state.user)
    return (
        <Routes>
            {isAuth
             ? PrivaeRoutes.map(route => <Route key={route.path} path={route.path} element={route.element} />)
             : publicRoutes.map(route => <Route key={route.path} path={route.path} element={route.element} />)
             }
        </Routes>
    )
}

export default AppRouter