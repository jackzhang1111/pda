import {main, park} from '@/api/index'
//通过物流单号得到物流单Id
export function getlogisticsorderbyordersnApi(params) {
    return park({
        url:`/logisticsorder/getlogisticsorderbyordersn`,
        method: 'POST',
        data:params
    })
}
//获取物流模块主页数据
export function getlogisticscenterdataApi(params) {
    return park({
        url:`/logisticsorder/getlogisticscenterdata`,
        method: 'POST',
        data:params
    })
}

