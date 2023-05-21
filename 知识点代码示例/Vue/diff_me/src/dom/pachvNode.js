import updataChildren from './updataChildren'
import createElement from './createElement'
export default function(oldVnode, newVnode){
    // 判断新节点是否有children
    if (!newVnode.children){
        // 没有说明只是文本直接赋值
        oldVnode.elm && (oldVnode.elm.innerText = newVnode.text)
    } else {
        // 有子节点 
        // 判断旧节点是否有children
        if (oldVnode.children && oldVnode.children.length > 0){
            // diff核心
            updataChildren(oldVnode.elm, oldVnode.children, newVnode.children)
            
        } else {
            // 旧节点没有子节点，也是直接清空旧节点， 再赋新节点的children
            oldVnode.elm.innerHTML = ''
            for (let child of newVnode.children){
                let childDOM = createElement(child)
                oldVnode.elm.appendChild(childDOM)
            }
        }
    }
}