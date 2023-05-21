import vnode from './vnode'
export default function(sel, data, params) {
    if (typeof params == 'string'){
        // 参数是字符，则text就为该参数，children为undefined
        return vnode({sel, data, text:params, children:undefined, elm:undefined})

    } else if (Array.isArray(params)){
        // 参数是数组，则children就为该参数，text就为undefined
        return vnode({sel, data, text:undefined, children:params, elm:undefined})


    }
}