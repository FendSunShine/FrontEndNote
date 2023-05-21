const originalArray = Array.from({ length: 100000 }, (_, index) => index);
let clonedArray;

console.time('slice');
clonedArray = originalArray.slice();
console.timeEnd('slice');

console.time('concat');
clonedArray = originalArray.concat();
console.timeEnd('concat');

console.time('spread');
clonedArray = [...originalArray];
console.timeEnd('spread');

console.time('JSON');
clonedArray = JSON.parse(JSON.stringify(originalArray));
console.timeEnd('JSON');
