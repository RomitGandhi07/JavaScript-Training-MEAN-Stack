"use strict";
let rows;
while(true){
    rows=+prompt("Enter number of rows:",5);
    if(isFinite(rows) && rows>0){
        break;
    }
}
for(let i=1;i<=rows;++i){
    let print="";
    for(let j=1;j<=rows;++j){
        if(j<=(rows-i)){print+=" ";}
        else{print+="* ";}
    }
    console.log(print);
}
