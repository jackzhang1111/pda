import {main, park} from '@/api/index'
//售后列表
export function getbacklogisticsorderApi(params) {
    return park({
        url:`/logisticsorder/getbacklogisticsorder`,
        method: 'POST',
        data:params
    })
}

//售后详情
export function backlogisticsorderinfoApi(params) {
    return park({
        url:`/logisticsorder/backlogisticsorderinfo`,
        method: 'POST',
        data:params
    })
}

//售后接单
export function receivebacklogisticsorderApi(params) {
    return park({
        url:`/logisticsorder/receivebacklogisticsorder`,
        method: 'POST',
        data:params
    })
}

//售后取件
export function pickupbacklogisticsorderApi(params) {
    return park({
        url:`/logisticsorder/pickupbacklogisticsorder`,
        method: 'POST',
        data:params
    })
}