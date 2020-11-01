class XInput extends HTMLElement{
    constructor(){
        super();
        this.innerHTML = `<input class="x-input-default"/>`
    }
}
customElements.define("x-input",XInput)