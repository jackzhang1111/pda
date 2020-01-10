import {main, park} from '@/api/index'
//配送列表
export function getlogisticsorderApi(params) {
    return park({
        url:`/logisticsorder/getlogisticsorder`,
        method: 'POST',
        data:params
    })
}