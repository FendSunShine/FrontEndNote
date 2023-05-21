### 前端

vue create 项目名

npm init -y 初始化得到packjson管理版本

如果有，直接npm i

```
npm run server 启动
```

```javascript
// 如果要安装路由
// vue2 需安装 

npm i vue-router@3
```

```javascript
// 禁用全局提醒
  lintOnSave: false,
```

```javascript
// 配置
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

### 后端

#### 一、搭建后端目录

```
全局命令：npm install express-generator -g

进入项目目录：express --view=ejs server
npm start 启动
```

####  二、node — express 跨域

```javascript
router.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Methods', '*');
  res.header('Content-Type', 'application/json;charset=utf-8');
  next();
});
```
