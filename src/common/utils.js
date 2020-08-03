//对象数组的深拷贝
// export function objDeepCopy(source) {
//     var sourceCopy = source instanceof Array ? [] : {};
//     for (var item in source) {
//         sourceCopy[item] = typeof source[item] === 'object' ? objDeepCopy(source[item]) : source[item];
//     }
//     return sourceCopy;
// }
//对象数组的深拷贝
export function objDeepCopy(obj) {
        let result = obj
        // 如果value值为object类型并且非空, 进行递归
        if (typeof obj === 'object' && obj !== null) {
            // 判断value值类型是数组还是对象
            result = Object.prototype.toString.call(obj) === '[object Object]' ? {} : []
            // 这个就是赋值的过程, 好好去理解递归的精髓
            for(let prop in obj) {
                result[prop] =objDeepCopy(obj[prop])
            }
        }
        // 如果为除object的其他类型, 直接把value值赋给对应的key
        return result
    
}
export function isDisabled(formData, rules) {
    let rulesData = Object.keys(rules)
    let disabled = false
    try {
        rulesData.forEach(item => {            
            if (rules[item].required && (formData[item] == '' || formData[item].length == 0 || formData[item] == null)) {
                disabled = true
                foreach.break = new Error();
            }
        });
    } catch (e) {
        return disabled;
    }
    return disabled
}

// 校验表单
export function formValidate(formData, rules) {
    
    let rulesData = Object.keys(rules)
    
    let errorMassage = { isError: false, message: '' }
    try {
        rulesData.forEach(item => {
            if(rules[item].required && formData[item] == ''){
                errorMassage = { isError: true, message: rules[item].meage}
                foreach.break = new Error();
            }else if (formData[item]!=''&&rules[item].reg&&!formData[item].match(rules[item].reg)) {
                errorMassage = { isError: true, message: rules[item].messages }
                foreach.break = new Error();
            }else if(formData[item] != '' && rules[item].validate){
                rules[item].validate(formData[item],function(){
                    errorMassage = { isError: true, message: rules[item].messages }
                    foreach.break = new Error();
                })
            }
        });
    }catch (e) {
        return errorMassage;
    }
    return errorMassage
}

//排序
export function compare(property) {
    return function (a, b) {
        var value1 = a[property];
        var value2 = b[property];
        return value1 - value2;
    }
}

//字符串去除左右空格
export function strTrim(string){
    return string.replace(/(^\s*)|(\s*$)/g, "");
}

//对象内所有字符串去除左右空格
export function objTrim(obj){
    var trims = {}
    Object.keys(obj).forEach(item=>{
        if(typeof obj[item] == 'string'){
            trims[item] = typeof obj[item] === 'string' ? obj[item].replace(/(^\s*)|(\s*$)/g, ""):"" 
        }else{
            trims[item] = obj[item]
        }
    })
    return trims;
}

//价格字段匹配
export function priceReg(row){
    let price = ""
    if(row.priceXq){
        price = row.priceXq
    }else{
        price = (typeof row.price) == 'object' ? 0 : row.price
    }
    return price
}

export function deepnull(obj){
    for(let k in obj){
        if(typeof obj[k] == 'object'){
            deepnull(obj[k])
        }else if(obj[k] == ''){
            obj[k] = null
        }else{
            obj[k] = null
        }
    }
}

