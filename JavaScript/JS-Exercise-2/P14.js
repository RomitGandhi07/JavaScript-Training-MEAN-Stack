"use strict";
let a=[{id:2, name:"C", age:17},
    {id:1, name:"F", age:20},
    {id:7, name:"J", age:8},
    {id:3, name:"D", age:40},
    {id:6, name:"E", age:1},
    {id:9, name:"H", age:5},
    {id:4, name:"G", age:58},
    {id:10, name:"B", age:70},
    {id:8, name:"A", age:25},
    {id:5, name:"I", age:18},];

function sortByAge(ar){
    ar.sort((a,b)=>a.age-b.age);
    console.log(ar);
}

function decendingSortByName(ar){
    ar.sort((a,b)=>{
        if(a.name<b.name){return 1;}
        else if(a.name==b.name){return 0;}
        else{return -1;}
    });
    console.log(ar);
}
sortByAge(a);
decendingSortByName(a);