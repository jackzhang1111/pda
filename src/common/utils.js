//对象数组的深拷贝
export function objDeepCopy(source) {
    var sourceCopy = source instanceof Array ? [] : {};
    for (var item in source) {
        sourceCopy[item] = typeof source[item] === 'object' ? objDeepCopy(source[item]) : source[item];
    }
    return sourceCopy;
}
// 实时监听提交按钮是否可以点击
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

