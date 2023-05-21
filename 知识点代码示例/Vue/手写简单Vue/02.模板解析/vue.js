class Vue{
    constructor(options) {
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
                this.compile(item)
            } else {
                // 节点内容
                let txt = item.textContent
                // 正则匹配找出{{}}
                let reg = /{{(.*)}}/g

                item.textContent = txt.replace(reg, (searchVal, vmKey) => {
                    // vmkey 是去除{{}}留下str
                    let vmkey = vmKey.trim()
                    return this.$data[vmkey]
                })
            }
        })
    }
}