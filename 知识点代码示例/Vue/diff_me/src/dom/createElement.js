export default function createElement( newVnode ){
    // 传来的数据格式: {sel, data, text, children, elm}
    let newVnodeElm = document.createElement(newVnode.sel)
    if (newVnode.text){
        newVnodeElm.innerText =  newVnode.text
    } else {
        // 有children
        newVnode.children.forEach((item) => {
            let tempChild = createElement(item)
            newVnodeElm.appendChild(tempChild)
        })
    }
    // 补充elm属性
    newVnode.elm = newVnodeElm

    return newVnodeElm
}