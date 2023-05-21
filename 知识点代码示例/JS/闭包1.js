var demo;
function a(){
    let aaa = 1
    demo = function b(){
        aaa++
        console.log(aaa);
    }
}
a()
demo()
demo()
demo()
