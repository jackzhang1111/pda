import {main, park} from '@/api/index'
//销售出库列表信息
export function saleoutorderlistApi(params) {
    return park({
        url:`/storage/saleoutorderlist`,
        method: 'POST',
        data:params
    })
}

//销售待拣货/下架详情-待打包/出库详情-已出库详情
export function saleoutstockdowmdetailApi(params) {
    return park({
        url:`/storage/saleoutstockdowmdetail`,
        method: 'GET',
        params
    })
}

//销售下架详情
export function saleoutorderstockdowmprolistApi(params) {
    return park({
        url:`/storage/saleoutorderstockdowmprolist`,
        method: 'GET',
        params
    })
}

//销售下架获取所有商品入库批次列表信息
export function saleoutorderstockdowmprobatchNoApi(params) {
    return park({
        url:`/storage/saleoutorderstockdowmprobatchNo`,
        method: 'POST',
        data:params
    })
}

//销售下架获取所有商品入库批次对应的库位列表信息
export function saleoutorderstockdowmprobatchRegionApi(params) {
    return park({
        url:`/storage/saleoutorderstockdowmprobatchRegion`,
        method: 'POST',
        data:params
    })
}