import {main, park} from '@/api/index'
//登录
export function loginApi(params) {
    return park({
        url:`/PDAlogin/pda/login`,
        method: 'POST',
        data:params
    })
}

//共方法返回图片服务器的路径
export function gethttpimgurlApi(params) {
    return park({
        url:`/PDAlogin/gethttpimgurl`,
        method: 'POST',
        data:params
    })
}

//用户退出登录
export function logoutApi() {
    return park({
        url:`/PDAlogin/logout`,
        method: 'POST',
    })
}