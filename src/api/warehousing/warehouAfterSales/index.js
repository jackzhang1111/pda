import {main, park} from '@/api'
//售后退货入库按钮加载的详情数据
export function customerservicebackorderApi(params) {
    return park({
        url:`/storage/customerservicebackorder`,
        method: 'GET',
        params
    })
}

//售后退货确认全部入库
export function customerservicebackorderinstockAllApi(params) {
    return park({
        url:`/storage/customerservicebackorderinstockAll`,
        method: 'POST',
        data:params
    })
}

//售后退货入库列表信息
export function customerservicebackorderlistApi(params) {
    return park({
        url:`/storage/customerservicebackorderlist`,
        method: 'POST',
        data:params
    })
}

//售后退货入库上架详情
export function customerservicebackordershelvesApi(params) {
    return park({
        url:`/storage/customerservicebackordershelves`,
        method: 'POST',
        data:params
    })
}

//售后退货入库待取件、待入库、已完成详情
export function customerservicebackorderdetailApi(params) {
    return park({
        url:`/storage/customerservicebackorderdetail`,
        method: 'GET',
        params
    })
}
