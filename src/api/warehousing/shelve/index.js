import {main, park} from '@/api/index'
//上架列表
export function waitingforlaunchorderlistApi(params) {
    return park({
        url:`/storage/waitingforlaunchorderlist`,
        method: 'GET',
        params
    })
}

//下架列表
export function waitingfordismountingorderlistApi(params) {
    return park({
        url:`/storage/waitingfordismountingorderlist`,
        method: 'GET',
        params
    })
}