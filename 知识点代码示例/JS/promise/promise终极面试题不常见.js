
// promise状态变成fullied后，会把then里面的方法放入微队列
Promise.resolve().then(() => {
    console.log(0);

    // 根据v8源码，如果then里面放回promise的话
    // then的状态和返回的promise状态一样，并且返回的放入微队列
    // 注意是把 Promise.resolve(4).then(() => 完成p0)
    // 也就是说返回的是promise的话，需要调用返回promise的then方法在里面完成才会令本promise的状态改变
    return Promise.resolve(4)
}).then(res => {
    console.log(res);
})

Promise.resolve().then(() => {
    console.log(1);
}).then(() => {
    console.log(2)
}).then(() => {
    console.log(3);
}).then(() => {
    console.log(5)})