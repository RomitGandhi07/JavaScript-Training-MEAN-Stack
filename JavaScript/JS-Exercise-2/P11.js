"use strict";
let string="This is a sample string";
const append_string=prompt("Please Enter String:","demo");
function appendString(append_string,n){
    --n;
    string=string.slice(0,n)+append_string+string.slice(n,string.length);
}
while(true){
    let n;
    n=prompt("Please Enter position",1);    
    if(isFinite(n) && n>=0 && n<=string.length){
        appendString(append_string,n);
        console.log(string);
        break;
    }
}