"use strict";
const removeTags=(string)=>{
    return string.replace(/<[^>]*>/g, "");
};

const string=prompt("Please Enter html/xml","<p><strong><em>Javascriptâ€‹ Exercises</em></strong></p>");
alert(removeTags(string));
