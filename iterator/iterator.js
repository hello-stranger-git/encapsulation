//迭代器封装,主要是对象类型的处理
class Iterator {
    constructor(args, resultValType) {
        if (Array.isArray(args)) {//判断是否为数组
            return args
        } else if (args.constructor === Object) {//为对象
            return this.objIterator(args, resultValType)
        } else {
            throw args + " Not an array or an object"
        }
    }
    //给对象添加迭代器
    objIterator(obj, resultValType) {
        obj[Symbol.iterator] = function () {
            let keys = Object.keys(obj)//获取所有的键
            let values = Object.values(obj)//获取所有的值
            let index = 0
            let resultVal = {}//返回值的类型

            return {
                next() {
                    if (index >= keys.length) {//判断是否迭代完
                        return {
                            done: true
                        }
                    } else {
                        switch (resultValType) {
                            case "key":
                                resultVal = keys[index++]//只返回key
                                break;
                            case "key":
                                resultVal = values[index++]//只返回value
                                break;
                            default:
                                resultVal = {//返回key和value(默认)
                                    key: keys[index],
                                    value: obj[keys[index++]]
                                }
                        }
                        return {//最后返回值
                            done: false,
                            value: resultVal
                        }
                    }
                }
            }
        }
        return obj
    }
}
function iterator(args, resultValType) {
    return new Iterator(args, resultValType)
}