class Vue{
    constructor(options) {
        // console.log(options)
        options.beforeCreated.apply(this)
        this.$data = options.data
        options.created.apply(this)
        options.beforeMount.apply(this)
        this.$el = document.querySelector(options.el)
        options.mounted.apply(this)
        // options.beforeUpdate.apply(this)
        // options.update.apply(this)
        // options.beforeDestroy.apply(this)
        // options.destroyed.apply(this)
    }
}