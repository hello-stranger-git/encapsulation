class DeepCopy{

    deep(arr,arrData){//深拷贝函数
        let obj = arr
        for(let key in arrData){
            if(typeof arrData[key] ==="object"){//判断是否是引用类型
                arr = arrData[key].constructor===Array?[]:{}//判断是是对象还是数组
                obj[key] = this.deep(arr,arrData[key])//递归
            }else{
                obj[key] = arrData[key]
            }
        }
        return obj
    }
}