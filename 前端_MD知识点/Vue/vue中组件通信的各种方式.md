# vue中组件通信的各种方式



Vue中组件通信的方式有以下几种：

1. 父子组件通信：父组件通过props属性向子组件传递数据，子组件通过$emit方法向父组件传递事件。
2. 子父组件通信：子组件通过$emit方法向父组件传递事件，父组件通过$on方法监听事件。
3. 兄弟组件通信：可以通过共同的父组件来实现兄弟组件之间的通信。父组件可以通过props属性向两个子组件传递数据，并通过$emit方法监听子组件的事件。
4. 事件总线：可以通过创建一个空的Vue实例来实现跨组件的事件监听和触发。
5. Vuex：Vuex是一个专门为Vue.js开发的状态管理库，可以用来管理应用中的所有状态，并实现组件之间的通信。

U

爷孙呢



在 Vue 中，爷孙组件之间的通信可以通过在爷爷组件中使用 `provide` 方法向下传递数据，然后在孙子组件中使用 `inject` 方法来接收数据。

爷爷组件通过 `provide` 方法向下传递数据，例如：

```xml
<template>
  <div>
    <grandson :message="message"></grandson>
  </div>
</template>

<script>
import Grandson from './Grandson.vue';

export default {
  components: { Grandson },
  provide() {
    return {
      message: 'Hello from Grandpa!'
    }
  }
}
</script>
```

孙子组件通过 `inject` 方法接收数据，例如：

```handlebars
<template>
  <div>
    <h2>Message from Grandpa: {{ message }}</h2>
  </div>
</template>

<script>
export default {
  inject: ['message']
}
</script>
```

这样，爷爷组件中提供的数据 `message` 就可以在孙子组件中被访问和使用了。

U

孙爷呢



在 Vue 中，孙爷组件之间的通信可以通过在爷爷组件中使用 `provide` 方法向下传递数据，然后在孙子组件中使用 `inject` 方法来接收数据，再将数据通过 `emit` 方法向上传递给爷爷组件。

爷爷组件通过 `provide` 方法向下传递数据，例如：

```xml
<template>
  <div>
    <father>
      <grandson @message="handleMessage"></grandson>
    </father>
  </div>
</template>

<script>
import Father from './Father.vue';

export default {
  components: { Father },
  provide() {
    return {
      handleMessage: this.handleMessage
    }
  },
  methods: {
    handleMessage(message) {
      console.log(message);
    }
  }
}
</script>
```

孙子组件通过 `inject` 方法接收数据，并将数据通过 `emit` 方法向上传递给爷爷组件，例如：

```xml
<template>
  <div>
    <button @click="sendMessage">Send Message to Grandpa</button>
  </div>
</template>

<script>
export default {
  inject: ['handleMessage'],
  methods: {
    sendMessage() {
      this.handleMessage('Hello from Grandson!');
    }
  }
}
</script>
```

这样，孙子组件中的消息就可以通过 `handleMessage` 方法向上传递给爷爷组件，爷爷组件中的 `handleMessage` 方法就可以接收到来自孙子组件的消息并进行处理。

U

兄弟组件有哪些传递方式



在 Vue 中，兄弟组件之间的通信可以通过以下几种方式进行传递：

1. 通过共同的父组件传递数据：兄弟组件可以通过共同的父组件来传递数据，父组件通过 `props` 属性向两个子组件传递数据，并通过 `$emit` 方法监听子组件的事件。当其中一个子组件触发事件时，通过 `$emit` 方法向父组件发送事件，然后父组件将事件传递给另一个子组件。这种方式需要在父组件中进行数据传递，比较复杂，但是可以满足大多数情况下的需求。
2. 使用 EventBus：EventBus 是一种发布-订阅模式，可以用来在任何组件之间传递事件和数据。可以通过创建一个空的 Vue 实例来实现 EventBus，然后在需要传递数据的组件中通过 `$emit` 方法发送事件，再在需要接收数据的组件中通过 `$on` 方法监听事件来接收数据。
3. 使用 Vuex：Vuex 是一个专门为 Vue.js 开发的状态管理库，可以用来管理应用中的所有状态，并实现组件之间的通信。使用 Vuex 可以将所有的状态统一管理，使得组件之间的通信更加简单和可靠。

