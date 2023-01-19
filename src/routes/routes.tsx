import { Navigate } from "react-router-dom"
import { IRoute, RoutesPathEnum } from "../models/route"
import EventPage from "../pages/EventPage"
import LoginPage from "../pages/LoginPage"
import RegistrationPage from "../pages/RegistrationPage"

export const publicRoutes:IRoute[] = [
    {
        path: RoutesPathEnum.loginPage,
        element: <LoginPage /> 
    },
    {
        path: RoutesPathEnum.registrationPage,
        element: <RegistrationPage/> 
    },
    {
        path: '*',
        element: <Navigate to={RoutesPathEnum.loginPage} /> 
    },
]

export const PrivaeRoutes:IRoute[] = [
    {
        path: RoutesPathEnum.eventPage,
        element: <EventPage /> 
    },
    {
        path: '*',
        element: <Navigate to={RoutesPathEnum.eventPage} /> 
    },
]