import { Pipe, PipeTransform } from '@angular/core';
/*
 * Format the date
 * Takes a date argument 
 * Usage:
 *   date | format
 * Example:
 *   {{ Fri Feb 19 2021 11:16:12 GMT+0530 (India Standard Time) | formatDate }}
 *   O/P: 19-02-2021
*/
@Pipe({name: 'formatDate'})
export class formatDatePipe implements PipeTransform {
  transform(date: Date): string {
    // This function is responsible for add the pading if value is less then 10
    function pad(data) { return (data < 10) ? '0' + data : data; }

    // return the string with the DD-MM-YYYY format
    const givenDate = new Date(date);
    return [pad(givenDate.getDate()), pad(givenDate.getMonth()+1), givenDate.getFullYear()].join('-');
  }
}