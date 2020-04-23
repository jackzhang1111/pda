import {main, park} from '@/api/index'
//调拨入库列表信息接口
export function transferinstockorderlistApi(params) {
    return park({
        url:`/storage/transferinstockorderlist`,
        method: 'POST',
        data:params
    })
}

//调拨出库列表信息接口
export function transferoutstockorderlistApi(params) {
    return park({
        url:`/storage/transferoutstockorderlist`,
        method: 'POST',
        data:params
    })
}

//调拨下架详情/与调拨出库详情页
export function transferouttockdowmprolistApi(params) {
    return park({
        url:`/storage/transferouttockdowmprolist`,
        method: 'GET',
        params
    })
}

//销调拨出库待下架、待出库、已出库详情
export function transferouttockdowmprodetailApi(params) {
    return park({
        url:`/storage/transferouttockdowmprodetail`,
        method: 'GET',
        params
    })
}

//销调拨出库待下架、待出库、已出库详情
export function transferinstockdowmprodetailApi(params) {
    return park({
        url:`/storage/transferinstockdowmprodetail`,
        method: 'GET',
        params
    })
}

//调拨入库点击入库按钮
export function transferinstockdowmprobtnApi(params) {
    return park({
        url:`/storage/transferinstockdowmprobtn`,
        method: 'GET',
        params
    })
}

//调拨入库确认全部入库按钮
export function transferinstockdowmprobtnstockApi(params) {
    return park({
        url:`/storage/transferinstockdowmprobtnstock`,
        method: 'GET',
        params
    })
}

//调拨入库上架详情
export function transferinstockdowmproshelvesApi(params) {
    return park({
        url:`/storage/transferinstockdowmproshelves`,
        method: 'POST',
        data:params
    })
}