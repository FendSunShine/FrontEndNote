function recursionSum(arr, i=0){
    if (i == arr.length - 1) return arr[i]
    return arr[i] + recursionSum(arr, i + 1)
}
const sum = recursionSum([1,2,3,4,5,6,7,8,9,10,11])
console.log(sum);

// reduce
function reduceSum(arr){
    return arr.reduce((sum, curr) => sum + curr)
}
console.log(reduceSum([1,2,3,4,5,6,7,8,9,10,11]));
