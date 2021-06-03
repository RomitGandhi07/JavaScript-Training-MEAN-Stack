"use strict";
let ans=[];
function even_dash(str){
    const l=str.length;
    ans.push(str[0]);
    for(let i=0;i<l-1;++i){
        //Checking two consecutive even no are there or not
        if(+str[i]%2==0 && +str[i+1]%2==0){
            ans.push("-");
        }
        ans.push(str[i+1]);
    }
    return ans.join("");
}
while(true){
    let n;
    n=prompt("Please Enter n","02544168");    
    if(isFinite(n) && n>0){
        alert(even_dash(n));
        break;
    }
}
