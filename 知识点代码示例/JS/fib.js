function fib(num){
    if (num == 1) return 1
    if (num == 2) return 1
    if (num <= 0) return 0
    let curr; // 当前
    let pre2 = 1; // 前2项
    let pre1 = 1; // 前一项
    for(let i = 3; i <= num; i++){
        curr = pre1 + pre2
        pre2 = pre1
        pre1 = curr
    }
    return curr
}
for(let i = 1; i < 10; i++) {
    console.log(fib(i));
}