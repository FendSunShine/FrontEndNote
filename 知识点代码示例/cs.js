const list1 = [
  {a:1, b:2},
  {c:3, d:4},
  {e:5, f:6},
]
const list2 = [...list1]
// 由结果可看，扩展运算符只是第一次的深拷贝，第二层之后还是用的地址
// 毕竟原数据也都是用的地址
console.log(list1[1] === list2[1]);
console.log(list1 === list2);
console.log({a:1} === {a:1});