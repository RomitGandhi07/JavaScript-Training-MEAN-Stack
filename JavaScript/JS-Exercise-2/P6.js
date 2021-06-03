"use strict";
const array=[ "a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];

function num_string_range(start,end,n){
    let ans=[];
    const t1=array.indexOf(start);
    const t2=array.indexOf(end);
    for(let i=t1;i<=t2;i+=n){
        ans.push(array[i]);
    }
    console.log(ans);
}
while(true){
    let n;
    n=+prompt("Please Enter n",3);    
    if(isFinite(n) && n>0){
        num_string_range("a","z",n);
        break;
    }
}