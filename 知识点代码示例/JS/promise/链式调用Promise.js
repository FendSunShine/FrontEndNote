// then之后返回一个全新的promise


// 1后续任务没有进行处理的话，新任务与前任务一致，数据状态都一致
// const pr1 = new Promise((resolve, reject) => {
//     // reject('err')
//     resolve('success')
// })
// const pr2 = pr1.then().then().then(res => {
//     console.log(res);
//     return 1
// }).then(res => {
//     console.log(res);
// })
const pr1 = new Promise((resolve, reject) => {
    // reject('err')
    setTimeout(() => {
        resolve(1)
    }, 1000)
})
const pr2 = pr1.catch(() => 'err')
setTimeout(() => {
    console.log('pr1: ', pr1);
    console.log('pr2: ', pr2);
}, 2000)

// 2后续有处理的话，前任务挂起的话，后任务也挂起
// const pr1 = new Promise((resolve, reject) => {
//     // reject('err')
//     setTimeout(() => {
//         resolve('success')
//     }, 2000);
// })
// const pr2 = pr1.then(res => {
//     console.log('学习', res);
// })
// setTimeout(() => {
//     console.log(pr2);
// }, 1000);

// 3若后续执行了，后续处理的情况确定新任务的状态
// 3.1 后续处理执行无错，新任务为完成，且数据为后续处理的返回值

// const pr1 = new Promise((resolve, reject) => {
//     resolve()
// })
// // 后续处理
// const pr2 = pr1.then(() => {
//     console.log('学习');
//     return 123
// })
// // 新任务
// pr2.then(res => {
//     console.log('res:', res);
// })

// 3.2 后续执行错误，新任务为错误，数据为异常对象
// const pr1 = new Promise((resolve, reject) => {
//     resolve()
// })
// // 后续处理
// const pr2 = pr1.then(() => {
//     console.log('学习');
//     throw 'err'

// })
// // 新任务
// const pr3 = pr2.then(res => {
//     console.log('res:', res);
// }).catch(err => {
//     console.log('err:',err)
// })
// setTimeout(() => {
//     console.log(pr3);
// }, 1000)

// 3.3 后续任务返回是的promise,这新任务的状态与后续任务的状态一致
// 并且返回的promise放入微队列
// const pr1 = new Promise((resolve, reject) => {
//     resolve()
// })
// // 后续处理
// const pr2 = pr1.then(() => {
//     console.log('学习');
//     // 后续返回 
//     return new Promise((resolve, reject) => {
//         setTimeout(() => reject('新promise'), 1000)
//     })

// })
// pr2.catch(err => {})
// // 新任务
// setTimeout(() => {
//     console.log('pr2', pr2);
// }, 2000);