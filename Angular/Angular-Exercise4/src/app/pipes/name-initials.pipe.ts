import { Pipe, PipeTransform } from '@angular/core';
/*
 * Finds the Name Initials
 * Takes a name argument
 * Usage:
 *   name | nameInitials
 * Example:
 *   {{ "Romit Gandhi" | nameInitials }}
 *   O/P: RG
 
 *   
 *   {{ "Romit               Gandhi" | nameInitials }}
 *   O/P: RG
 *   Here, handled the space as well (In normal case these would o/p Rundefinedundefined......G)
*/   
@Pipe({name: 'nameInitials'})
export class nameInitialsPipe implements PipeTransform {
  transform(name: string): string {
    // Split the name by space
    const names=name.split(' ');

    // Define Initials as empty string
    let initials='';

    // Looping over all names array (here names means first,last,middle etc.)
    names.forEach(name=>{
      // If first character is not space (means truthy value then add character to initials)
      if(name[0]){
        initials+=name[0];
      }
    });

    // Return
    return initials;
  }
}