import { registerDecorator, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { parse, isValid } from 'date-fns';

@ValidatorConstraint({ async: false })
export class IsDateStringValidConstraint implements ValidatorConstraintInterface {
  validate(dateString: string): boolean {
    const parsedDate = parse(dateString, 'yyyy-MM-dd', new Date());
    return isValid(parsedDate);
  }

  defaultMessage(): string {
    return 'Date string is not valid';
  }
}

export function IsDateStringValid(validationOptions?: ValidationOptions) {
  return (object: Object, propertyName: string) => {
    registerDecorator({
      name: 'IsDateStringValid',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsDateStringValidConstraint,
    });
  };
}
