"use strict";
function thousand_separator(str){
    const l=str.length;
    let ans="",temp="";
    let count=l%3;
    if(count==1){count=2;}
    else if(count==2){count=1;}
    for(let i=0;i<l;++i){
        if(count==3){
            ans+=temp+",";
            count=0;
            temp="";
        }
        temp+=str[i];
        ++count;
    }
    ans+=temp;
    return ans;
}
while(true){
    let n;
    n=prompt("Please Enter n",1023165454197);    
    if(isFinite(n) && n>0){
        console.log(thousand_separator(n));  
        break;
    }
}