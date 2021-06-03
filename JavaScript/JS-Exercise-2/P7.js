const date=prompt("Please Enter Date","01-07-2020");
function getMonth(date){
    const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    let month=+date.slice(3,5);
    return months[month-1];
}
console.log(getMonth(date));
