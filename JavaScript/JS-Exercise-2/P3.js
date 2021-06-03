"use strict";
const array=[0,1,1,2,3,4,5,5,5,6,7,7,8,9];
function find_most_frequent_items(){
    //Build frequency table means which element occurs how many times
    const freq_table=array.reduce((freq_table,cur)=>freq_table.set(cur,(freq_table.get(cur)??0)+1) ,new Map());
    
    //Find which element occurs the most
    let max=0,ans=0;
    for(let entry of freq_table){
       if(entry[1]>max){
           max=entry[1];
           ans=entry[0];
       }
    }
    return ans;
}

alert(find_most_frequent_items());