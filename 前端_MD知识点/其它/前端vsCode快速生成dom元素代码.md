# **前端vsCode快速生成dom元素代码**

##### 1、输入 #root ，按tab键或者Enter键

```bash
<div id="root"></div>
复制代码
```

##### 2、输入 span#root

```bash
<span id="root"></span>
复制代码
```

##### 3、输入 .item

```ini
<div class="item"></div>
复制代码
```

##### 4、输入 i.item

```ini
<i class="item"></i>
复制代码
```

##### 5、输入 p{文本}

```css
<p>内容</p>
复制代码
```

##### 5、输入 a[href=#]

```ini
<a href="#"></a>
复制代码
```

##### 6、table>.row>.col

```xml
<table>
  <tr class="row">
    <td class="col"></td>
  </tr>
</table>
复制代码
```

##### 7、div+p

```css
<div></div>
 <p></p>
复制代码
```

##### 8、div>p

```css
 <div>
   <p></p>
 </div>
复制代码
```

##### 9、ul>li*3

```css
<ul>
  <li></li>
  <li></li>
  <li></li>
</ul>
复制代码
```

##### 10、ul>li*3

```css
<ul>
  <li></li>
  <li></li>
  <li></li>
</ul>
复制代码
```

##### 11、ul>li*3>span

```css
<ul>
  <li><span></span></li>
  <li><span></span></li>
  <li><span></span></li>
</ul>
复制代码
```

##### 12、(.aaa>i)+(.bbb>h1*2>span)

```xml
<div class="aaa"><i></i></div>
<div class="bbb">
  <h1><span></span></h1>
  <h1><span></span></h1>
</div>
复制代码
```

##### 13、ul>li.item$*3

```xml
<ul>
    <li class="item1"></li>
    <li class="item2"></li>
    <li class="item3"></li>
</ul>
复制代码
```

##### 14、ul>li.item$@4*3

```xml
<ul>
  <li class="item4"></li>
  <li class="item5"></li>
  <li class="item6"></li>
</ul>
复制代码
```

##### 15、ul.content>li.box.box$*3{文本}

```ini
<ul class="content">
  <li class="box box1">文本</li>
  <li class="box box2">文本</li>
  <li class="box box3">文本</li>
</ul>
```