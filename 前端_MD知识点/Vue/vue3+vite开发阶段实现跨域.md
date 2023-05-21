## vue3+vite开发阶段实现跨域

1. 什么是跨域呢？
首先，明白什么是同源策略？同源就是指 协议、域名、端口 都要相同，其中任何一个不同都会出现跨域。例如：

http://www.xxx.com:8000
// http 是协议
// www.xxx.com 是域名
// 8000 是端口

跨域，是指浏览器不能执行其他网站的脚本。是由浏览器的同源策略造成的，是浏览器对JavaScript实施的安全限制，是浏览器的行为。

特别是前后端分离的模式下，由于前后端域名不一致，就会出现跨域问题。

2.访问接口控制台报错

3. vite+vue3如何解决
在本地想请求后端的 一个接口 “http://xxx/api/test”，proxy配置如下
vite.config.ts文件

  server: {
      port: 4000, // 设置服务启动端口号
      open: true, // 设置服务启动时是否自动打开浏览器
      cors: true, // 允许跨域

```js
  // 设置代理，根据我们项目实际情况配置
  proxy: {
    '/apiTest': { //apiTest是自行设置的请求前缀，按照这个来匹配请求，有这个字段的请求，就会进到代理来
      target: 'http://xxx/api',
      changeOrigin: true, //是否跨域
      rewrite: (path) => path.replace('/apiTest', '') 重写匹配的字段，如果不需要放在请求路径上，可以重写为""
    }
  }
```

xxx.vue 访问

 axios.post("/apiTest/api/test").then(res=>{})
配置后，重新启动运行项目，就可以正常访问接口了

需要注意的是：
在打包后，部署后tomcat下，还是会跨域，所以想要彻底解决问题，还是需要后端接口代码加上跨域的相关配置