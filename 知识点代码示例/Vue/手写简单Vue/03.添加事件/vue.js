class Vue{
    constructor(options) {
        this.$options = options
        // 生命周期与el,data
        options.beforeCreated.apply(this)
        this.$data = options.data
        options.created.apply(this)
        options.beforeMount.apply(this)
        this.$el = document.querySelector(options.el)
        options.mounted.apply(this)
        // 解析
        this.compile(this.$el)
    }
    compile(el){
        el.childNodes.forEach((item, index, array) => {
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
}