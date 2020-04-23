import {main, park} from '@/api/index'
//供货入库接口
export function returngoodsstockorderlistApi(params) {
    return park({
        url:`/storage/returngoodsstockorderlist`,
        method: 'POST',
        data:params
    })
}

//采购退货详情
export function returngoodsstockdowmdetailApi(params) {
    return park({
        url:`/storage/returngoodsstockdowmdetail`,
        method: 'GET',
        params
    })
}

//采购退货下架详情
export function returngoodsstockdowmprolistApi(params) {
    return park({
        url:`/storage/returngoodsstockdowmprolist`,
        method: 'GET',
        params
    })
}

//采购退货下架操作
export function returngoodsstockdowmAllApi(params) {
    return park({
        url:`/storage/returngoodsstockdowmAll`,
        method: 'POST',
        data:params
    })
}


//确认出库
export function returngoodsstockdowmApi(params) {
    return park({
        url:`/storage/returngoodsstockdowm`,
        method: 'POST',
        data:params
    })
}