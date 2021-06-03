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
    for(let j=0;j<i;++j){
        print+="*";
    }
    console.log(print);
}

