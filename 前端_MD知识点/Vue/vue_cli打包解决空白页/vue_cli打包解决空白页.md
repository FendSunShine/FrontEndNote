<br/>

```javascript
const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  // 禁用全局提醒
  lintOnSave: false,
  // 代理，前端跨域
  devServer: {
    proxy: 'http://localhost:3000'
  },
  // 打包路由位置, 解决本地网页获取
  publicPath: './' 
  // 
})
```

![截图](19f409a8046cc3404e970cb5a24089cd.png)

```javascript
const router = new VueRouter({
  mode: "histroy",
  routes,

});
```
