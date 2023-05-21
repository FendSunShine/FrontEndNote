const obj1 = {b:1 , c:2, d:3, e:4, f:5}
/* interface PropertyDescriptor {
    configurable?: boolean;
    enumerable?: boolean;
    value?: any;
    writable?: boolean;
    get?(): any;
    set?(v: any): void;
} */
Object.defineProperty(obj1, 'a', {
    value:123,
    writable:true,
    enumerable:true
} )
obj1.a = 222
// console.log(obj1.a);
// console.log(Object.keys(obj1));
// 得到属性描述符
const res = Object.getOwnPropertyDescriptor(obj1, 'a')
console.log(res);
const obj = { name: 'John', age: 30 };
const descriptor = Object.getOwnPropertyDescriptor(obj, 'name');
console.log(descriptor); // { value: 'John', writable: true, enumerable: true, configurable: true }
