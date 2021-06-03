"use strict";
const unixTimestamp=prompt("Unix Timestamp","1607518718");
const date = new Date(unixTimestamp * 1000); 
const ans = date.toUTCString(); 
console.log(ans);