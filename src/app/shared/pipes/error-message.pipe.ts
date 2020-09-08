import { Pipe, PipeTransform } from '@angular/core';
import {AbstractControl, FormControl} from '@angular/forms';

@Pipe({
    name: 'errorMessage',
    pure: false
})
export class ErrorMessagePipe implements PipeTransform {
  private getError(error: string, control: AbstractControl): string {
    if (!control.errors.hasOwnProperty(error)) {
      return 'Unknown error';
    }
    const errors = {
        required: 'This field is required',
        whitespace: 'This field is empty',
        max: `The maximum value allowed is ${control.errors[error].max}`,
        min: `The minimum value allowed is ${control.errors[error].min}`,
        minlength: `The minimum length of characters is ${control.errors[error].requiredLength}, actual length is ${control.errors[error].actualLength}`,
        maxlength: `The maximum length of characters is ${control.errors[error].requiredLength}, actual length is ${control.errors[error].actualLength}`,
    };
    return errors[error];
  }

  transform(control: AbstractControl, ...args: unknown[]): unknown {
    if (control && control.errors && Object.keys(control.errors).length) {
      const error = Object.keys(control.errors)[0];
      return this.getError(error, control);
    }
    return {};
  }
}
