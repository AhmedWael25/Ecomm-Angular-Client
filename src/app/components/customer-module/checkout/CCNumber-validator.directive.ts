import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function CCNumberValidator(ccNum:string):ValidatorFn{


    return (control:AbstractControl):ValidationErrors | null => {
        const ccNum = control.value;
        // return ccNum ? {num:}luhnAlgorithmCheck(ccNum);
        return null;
    
    }

}


    function luhnAlgorithmCheck(ccNum:string) {
        const arr = [0, 2, 4, 6, 8, 1, 3, 5, 7, 9];
        let len = ccNum.length;
        let bit = 1;
        let sum = 0;
        let val;
        
        while (len) {
          val = parseInt(ccNum.charAt(--len), 10);
          // tslint:disable-next-line:no-bitwise
          sum += (bit ^= 1) ? arr[val] : val;
        }
        return sum && sum % 10 === 0;
    }

