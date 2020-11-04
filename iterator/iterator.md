迭代器的使用(主要争对对象)
1、先引入js
2、iterator(args,resultValueType),参数args可以是数组也可以是对象,参数resultValueType如果是数组就可以不用传,是对象的话有三个值"key"(获取对象的key),"value"(获取对象的value),不传(默认)(获取对象的key和value)
3、for(let val of iterator(array))              遍历数组array(返回val为array中的value)
   for(let val of iterator(object))             遍历对象object(返回val为object中的key和value)
   for(let val of iterator(object,"key"))       遍历对象object(返回val为object中的key)
   for(let val of iterator(object,"value"))     遍历对象object(返回val为object中的value)