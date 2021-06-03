"use strict";
const string=prompt("Please Enter String","RapidOpsSolution");
const n=prompt("Please Enter n",2);

function chopString(string,n){
    let count=1;
    let temp="";
    let ans=[];
    for(let char of string){
        if(count>n){
            ans.push(temp);
            temp="";
            count=1;
        }
        temp+=char;
        ++count;
    }
    ans.push(temp);
    return ans;
}

console.log(chopString(string,n));