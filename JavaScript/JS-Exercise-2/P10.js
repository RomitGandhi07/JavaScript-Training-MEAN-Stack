"use strict";
const date1 = new Date(prompt("Enter date 1:","07/01/2018"));
const date2 = new Date(prompt("Enter date 2:","05/03/2020"));
let diffMinutes,diffHrs,diffDays=[],diffWeeks,diffMonths,diffYear;

function calculateYearsMonthDays(diffDays){
    if(diffDays>=365){
		diffYear=Math.floor(diffDays/365);
		diffDays=diffDays%365;
	}
	if(diffDays>=30){
		diffMonths=Math.floor(diffDays/30);
		diffDays=diffDays%30;
	}
	console.log(diffYear+" years "+diffMonths+" months "+diffDays+" days");
}
function calculate(){
    const diffMS=Math.abs(date2-date1);

    //minutes
    diffMinutes=diffMS/60000;

    //hours
    diffHrs=diffMinutes/60;

    // Days
    diffDays.push(Math.ceil(diffHrs/24));
    
    calculateYearsMonthDays(diffDays[0]);

    //Weeks and Days
    diffWeeks=(diffDays[0]/7);
    diffDays.push(diffDays[0]%7)

    // Month and days
    diffMonths=(Math.ceil(diffDays[0]/30));
    diffDays.push(diffDays[0]%30);

    //Years, Months and Days
}
calculate();
console.log("or "+diffMonths+" Months "+diffDays.pop()+" Days");
console.log("or "+diffWeeks+" Weeks "+diffDays.pop()+" Days");
console.log("or "+diffDays.pop()+" Days");
console.log("or "+diffHrs+" Hours");
console.log("or "+diffMinutes+" minutes");