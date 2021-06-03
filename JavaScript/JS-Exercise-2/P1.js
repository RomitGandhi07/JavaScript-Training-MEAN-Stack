"use strict";
const array=[0,1,2,3,4,5,6,7,8,9];
const array_length=array.length;

function print_first_n_elements(n){
    return array.slice(0,n);
}
function print_last_n_elements(n){
    return array.slice(-n,array_length);
}

while(true){
    let n;
    n=+prompt("Please Enter n",3);    
    if(isFinite(n) && n<=array_length){
        alert("First "+n+" Elements:"+print_first_n_elements(n));
        alert("Last "+n+" Elements:"+print_last_n_elements(n));
        break;
    }
}

