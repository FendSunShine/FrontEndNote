<br/>

### MVVM模型

```
MVVM模型
    1. M：模型(Model) ：data中的数据
    2. V：视图(View) ：模板代码
    3. VM：视图模型(ViewModel)：Vue实例
观察发现：
    1.data中所有的属性，最后都出现在了vm身上。
    2.vm身上所有的属性 及 Vue原型上所有属性，在Vue模板中都可以直接使用。
```

### Vue中的数据代理

```
1.Vue中的数据代理：
    通过vm对象来代理data对象中属性的操作（读/写）
2.Vue中数据代理的好处：
    更加方便的操作data中的数据
3.基本原理：
    通过Object.defineProperty()把data对象中所有属性添加到vm上。
    为每一个添加到vm上的属性，都指定一个getter/setter。
    在getter/setter内部去操作（读/写）data中对应的属性。
```

### 键盘事件

```
1.Vue中常用的按键别名：
    回车 => enter
    删除 => delete (捕获“删除”和“退格”键)
    退出 => esc
    空格 => space
    换行 => tab (特殊，必须配合keydown去使用)
    上 => up
    下 => down
    左 => left
    右 => right

2.Vue未提供别名的按键，可以使用按键原始的key值去绑定，但注意要转为kebab-case（短横线命名）

3.系统修饰键（用法特殊）：ctrl、alt、shift、meta
    (1).配合keyup使用：按下修饰键的同时，再按下其他键，随后释放其他键，事件才被触发。
    (2).配合keydown使用：正常触发事件。

4.也可以使用keyCode去指定具体的按键（不推荐）

5.Vue.config.keyCodes.自定义键名 = 键码，可以去定制按键别名
```

### Vue中的事件修饰符

```
Vue中的事件修饰符：
  	1.prevent：阻止默认事件（常用）；
  	2.stop：阻止事件冒泡（常用）；
  	3.once：事件只触发一次（常用）；
  	4.capture：使用事件的捕获模式；
  	5.self：只有event.target是当前操作的元素时才触发事件；
  	6.passive：事件的默认行为立即执行，无需等待事件回调执行完毕；
```

### 计算属性

```
计算属性：
    1.定义：要用的属性不存在，要通过已有属性计算得来。
    2.原理：底层借助了Objcet.defineproperty方法提供的getter和setter。
    3.get函数什么时候执行？
          (1).初次读取时会执行一次。
          (2).当依赖的数据发生改变时会被再次调用。
    4.优势：与methods实现相比，内部有缓存机制（复用），效率更高，调试方便。
    5.备注：
          1.计算属性最终会出现在vm上，直接读取使用即可。
          2.如果计算属性要被修改，那必须写set函数去响应修改，且set中要引起计算时依赖的数据发生改变。
```

### computed和watch之间的区别

```

computed和watch之间的区别：
    1.computed能完成的功能，watch都可以完成。
    2.watch能完成的功能，computed不一定能完成，例如：watch可以进行异步操作。
两个重要的小原则：
    1.所被Vue管理的函数，最好写成普通函数，这样this的指向才是vm 或 组件实例对象。
    2.所有不被Vue所管理的函数（定时器的回调函数、ajax的回调函数等、Promise的回调函数），最好写成箭头函数，
      这样this的指向才是vm 或 组件实例对象。
```

### 绑定样式

```
绑定样式：
  1. class样式
    写法:class="xxx" xxx可以是字符串、对象、数组。
        字符串写法适用于：类名不确定，要动态获取。
        对象写法适用于：要绑定多个样式，个数不确定，名字也不确定。
        数组写法适用于：要绑定多个样式，个数确定，名字也确定，但不确定用不用。
  2. style样式
        :style="{fontSize: xxx}"其中xxx是动态值。
        :style="[a,b]"其中a、b是样式对象。
```

### 条件渲染

```
条件渲染：
    1.v-if
        写法：
            (1).v-if="表达式" 
            (2).v-else-if="表达式"
            (3).v-else="表达式"
        适用于：切换频率较低的场景。
        特点：不展示的DOM元素直接被移除。
        注意：v-if可以和:v-else-if、v-else一起使用，但要求结构不能被“打断”。

    2.v-show
        写法：v-show="表达式"
        适用于：切换频率较高的场景。
        特点：不展示的DOM元素未被移除，仅仅是使用样式隐藏掉
        
    3.备注：使用v-if的时，元素可能无法获取到，而使用v-show一定可以获取到。
```

### Vue监视数据的原理

