const arr = [
3,3,3,4,5,5,6,
[1,2,3], 
[1,2,3], 
[3,2,1],
{a:1, b:2, c:3, d:4},
{a:1, b:2, c:3, d:5},
{a:1, b:2, d:4, c:3}
];
function uniqueArr(arr){
    const _isObj = (a) => typeof a === 'object' && a !== null
    const _isSame = (o1, o2) => {
        if (_isObj(o1) && _isObj(o2)){
            // 都是对象
            // 先判断key
            const o1key = Object.keys(o1)
            const o2key = Object.keys(o2)
            if (o1key.length != o2key.length){
                return false
            } else {
                // 循环所有key
                for(let k of o1key){
                    // 如果o1key有o2没有的
                    if (!o2key.includes(k)) return false
                    // 如果有就比较值
                    // ！！！这里的值可能是多层次所以需要递归比较
                    if (!_isSame(o1[k], o2[k])) return false
                }
            }
            return true
        } else {
            return o1 === o2
        }
        
    }
    const uniArr = [...arr]
    for (let i = 0; i < uniArr.length; i++) {
        for (let j = i+1; j < arr.length; j++){
            if (_isSame(uniArr[i], uniArr[j])){
                uniArr.splice(j, 1)
                j--
            }
        }
    }
    return uniArr
}
const uniArr = uniqueArr(arr)
console.log(uniArr);0