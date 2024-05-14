// 登录接口需要携带的参数ts类型
export interface LoginForm {
    username: string,
    password: string
}

interface dataType {
    token: string
}

// 登录接口返回的结果类型
export interface LoginReponseData {
    code: Number,
    data: dataType
}

// 定义服务器返回用户信息相关的数据类型
interface userInfo {
    userId: Number,
    avatar: string,
    username: string,
    password: string,
    desc: string,
    roles: string[],
    buttons: string[],
    routes: string[],
    token: String
}
interface user {
    checkUser: userInfo
}
export interface UserResponseDatao {
    code: Number,
    data: user
}
