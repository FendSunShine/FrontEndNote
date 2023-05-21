class Vue{
    constructor(options) {
        this.$options = options
        // 存入data中每个数据的改变事件，到时候data数据改变谁就调用谁
        this.$watchEvent = {}
        // 生命周期与el,data
        typeof options.beforeCreated == 'function' && options.beforeCreated.apply(this)
        this.$data = options.data
        // 数据代理
        this.proxyData()
        // data的数据改变监听
        this.dataObserve()
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
            }  
            // 1 是元素节点，3是文字节点
            else if (item.nodeType == 3){
                // 节点内容
                let txt = item.textContent
                // 正则匹配找出{{}}
                let reg = /{{(.*)}}/g
                item.textContent = txt.replace(reg, (_, vmKey) => {
                    // vmkey 是去除{{}}留下str
                    let vmkey = vmKey.trim()
                    // 把每次替换的key存起来，用于数据劫持
                    // 需要存该对象vm,该属性str, 节点, 用于操作
                    // 操作（改变该节点的textContent为vm的str属性的最新值）
                    // 这里可直接存一个类，到时候捕捉改变调用便是
                    // 当然也可以简单来，不用新建类，这里就新建一下好看
                    // --------------------------------------------
                    // 每次出现{{}}就新建一个类，用于之后改变调用
                    let watcher = new Watch(this, vmkey, item, 'textContent') //对象vm,属性str, 节点, 
                    // 如果data有这个属性才操作
                    if (this.$data.hasOwnProperty(vmkey)){
                        if (this.$watchEvent[vmkey]) {
                            this.$watchEvent[vmkey].push(watcher)
                        } else {
                            this.$watchEvent[vmkey] = []
                            this.$watchEvent[vmkey].push(watcher)
                        }
                    }
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
    // data的数据改变监听, 改变就改变DOM
    dataObserve(){
        for(let key in this.$data){
            let value = this.$data[key]
            Object.defineProperty(this.$data, key, {
                get(){
                    return value
                },
                set: (val) => {
                    value = val
                    // 操作DOM
                    this.$watchEvent[key].forEach((item) => {
                        item.update()
                    })
                }
            })
        }
    }
}

// 监听对象
class Watch{
    //对象,属性,节点, attr改变文本内容的字符串（textContent）
    constructor(vm, key, node, attr){
        this.vm = vm
        this.key = key
        this.node = node
        this.attr = attr
    }
    // 更新DOM
    update() {
        this.node[this.attr] = this.vm[this.key]
    }
}