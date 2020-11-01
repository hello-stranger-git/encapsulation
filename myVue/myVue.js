class Vue{
    constructor(options){
        this.options = options
        this._data = options.data
        this.observe(this._data)
        this.compile()
    }


    observe(data){//数据劫持
        let keys = Object.keys(data)
        // let _this = this
        keys.forEach(key=>{
            let value = data[key]
            let dep = new Dep()
            Object.defineProperty(data,key,{
                configuratable:true,
                enumerable:true,
                get(){
                    if(Dep.target){
                        dep.addSub(Dep.target);
                    }
                    return value
                },
                set(newValue){
                    dep.notify(newValue)//发布
                    value = newValue
                }
            })
        })
    }


    //编译
    compile(){
        let el = document.querySelector(this.options.el)
        this.compileNodes(el)
    }

    //查找子节点并替换相关数据
    compileNodes(el){
        let childNodes = el.childNodes;
        childNodes.forEach(node=>{
            switch(node.nodeType){
                case 1:
                    this.eleNode(node)
                    break
                case 3:
                    this.textNode(node)
                    break
            }
        })
    }

    //元素节点处理
    eleNode(node){
        if(node.hasAttribute("x-model")){//查找是否有动态绑定指令
            let xModelValue = node.getAttribute("x-model");
            node.value = this._data[xModelValue]
            node.addEventListener("input",e=>{
                this._data[xModelValue] = e.target.value
            })
        }
        if(node.childNodes.length>0){
            this.compileNodes(node)
        }
    }

    //文本节点处理
    textNode(node){
        let reg = /\{\{\s*([^\{\}\s]*)\s*\}\}/g  //正则匹配插值表达式
        let textContent = node.textContent;
        if(reg.test(textContent)){
            let $1 = RegExp.$1
            node.textContent = node.textContent.replace(reg,this._data[$1])
            
            new Watcher(this._data,$1,(newValue)=>{
                let oldValue = this._data[$1]
                let reg=oldValue?new RegExp(oldValue,"g"):""
                node.textContent = node.textContent.replace(reg,newValue)
            })
        }

        
    }
}

class Dep{//用来收集订阅者并且发布
    constructor(){
        this.subs = []
    }

    //添加订阅者
    addSub(sub){
        this.subs.push(sub)
    }

    //用来触发watcher中的updata方法
    notify(newValue){
        this.subs.forEach(sub=>{
            sub.updata(newValue)
        })
    }
}

class Watcher{//订阅者，触发回调方法
    constructor(data,key,cb){
        this.cb = cb
        Dep.target = this
        data[key]
        Dep.target = null
    }
    //当数据更新的时候
    updata(newValue){
        this.cb(newValue)
    }
}