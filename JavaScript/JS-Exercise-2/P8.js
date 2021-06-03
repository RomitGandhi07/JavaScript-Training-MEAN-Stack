"use strict";
const date1 = new Date(prompt("Enter date 1:","07/01/2018"));
const date2 = new Date(prompt("Enter date 2:","05/03/2020"));

function diffDate(date1,date2){
    let diffDays=Math.abs(date2-date1)/(1000*60*60*24);
	let diffYear=0;
    let diffMonth=0;
    
	if(diffDays>=365){
		diffYear=Math.floor(diffDays/365);
		diffDays=diffDays%365;
	}
	if(diffDays>=30){
		diffMonth=Math.floor(diffDays/30);
		diffDays=diffDays%30;
	}
	console.log(diffYear+" years "+diffMonth+" months "+diffDays+" days");
}

diffDate(date1,date2);
