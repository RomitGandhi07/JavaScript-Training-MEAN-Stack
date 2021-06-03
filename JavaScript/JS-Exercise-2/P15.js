"use strict";
let array=[  {name:  "Jack" , age : 23}, {name:  "Sam" , age : 12},  {name:  "Max" , age : 20} ];
function deleteEntry(){
    let pos=+prompt("Enter Delete position:",0);
    if(pos>=array.length){
        console.log("Position Not Valid");
        return;
    }
    else{
        array.splice(pos,1);
        console.log(array);
    }
}
function insertEntry(){
    let pos=+prompt("Enter insert position:",0);
    let name=prompt("Enter name:","Jhon");
    let age=+prompt("Enter age:",18);
    if(pos<array.length){
        array.splice(pos,0,{name, age});
    }
    else{
        array[pos]={name, age};
    }
    console.log(array);
}
outer:while(true){
    let op=prompt("Enter your optoin(delete or insert or exit):","delete");
    switch(op){
        case "delete":
            deleteEntry();
            break;
        case "insert":
            insertEntry();
            break;
        case "exit":
            break outer;
        default:
            alert("Invalid Choice");
    }
    
}