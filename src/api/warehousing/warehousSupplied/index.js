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