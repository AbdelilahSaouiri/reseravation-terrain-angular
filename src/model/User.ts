export interface RegisterUser{
    username: string,
    email: string,
    year:number,
    password: string,
    confirmPassword: string,
}

export interface LoginUser{
    email: string,
    password:string
}

export interface confirmation{
    message: string,
    confirmatioToken: string,
    name: string,
}