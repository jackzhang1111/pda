import {main, park} from '@/api/index'
//售后列表
export function getlogisticsorderbyordersnApi(params) {
    return park({
        url:`/logisticsorder/getlogisticsorderbyordersn`,
        method: 'POST',
        data:params
    })
}

