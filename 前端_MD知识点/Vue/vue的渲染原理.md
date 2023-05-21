# vue的渲染原理



## Vue的渲染原理主要分为三个阶段：模板编译、虚拟DOM生成、DOM渲染。

1. ## 模板编译

Vue在渲染过程中，会先将模板编译成渲染函数，即将模板解析成一个个的节点，并生成一个渲染函数。

1. ## 虚拟DOM生成

渲染函数执行后，会生成一个虚拟DOM树。虚拟DOM树是一个轻量级的JavaScript对象，用于描述真实DOM节点的结构，属性和事件等信息。

1. ## DOM渲染

最后一步是将虚拟DOM树转换成真实的DOM树，并将其渲染到浏览器中。在此过程中，Vue会通过比对新旧虚拟DOM树的差异来判断需要更新哪些DOM节点，然后只更新需要更新的节点，从而提高渲染效率。

总的来说，Vue的渲染原理就是将模板编译成渲染函数，然后通过执行渲染函数生成虚拟DOM树，最后将虚拟DOM树转换成真实的DOM树并渲染到浏览器中。同时，通过比对新旧虚拟DOM树的差异来提高渲染效率。

## 能细细讲解一下，并代码举例说明吗



当我们使用Vue.js来开发一个应用时，Vue.js会将我们的模板转换成渲染函数，然后使用渲染函数来生成虚拟DOM树，最终将虚拟DOM树转换成真实的DOM树并渲染到浏览器中。下面让我们结合代码来详细了解一下Vue.js的渲染原理。

假设我们有如下的Vue组件：

```html
<template>
  <div>
    <h1>{{ message }}</h1>
    <button @click="increment">{{ count }}</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      message: 'Hello, Vue!',
      count: 0
    }
  },
  methods: {
    increment() {
      this.count++
    }
  }
}
</script>
```

在渲染过程中，Vue.js会将上述模板编译成如下的渲染函数：

```javascript
function render(_ctx, _cache) {
  const { createElement: _c } = _ctx.$options._renderProxy
  return (_cache[0] || (_cache[0] = _c('div', { key: 0 }, [
    _c('h1', { key: 1 }, [_ctx._v(_ctx._s(_ctx.message))]),
    _ctx._v(' '),
    _c('button', {
      key: 2,
      on: { click: _cache[1] || (_cache[1] = (...args) => (_ctx.increment && _ctx.increment(...args))) }
    }, [_ctx._v(_ctx._s(_ctx.count))])
  ])))
}
```

可以看到，渲染函数接受两个参数：_ctx和_cache。_ctx是Vue实例的上下文，包含了Vue实例的各种属性和方法。_cache是一个缓存对象，用于缓存渲染结果，提高渲染效率。

渲染函数返回一个虚拟DOM树，可以通过调用该函数来生成虚拟DOM树：

```javascript
const vm = new Vue({
  render: render
})

const vNode = vm._render()
```

生成的虚拟DOM树如下：

```javascript
{
  tag: 'div',
  key: undefined,
  data: {},
  children: [
    {
      tag: 'h1',
      key: undefined,
      data: {},
      children: ['Hello, Vue!'],
      text: undefined,
      elm: undefined,
      ns: undefined,
      context: undefined,
      functionalContext: undefined
    },
    {
      tag: 'button',
      key: undefined,
      data: {
        on: {
          click: [Function: fn]
        }
      },
      children: [0],
      text: undefined,
      elm: undefined,
      ns: undefined,
      context: undefined,
      functionalContext: undefined
    }
  ],
  text: undefined,
  elm: undefined,
  ns:
```

接上文，因为字数限制，我分成了两部分回答。下面继续第二部分的讲解。

最后一步是将虚拟DOM树转换成真实的DOM树，并将其渲染到浏览器中。在此过程中，Vue会通过比对新旧虚拟DOM树的差异来判断需要更新哪些DOM节点，然后只更新需要更新的节点，从而提高渲染效率。

为了将虚拟DOM树转换成真实的DOM树，Vue使用了一个叫做patch的算法。patch算法会对比新旧虚拟DOM树的差异，并根据差异来更新真实的DOM树。

下面是一个简单的例子，说明patch算法是如何工作的：

假设我们有如下的虚拟DOM树：

```javascript
const oldVNode = {
  tag: 'div',
  key: '123',
  data: {},
  children: [
    {
      tag: 'h1',
      key: undefined,
      data: {},
      children: ['Hello, World!'],
      text: undefined,
      elm: undefined,
      ns: undefined,
      context: undefined,
      functionalContext: undefined
    }
  ],
  text: undefined,
  elm: undefined,
  ns: undefined,
  context: undefined,
  functionalContext: undefined
}

const newVNode = {
  tag: 'div',
  key: '123',
  data: {},
  children: [
    {
      tag: 'h1',
      key: undefined,
      data: {},
      children: ['Hello, Vue!'],
      text: undefined,
      elm: undefined,
      ns: undefined,
      context: undefined,
      functionalContext: undefined
    }
  ],
  text: undefined,
  elm: undefined,
  ns: undefined,
  context: undefined,
  functionalContext: undefined
}
```

旧的虚拟DOM树中的文本内容是'Hello, World!'，而新的虚拟DOM树中的文本内容是'Hello, Vue!'。我们可以通过调用patch函数来将旧的虚拟DOM树转换成新的虚拟DOM树：

```javascript
import { patch } from 'vue'

const container = document.getElementById('app')

const oldVNode = container.firstChild

const newVNode = /* 新的虚拟DOM树 */

patch(oldVNode, newVNode)
```

执行patch函数后，Vue会对比新旧虚拟DOM树的差异，并根据差异来更新真实的DOM树。在本例中，patch函数会找到旧的虚拟DOM树中的文本节点，将其更新成'Hello, Vue!'。这样就完成了一次DOM的更新。

总的来说，Vue的渲染原理就是将模板编译成渲染函数，然后通过执行渲染函数生成虚拟DOM树，最后将虚拟DOM树转换成真实的DOM树并渲染到浏览器中。同时，通过比对新旧虚拟DOM树的差异来提高渲染效率。

需要注意的是，Vue在渲染过程中，会对模板中的数据进行响应式处理，即将模板中的数据转换成响应式数据，并建立数据与虚拟DOM之间的关联关系。当数据发生变化时，Vue会自动重新渲染虚拟DOM树，并将差异应用到真实的DOM树中。

总的来说，Vue的渲染原理是Vue框架的核心，深入了解渲染原理有助于我们更好地理解Vue的工作原理，从而在开发中更加高效地使用Vue。