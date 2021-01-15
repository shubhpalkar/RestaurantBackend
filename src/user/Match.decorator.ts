import { registerDecorator, ValidationArguments, ValidationOptions, ValidatorConstraintInterface,ValidatorConstraint } from "class-validator";

export function Match(Property: String, validationOptions?: ValidationOptions){
    return (Object: any, propertyName: string) => {
        registerDecorator({
            target: Object.Constructor, propertyName,
            options: validationOptions,
            constraints: [Property],
            validator: MatchConstraint,
        })
    }
}

@ValidatorConstraint ({name: 'Match'})
export class MatchConstraint implements ValidatorConstraintInterface{

    validate(value: any, args: ValidationArguments){
        const [relatePropertyName] = args.constraints;
        const relatedValue = (args.object as any) [relatePropertyName];
        return value === relatedValue;
    }
}