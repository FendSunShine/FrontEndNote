class Vue{
    constructor(options) {
        this.$options = options
        // 生命周期与el,data
        typeof options.beforeCreated == 'function' && options.beforeCreated.apply(this)
        this.$data = options.data
        // 数据代理
        this.proxyData()
        typeof options.created == 'function' && options.created.apply(this)
        typeof options.beforeMount == 'function' && options.beforeMount.apply(this)
        this.$el = document.querySelector(options.el)
        typeof options.mounted == 'function' && options.mounted.apply(this)
        // 解析
        this.compile(this.$el)
    }
    // 模板解析 更新{{str}}里面的数据
    compile(el){
        el.childNodes.forEach((item) => {
            // item.nodeType 1 是元素节点，3是文字
            if (item.nodeType == 1){
                // 先查看是否有事件
                if (item.hasAttribute('@click')) {
                    // 得到改事件的属性值也就是方法
                    let fn = item.getAttribute('@click').trim()
                    // 绑定事件
                    item.addEventListener('click', () => {
                        this.$options.methods[fn].bind(this)()
                    })
                }
                this.compile(item)
            } else {
                // 节点内容
                let txt = item.textContent
                // 正则匹配找出{{}}
                let reg = /{{(.*)}}/g

                item.textContent = txt.replace(reg, (_, vmKey) => {
                    // vmkey 是去除{{}}留下str
                    let vmkey = vmKey.trim()
                    return this.$data[vmkey]
                })
            }
        })
    }
    // 数据代理 外部访问data数据
    proxyData(){
        for (let key in this.$data){
            Object.defineProperty(this, key, {
                get(){
                    return this.$data[key]
                },
                set(value){
                    this.$data[key] = value
                }
            })
        }
    }
}