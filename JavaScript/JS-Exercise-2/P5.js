"use strict";
const a=[0,1,2,3],b=[3,4,5];
function find_union(a,b){
    let union=[];
    let temp=new Set();
    for(let i=0;i<a.length;++i){
        if(!temp.has(a[i])){
            union.push(a[i]);
            temp.add(a[i]);
        }
    }
    for(let i=0;i<b.length;++i){
        if(!temp.has(b[i])){
            union.push(b[i]);
            temp.add(b[i],1);
        }
    }
    return union;
}

function find_difference(a,b){
    let difference=[];
    let temp=new Map();
    for(let i=0;i<a.length;++i){
        if(!temp.has(a[i])){
            temp.set(a[i],1);
        }
    }
    for(let i=0;i<b.length;++i){
        if(temp.has(b[i])){
            temp.delete(b[i]);
        }
    }

    for(let key of temp.keys()){
        difference.push(key);
    }
    return difference;
}

function find_intersection(a,b){
    let intersection=[];
    let temp=new Set();
    for(let i=0;i<a.length;++i){
        if(!temp.has(a[i])){
            temp.add(a[i]);
        }
    }
    for(let i=0;i<b.length;++i){
        if(temp.has(b[i])){
            intersection.push(b[i]);
            temp.delete(b[i]);
        }
    }
    return intersection;
}

console.log("Union: "+find_union(a,b));
console.log("A-B: "+find_difference(a,b));
console.log("B-A: "+find_difference(b,a));
console.log("Intersection: "+find_intersection(a,b));