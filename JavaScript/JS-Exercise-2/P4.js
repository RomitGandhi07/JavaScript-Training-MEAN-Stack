"use strict";
const array=[0,1,2,3,4,5,6,7,8,9];
function generate_random_number(){
    return Math.floor(Math.random()*l);
}

function shuffle_array(){
    const l=array.length;
    for(let i=0;i<l;++i){
        let loc=generate_random_number();
        let temp=array[i];
        array[i]=array[loc];
        array[loc]=temp;
    }
}

shuffle_array();
console.log(array);