import {main, park} from '@/api/index'
//配送列表
export function getlogisticsorderApi(params) {
    return park({
        url:`/logisticsorder/getlogisticsorder`,
        method: 'POST',
        data:params
    })
}

//配送详情
export function logisticsorderinfoApi(params) {
    return park({
        url:`/logisticsorder/logisticsorderinfo`,
        method: 'POST',
        data:params
    })
}

//接单
export function receivelogisticsorderApi(params) {
    return park({
        url:`/logisticsorder/receivelogisticsorder`,
        method: 'POST',
        data:params
    })
}


//揽件
export function pickuplogisticsorderApi(params) {
    return park({
        url:`/logisticsorder/pickuplogisticsorder`,
        method: 'POST',
        data:params
    })
}

//签收/拒签
export function signlogisticsorderApi(params) {
    return park({
        url:`/logisticsorder/signlogisticsorder`,
        method: 'POST',
        data:params
    })
}