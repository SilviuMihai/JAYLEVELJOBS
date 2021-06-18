import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";


//Function for checking the password and confirmpassword if are equal
//Found in register,reset,change - password
export function matchValues(takeValue:string): ValidatorFn
{
    return (control: AbstractControl): ValidationErrors | null => {
        return control?.value === control?.parent?.controls[takeValue].value 
          ? null : {isMatching: true}
      }
}