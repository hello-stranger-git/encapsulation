class XButton extends HTMLElement{
    constructor(){
        super();
        this.innerHTML = `<button ${this.disabled?'disabled':''}
        class="x-button ${this.type} ${this.round} ${this.disabled} ${this.size}" 
        >
        ${this.innerText}
        </button>`;
    }
    get type(){
        let type = this.getAttribute("type")
        switch(type){
            case "primary":
                return 'x-button-primary'
            case "warning":
                return 'x-button-warning'
            case "danger":
                return 'x-button-danger'
            case "text":
                return "x-button-text"
            default:
                return "x-button-default"
        }
    }
    get round(){//是否有圆角
        let hasRound = this.hasAttribute("round")
        let round = this.getAttribute("round")
        if((hasRound&&round=="")||(hasRound&&round)){
            return "is-round"
        }else{
            return ""
        }
    }
    get disabled(){//是否禁用
        let hasDisabled = this.hasAttribute("disabled")
        let disabled = this.getAttribute("disabled")
        if((hasDisabled&&disabled=="")||(hasDisabled&&disabled=="true")){
            return "is-disabled"
        }else{
            return ""
        }
    }
    get size(){//按钮大小
        let size = this.getAttribute("size")
        switch(size){
            case "medium":
                return 'x-button-medium'
            case "small":
                return 'x-button-small'
            case "mini":
                return 'x-button-mini'
            default:
                return ""
        }
    }
}
customElements.define("x-button",XButton)