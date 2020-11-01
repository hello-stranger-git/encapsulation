class XPagination extends HTMLElement{
    constructor(args){
        super();
        let obj = {
            pageCount:0,
            pageCurrent:0,
            currentPage:function(){}//选中当前页触发事件
        }
        this.options = Object.assign(obj,args)
        let pageCountEle = this.total(this.options.pageCount,this.options.pageCurrent);
        this.innerHTML = ` 
            <div>
                <button class="btn" id="prevBtn">上一页</button>
                <ul class="pager">
                ${pageCountEle}
                </ul>
                <button  class="btn" id="nextBtn">下一页</button>
            </div>`;
        this.li = this.querySelectorAll(".pager>li");//获取所有页码按钮li元素
        this.liEle(this.options.currentPage)
        this.prevBtn = this.querySelector("#prevBtn")//获取上一页按钮元素
        this.nextBtn = this.querySelector("#nextBtn")//获取下一页按钮元素      
    }
    total(pageCount,pageCurrent){//遍历有多少页
        let li = ""
        for (let i = 0;i<pageCount;i++){
            if(pageCurrent==i+1){
                li+=`<li class="number active">${i+1}</li>`
            }else{
                li+=`<li class="number">${i+1}</li>`
            }
        }
        return li
    }

    liEle(fn){//给每一个页码按钮绑定的点击事件
        if(this.li.length>1){//当页码数大于1时
            this.addLiEvent(this.li,"click",(li,item)=>{
                this.removeActive()
                if(parseInt(li.textContent)==item+1){
                    li.classList.add("active");
                }
                fn(li)
            })
        }
    }
    addLiEvent(eles,event,fn){//添加页码点击
        if(eles&&eles.length&&eles.length>1){
            eles.forEach((ele,item) => {
                ele.addEventListener(event,()=>{
                    fn(ele,item)
                })
            });
        }else{
            eles[0].addEventListener(event,()=>{
                fn()
            })
        }
    }
    prevBtnClick(fn){//给每个按钮绑定点击事件
        this.addBtnEvent(this.prevBtn,"click",fn,"prev")
    }
    nextBtnClick(fn){//给每个按钮绑定点击事件
        this.addBtnEvent(this.nextBtn,"click",fn,"next")
    }
    addBtnEvent(eles,event,fn,type){//添加按钮点击事件
        if(this.li.length>1){
            eles.addEventListener(event,()=>{
                let pageIndex;
                this.li.forEach((item,index)=>{
                    if(item.className.indexOf("active") > -1){
                        pageIndex = index
                    }  
                })
                if(type==="prev"){
                    if(pageIndex){
                        this.removeActive()
                        this.li[pageIndex-1].classList.add("active");
                        fn(this.li[pageIndex-1])
                    }
                }else if(type==="next"){
                    if(pageIndex<this.li.length-1){
                        this.removeActive()
                        this.li[pageIndex+1].classList.add("active");
                        fn(this.li[pageIndex+1])
                    }

                }
            })
        }

    }
    removeActive(){//移除选中的样式active
        this.li.forEach(item=> {
            if(item.className.indexOf("active") > -1){
                item.classList.remove("active");
            }
        })
    }
}
customElements.define("x-pagination",XPagination)
