export default function({sel, data, text, children, elm}){
    let key = data.key
    return {sel, data, text, children, elm, key}
}