```
  Vue监视数据的原理：
  1. vue会监视data中所有层次的数据。

  2. 如何监测对象中的数据？
      通过setter实现监视，且要在new Vue时就传入要监测的数据。
          (1).对象中后追加的属性，Vue默认不做响应式处理
          (2).如需给后添加的属性做响应式，请使用如下API：
              Vue.set(target，propertyName/index，value) 或 
              vm.$set(target，propertyName/index，value)

  3. 如何监测数组中的数据？
      通过包裹数组更新元素的方法实现，本质就是做了两件事：
          (1).调用原生对应的方法对数组进行更新。
          (2).重新解析模板，进而更新页面。

  4.在Vue修改数组中的某个元素一定要用如下方法：
      1.使用这些API:push()、pop()、shift()、unshift()、splice()、sort()、reverse()
      2.Vue.set() 或 vm.$set()

  特别注意：Vue.set() 和 vm.$set() 不能给vm 或 vm的根数据对象 添加属性！！！
```

### 收集表单数据

```
收集表单数据：
    若：<input type="text"/>，则v-model收集的是value值，用户输入的就是value值。
    若：<input type="radio"/>，则v-model收集的是value值，且要给标签配置value值。
    若：<input type="checkbox"/>
        1.没有配置input的value属性，那么收集的就是checked（勾选 or 未勾选，是布尔值）
        2.配置input的value属性:
            (1)v-model的初始值是非数组，那么收集的就是checked（勾选 or 未勾选，是布尔值）
            (2)v-model的初始值是数组，那么收集的的就是value组成的数组
    备注：v-model的三个修饰符：
            lazy：失去焦点再收集数据
            number：输入字符串转为有效的数字
            trim：输入首尾空格过滤
```

### 过滤器

```
过滤器：
    定义：对要显示的数据进行特定格式化后再显示（适用于一些简单逻辑的处理）。
    语法：
        1.注册过滤器：Vue.filter(name,callback) 或 new Vue{filters:{}}
        2.使用过滤器：{{ xxx | 过滤器名}}  或  v-bind:属性 = "xxx | 过滤器名"
    备注：
        1.过滤器也可以接收额外参数、多个过滤器也可以串联
        2.并没有改变原本的数据, 是产生新的对应的数据
```

### 自定义指令

```
需求1：定义一个v-big指令，和v-text功能类似，但会把绑定的数值放大10倍。
需求2：定义一个v-fbind指令，和v-bind功能类似，但可以让其所绑定的input元素默认获取焦点。
自定义指令总结：
  一、定义语法：
      (1).局部指令：
          new Vue({                                                            new Vue({
              directives:{指令名:配置对象}   或           directives{指令名:回调函数}
          })                                                                         })
      (2).全局指令：
          Vue.directive(指令名,配置对象) 或   Vue.directive(指令名,回调函数)
  
  二、配置对象中常用的3个回调：
      (1).bind：指令与元素成功绑定时调用。
      (2).inserted：指令所在元素被插入页面时调用。
      (3).update：指令所在模板结构被重新解析时调用。

  三、备注：
      1.指令定义时不加v-，但使用时要加v-；
      2.指令名如果是多个单词，要使用kebab-case命名方式，不要用camelCase命名。
```

### 生命周期

<br/>

```
生命周期：
    1.又名：生命周期回调函数、生命周期函数、生命周期钩子。
    2.是什么：Vue在关键时刻帮我们调用的一些特殊名称的函数。
    3.生命周期函数的名字不可更改，但函数的具体内容是程序员根据需求编写的。
    4.生命周期函数中的this指向是vm 或 组件实例对象。
    
常用的生命周期钩子：
		1.mounted: 发送ajax请求、启动定时器、绑定自定义事件、订阅消息等【初始化操作】。
		2.beforeDestroy: 清除定时器、解绑自定义事件、取消订阅消息等【收尾工作】。

关于销毁Vue实例
		1.销毁后借助Vue开发者工具看不到任何信息。
		2.销毁后自定义事件会失效，但原生DOM事件依然有效。
		3.一般不会在beforeDestroy操作数据，因为即便操作数据，也不会再触发更新流程了。
```

### 组件

#### 非单文件组件

<br/>

```
几个注意点：
    1.关于组件名:
        一个单词组成：
            第一种写法(首字母小写)：school
            第二种写法(首字母大写)：School
        多个单词组成：
            第一种写法(kebab-case命名)：my-school
            第二种写法(CamelCase命名)：MySchool (需要Vue脚手架支持)
        备注：
            (1).组件名尽可能回避HTML中已有的元素名称，例如：h2、H2都不行。
            (2).可以使用name配置项指定组件在开发者工具中呈现的名字。

    2.关于组件标签:
          第一种写法：<school></school>
          第二种写法：<school/>
          备注：不用使用脚手架时，<school/>会导致后续组件不能渲染。

    3.一个简写方式：
          const school = Vue.extend(options) 可简写为：const school = options
```

<br/>

关于不同版本的Vue：

```
1.vue.js与vue.runtime.xxx.js的区别：
        (1).vue.js是完整版的Vue，包含：核心功能+模板解析器。
        (2).vue.runtime.xxx.js是运行版的Vue，只包含：核心功能；没有模板解析器。

2.因为vue.runtime.xxx.js没有模板解析器，所以不能使用template配置项，需要使用
    render函数接收到的createElement函数去指定具体内容。
```
