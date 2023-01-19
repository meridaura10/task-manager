export interface IRoute {
    path: string,
    element: React.ReactNode,
}
export enum RoutesPathEnum {
    loginPage = '/login',
    registrationPage = '/registration',
    eventPage = '/'
}