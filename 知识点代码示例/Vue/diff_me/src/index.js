import h from './dom/h'
import patch from './dom/patch'
let container = document.querySelector('#container')
let vnode1 = h('div', {}, '新节点：lsypprh')

//虚拟节点
let vnode2 = h('ul',{},[
	h('li',{key:'a'},'a'),
	h('li',{key:'b'},'b'),
	h('li',{key:'c'},'c'),
]);

// let vnode3 = h('ul',{},[
// 	h('li',{key:'a'},'a'),
// 	h('li',{key:'b'},'b'),
// 	h('li',{key:'c'},'c'),
// 	h('li',{key:'d'},'d'),
// ]);
let vnode3 = h('ul',{},[
	

	h('li',{key:'a'},'a'),
	h('li',{key:'c'},'c'),
	h('li',{key:'d'},'d'),
	h('li',{key:'b'},'b'),


]);

// console.log('vnode1:' ,vnode1)
// console.log('vnode2:' ,vnode2)
patch(container, vnode2)
// patch
const btn = document.querySelector('button')
btn.onclick = function(){
    patch(vnode2, vnode3)
}