import vnode from './vnode'
import createElement from './createElement'
import pachvNode from './pachvNode'
export default function(oldVnode, newVnode){
    
    if (oldVnode.sel == undefined) {
        // 非虚拟节点
        // 则转虚拟节点
        oldVnode = vnode({
            sel: oldVnode.tagName.toLowerCase(), // div, h1等 标签名
            data: {},
            text: undefined, // 不需要得到老节点的这些值,目前用不上
            children: {},   // 不需要得到老节点的这些值,目前用不上
            elm: oldVnode  // oldVnode.elm 指向原来的实体节点
        })
    }
    // 判断新旧节点 是不是同一节点
    if (oldVnode.sel === newVnode.sel){
        // 如果是则执行多种情况判断
        pachvNode(oldVnode, newVnode)
    } else {
        // 如果不是，直接删除原来的节点，附上新的节点
        // ---
        // 创建新虚拟节点的实体节点
        let newVnodeElm = createElement( newVnode ) // 写的函数,目的是有节点有子节点
        // console.log(newVnodeElm.children)
        // 替换原节点
        newVnodeElm && oldVnode.elm.parentNode.replaceChild(newVnode.elm, oldVnode.elm)
    }


}   