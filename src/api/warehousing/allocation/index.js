import { main, park } from '@/api/index'
//调拨入库列表信息接口
export function transferinstockorderlistApi(params) {
    return park({
        url: `/storage/transferinstockorderlist`,
        method: 'POST',
        data: params
    })
}

//调拨出库列表信息接口
export function transferoutstockorderlistApi(params) {
    return park({
        url: `/storage/transferoutstockorderlist`,
        method: 'POST',
        data: params
    })
}

//调拨下架详情/与调拨出库详情页
export function transferouttockdowmprolistApi(params) {
    return park({
        url: `/storage/transferouttockdowmprolist`,
        method: 'GET',
        params
    })
}

//销调拨出库待下架、待出库、已出库详情
export function transferouttockdowmprodetailApi(params) {
    return park({
        url: `/storage/transferouttockdowmprodetail`,
        method: 'GET',
        params
    })
}

//销调拨出库待下架、待出库、已出库详情
export function transferinstockdowmprodetailApi(params) {
    return park({
        url: `/storage/transferinstockdowmprodetail`,
        method: 'GET',
        params
    })
}

//调拨入库点击入库按钮
export function transferinstockdowmprobtnApi(params) {
    return park({
        url: `/storage/transferinstockdowmprobtn`,
        method: 'GET',
        params
    })
}

//调拨入库确认全部入库按钮
export function transferinstockdowmprobtnstockApi(params) {
    return park({
        url: `/storage/transferinstockdowmprobtnstock`,
        method: 'GET',
        params
    })
}

//调拨入库上架详情
export function transferinstockdowmproshelvesApi(params) {
    return park({
        url: `/storage/transferinstockdowmproshelves`,
        method: 'POST',
        data: params
    })
}



//通过扫描得到的商品条码（fnsku条码）得到待入库的单据列表
export function getwillstockinorderlistbyfnskucodeApi(params) {
    return park({
        url: `/transferstockinorder/getwillstockinorderlistbyfnskucode`,
        method: 'POST',
        data: params
    })
}

//通过调拨出库单Id +商品条码得到确认入库页面的信息
export function gettransferinstockorderconfirminfoApi(params) {
    return park({
        url: `/transferstockinorder/gettransferinstockorderconfirminfo`,
        method: 'POST',
        data: params
    })
}

//确认调拨入库
export function confirmtransferinstockorderApi(params) {
    return park({
        url: `/transferstockinorder/confirmtransferinstockorder`,
        method: 'POST',
        data: params
    })
}
//通过入库单号得到确认上架页面的信息
export function getshelfuporderconfirminfoApi(params) {
    return park({
        url: `/transferstockinorder/getshelfuporderconfirminfo`,
        method: 'POST',
        data: params
    })
}
//通过入库仓库Id获取可上架的位置
export function getcanupregionlistApi(params) {
    return park({
        url: `/transferstockinorder/getcanupregionlist`,
        method: 'POST',
        data: params
    })
}
//调拨入库确认上架（支持部分上架）
export function confirmtransfershelfuporderApi(params) {
    return park({
        url: `/transferstockinorder/confirmtransfershelfuporder`,
        method: 'POST',
        data: params
    })
}