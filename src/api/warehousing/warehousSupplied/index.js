import {main, park} from '@/api/index'
//供货入库接口
export function supplyorderlistApi(params) {
    return park({
        url:`/storage/supplyorderlist`,
        method: 'POST',
        data:params
    })
}

//供货详情接口
export function orderinfoApi(params) {
    return park({
        url:`/storage/orderinfo`,
        method: 'GET',
        params
    })
}

//待上架详情接口
export function watingtheShelvesApi(params) {
    return park({
        url:`/storage/watingtheShelves`,
        method: 'GET',
        params
    })
}

//入库信息
export function confirmationStockInApi(params) {
    return park({
        url:`/storage/ConfirmationStockIn`,
        method: 'GET',
        params
    })
}

//上架详情
export function stockInToShelvesApi(params) {
    return park({
        url:`/storage/stockInToShelves`,
        method: 'POST',
        data:params
    })
}

//全部上架
export function stockInToShelvesAllApi(params) {
    return park({
        url:`/storage/stockInToShelvesAll`,
        method: 'POST',
        data:params
    })
}

//扫描供货单再扫描商品编码后的确定全部入库操作
export function scanproductbarcodeApi(params) {
    return park({
        url:`/storage/Scanproductbarcode`,
        method: 'POST',
        data:params
    })
}

//PDA首页订单数量统计
export function pdaselecthomeordertotalApi(params) {
    return park({
        url:`/storage/pdaselecthomeordertotal`,
        method: 'GET',
        params
    })
}

//PDA扫描入库
export function pdascanningordernoinApi(params) {
    return park({
        url:`/storage/pdascanningordernoin`,
        method: 'GET',
        params
    })
}

//PDA扫描出库
export function pdascanningordernooutApi(params) {
    return park({
        url:`/storage/pdascanningordernoout`,
        method: 'GET',
        params
    })
}