总的来说，第一种方式是最常见的方式，而 EventBus 和 Vuex 只在一些特殊的情况下使用。

U

第一条举例说明



好的，下面举一个通过共同的父组件传递数据的例子：

假设有两个兄弟组件，一个是 `BrotherA`，另一个是 `BrotherB`，它们的共同父组件是 `Parent`。现在需要在这两个组件之间传递数据，可以通过在 `Parent` 组件中定义一个数据对象，然后通过 `props` 属性将数据传递给 `BrotherA` 和 `BrotherB` 组件，如下所示：

```xml
<template>
  <div>
    <brother-a :data="data" @updateData="updateData"></brother-a>
    <brother-b :data="data" @updateData="updateData"></brother-b>
  </div>
</template>

<script>
import BrotherA from './BrotherA.vue';
import BrotherB from './BrotherB.vue';

export default {
  components: {
    BrotherA,
    BrotherB
  },
  data() {
    return {
      data: {}
    }
  },
  methods: {
    updateData(data) {
      this.data = data;
    }
  }
}
</script>
```

在 `Parent` 组件中定义了一个数据对象 `data`，然后将其通过 `props` 属性传递给 `BrotherA` 和 `BrotherB` 组件。此外，还定义了一个 `updateData` 方法，用来接收子组件的事件并更新数据。

在 `BrotherA` 和 `BrotherB` 组件中，可以通过 `$emit` 方法触发事件，将数据传递给父组件，如下所示：

```xml
<template>
  <div>
    <button @click="sendMessage">Send Message to BrotherB</button>
  </div>
</template>

<script>
export default {
  props: ['data'],
  methods: {
    sendMessage() {
      this.$emit('updateData', { message: 'Hello from BrotherA!' });
    }
  }
}
</script>
```

在 `BrotherA` 组件中，定义了一个 `sendMessage` 方法，用来触发 `updateData` 事件，并将数据 `{ message: 'Hello from BrotherA!' }` 传递给父组件。

在 `BrotherB` 组件中，同样可以通过 `$emit` 方法触发事件，将数据传递给父组件，如下所示：

```xml
<template>
  <div>
    <button @click="sendMessage">Send Message to BrotherA</button>
  </div>
</template>

<script>
export default {
  props: ['data'],
  methods: {
    sendMessage() {
      this.$emit('updateData', { message: 'Hello from BrotherB!' });
    }
  }
}
</script>
```

在 `BrotherB` 组件中，同样定义了一个 `sendMessage` 方法，用来触发 `updateData` 事件，并将数据 `{ message: 'Hello from BrotherB!' }` 传递给父组件。

这样，当任何一个兄弟

U

继续



组件触发 `updateData` 事件时，都会将数据传递给共同的父组件 `Parent`，然后 `Parent` 组件会调用 `updateData` 方法来更新数据，从而实现兄弟组件之间的数据传递。

U

$emit是什么意思



`$emit` 是 Vue.js 中的一个实例方法，用于在组件实例中触发自定义事件。通过 `$emit` 方法，可以向父组件发送一个自定义事件，并且可以携带一些数据作为参数，父组件可以通过监听这个事件来接收数据。

在一个组件中，可以通过以下方式来触发 `$emit` 方法：

```reasonml
this.$emit(eventName, [args])
```

其中，`eventName` 是自定义事件的名称，`args` 是可选参数，用于向父组件传递数据。当 `$emit` 方法被调用时，Vue.js 会向组件实例的父级传递一个事件，并将参数传递给父级。

在父组件中，可以通过 `v-on` 或 `@` 指令来监听子组件触发的事件，例如：

```xml
<template>
  <child-component @custom-event="handleCustomEvent"></child-component>
</template>

<script>
export default {
  methods: {
    handleCustomEvent(data) {
      // 处理从子组件传递过来的数据
    }
  }
}
</script>
```

在上面的代码中，通过 `@custom-event` 指令来监听子组件触发的 `custom-event` 事件，并将数据传递给 `handleCustomEvent` 方法来处理。当子组件调用 `$emit('custom-event', data)` 方法时，父组件就会触发 `handleCustomEvent` 方法，并将数据作为参数传递给它。