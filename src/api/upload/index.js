import {main, park} from '@/api/index'
//上传图片接口
export function uploadImgApi(params,type) {
    return main({
        url:`/PDAlogin/uploadImg?type=${type}`,
        method: 'POST',
        data:params
    })
}