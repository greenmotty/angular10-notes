import {Pipe, PipeTransform} from '@angular/core';
import {AbstractControl, ValidationErrors} from '@angular/forms';

@Pipe({
    name: 'errorMessage'
})
export class ErrorMessagePipe implements PipeTransform {
    private getError(error: string, errors: ValidationErrors): string {
        const options = {
            required: 'This field is required',
            whitespace: 'This field is empty',
            max: `The maximum value allowed is ${errors[error].max}`,
            min: `The minimum value allowed is ${errors[error].min}`,
            minlength: `The minimum length of characters is ${errors[error].requiredLength}, actual length is ${errors[error].actualLength}`,
            maxlength: `The maximum length of characters is ${errors[error].requiredLength}, actual length is ${errors[error].actualLength}`,
        };

        if (!options.hasOwnProperty(error)) {
            return 'Unknown error';
        }

        return options[error];
    }

    transform(errors: ValidationErrors, ...args: unknown[]): unknown {
        if (errors && Object.keys(errors).length) {
            const error = Object.keys(errors)[0];
            return this.getError(error.toString(), errors);
        }
        return {};
    }
}
