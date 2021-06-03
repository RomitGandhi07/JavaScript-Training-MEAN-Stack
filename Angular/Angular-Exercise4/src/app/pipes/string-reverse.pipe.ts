import { Pipe, PipeTransform } from '@angular/core';
/*
 * Reverse the String
 * Takes a string argument.
 * Usage:
 *   string | stringReverse
 * Example:
 *   {{ "sample string" | stringReverse }}
 *   O/P: gnirts elpmas
*/
@Pipe({name: 'stringReverse'})
export class stringReversePipe implements PipeTransform {
  transform(str: string): string {
    // Split string into char array then reverse them and then join them as a string
    return str.split("").reverse().join("");
  }
}