# JavaScript实现页面跳转的八种方式

 

第一种方法：

<script>
    window.location.replace('http://www.cnblogs.com/chenyablog')
</script>
第二种方法：

<script>
    window.location = 'http://www.cnblogs.com/chenyablog'
</script>
第三种方法：

<script>
   document.location.href = 'http://www.cnblogs.com/chenyablog'
</script>
第四种方法：

history对象的go()方法

```
<a href='javascript:history.go(-1)' rel='返回上一步'>返回上一步</a>
```


history对象的back()方法

```
<a href='javascript:history.back()' rel='返回上一步'>返回上一步</a>
```


第五种方法：

<script>
    top.location = 'http://www.cnblogs.com/chenyablog'
</script>
第六种方法：

meta方式实现跳转(content = 3 单位是秒)

<meta http-equiv=refresh content=3;url="http://www.cnblogs.com/chenyablog">
第七种方法：

```
window.navigate('http://www.cnblogs.com/chenyablog')
```

第八种方法：

```
self.location = 'http://www.cnblogs.com/chenyablog'
```
