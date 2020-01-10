import {main, park} from '@/api/index'
//登录
export function loginApi(params) {
    return park({
        url:`/PDAlogin/pda/login`,
        method: 'POST',
        data:params
    })
}