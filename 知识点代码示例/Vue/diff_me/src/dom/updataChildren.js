//参数一：真实dom节点
//参数二：旧的虚拟节点
//参数三：新的虚拟节点
import patchvNode from './pachvNode'
import createElement from './createElement'
export default function(parentDom, oldCh, newCh){
    let oldStartIdx = 0                   //旧前的指针
    let oldEndIdx = oldCh.length - 1   //旧后的指针
    let newStartIdx = 0                   //新前的指针
    let newEndIdx = newCh.length - 1   //新后的指针

    let oldStartVnode = oldCh[oldStartIdx];   	//旧前虚拟节点
	let oldEndVnode = oldCh[oldEndIdx];         //旧后虚拟节点
	let newStartVnode = newCh[newStartIdx];     //新前虚拟节点
	let newEndVnode = newCh[newEndIdx];         //新后虚拟节点

    while(oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx){
        if (!oldStartVnode) {
            oldStartVnode = oldCh[++oldStartIdx]
        }
        if (!oldEndVnode) {
            oldEndVnode = oldCh[--oldEndIdx]
        }
        // 第一种情况 旧前 比 新前
        else if (isSameVnode(oldStartVnode, newStartVnode)){
            console.log('1')
            // 这里进去会执行老节点的文本赋值，目的是不生成DOM，而得到更新后的老节点
            patchvNode(oldStartVnode, newStartVnode)
            // 直接新虚拟节点指向更新后的老节点（因为只是数据，有数据就行）
            if (newStartVnode) newStartVnode.elm = oldStartVnode?.elm
            oldStartVnode = oldCh[++oldStartIdx]
            newStartVnode = newCh[++newStartIdx]

            // 第二种， 旧后 比 新后
        } else if (isSameVnode(oldEndVnode, newEndVnode)){
            console.log('2')
            // 这里进去会执行老节点的文本赋值，目的是不生成DOM，而得到更新后的老节点
            patchvNode(oldEndVnode, newEndVnode)
            // 直接新虚拟节点指向更新后的老节点（因为只是数据，有数据就行）
            if (newEndVnode) newEndVnode.elm = oldEndVnode?.elm
            oldEndVnode = oldCh[--oldEndIdx]
            newEndVnode = newCh[--newEndIdx]

            // 第三种， 旧前 与 新后
        } else if (isSameVnode(oldStartVnode, newEndVnode)){
            console.log('3')
            // 这里进去会执行老节点的文本赋值，目的是不生成DOM，而得到更新后的老节点
            patchvNode(oldStartVnode, newEndVnode)
            // 直接新虚拟节点指向更新后的老节点（因为只是数据，有数据就行）
            if (newEndVnode) newEndVnode.elm = oldStartVnode?.elm
            // 需要移动老节点的位置，只能操作DOM
            // 旧前节点移到旧后节点的后面

            parentDom.insertBefore(oldStartVnode.elm, oldEndVnode.elm.nextSibling)
            // 因为虽然parentDom改变了，但虚拟节点未改变，这还是可以加
            oldStartVnode = oldCh[++oldStartIdx];
			newEndVnode = newCh[--newEndIdx];

            // 第四种， 旧后与新前
        }   else if (isSameVnode(oldEndVnode, newStartVnode)){
            console.log('4')
            // 这里进去会执行老节点的文本赋值，目的是不生成DOM，而得到更新后的老节点
            patchvNode(oldEndVnode, newStartVnode)
            // 直接新虚拟节点指向更新后的老节点（因为只是数据，有数据就行）
            if (newStartVnode) newStartVnode.elm = oldEndVnode?.elm
            // 需要移动老节点的位置，只能操作DOM
            // 旧后的节点移到旧前节点的前面
            parentDom.insertBefore(oldEndVnode.elm, oldStartVnode.elm)
			oldEndVnode = oldCh[--oldEndIdx];
			newStartVnode = newCh[++newStartIdx];

            // 第五种，以上都不满足， ==》 查找
        } else {
            console.log('5')
            // 把旧虚拟节点的key与index存起来
            const keyMap = {}   
            for(let i = oldStartIdx; i < oldEndIdx; i++){
                console.log(oldCh[i], "??")
                let key = oldCh[i]?.key
                keyMap[key] = i
            }
            console.log(keyMap)
            // 在keyMap 里面找是否有新虚拟节点需要的节点
            let idxInOld = keyMap[newStartVnode.key]
            if (idxInOld) {
                // 如果有 则只需要换位到旧前的前面
                let elmMove = oldCh[idxInOld].elm;
                patchvNode( elmMove, newStartVnode )
                parentDom.insertBefore(elmMove, oldStartVnode.elm)
                // 换位之后 把用过的旧虚拟节点 值undefined
                oldCh[idxInOld] = undefined
            } else {
                // 如果没有 则创建节点 并插入在旧前的前面
                let vNode = createElement(newStartVnode)
                console.log('创建')
                parentDom.insertBefore(vNode, oldStartVnode.elm)
            }
            // 一轮后
            newStartVnode = newCh[++newStartIdx]
        }
    }
	//结束while 只有俩种情况 （新增和删除）
	//1. oldStartIdx > oldEndIdx
	//2. newStartIdx > newEndIdx
    if (oldStartIdx > oldEndIdx){
        // 旧的先结束  增加
        for (let i = newStartIdx; i <= newEndIdx; i++){
            let newNode = createElement(newCh[i])
            parentDom.insertBefore(newNode, oldCh[oldEndIdx].elm.nextSibling)
        }
    } else {
        // 新的先结束  删除
        for (let i = oldStartIdx; i <= oldEndIdx; i++){
            oldCh[i] && parentDom.removeChild(oldCh[i].elm)
        }
    }

}

// 判断虚拟节点是否为同一节点
function isSameVnode(v1, v2){
    return v1.key === v2.key
}
