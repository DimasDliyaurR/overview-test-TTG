import { registerDecorator, ValidationOptions } from "class-validator"
import { IsUniqueConstraint } from "./IsUniqueConstraint"

export type IsUniqueInterface = {
    tableName: string,
    column: string
}

export function IsUnique(options: IsUniqueInterface, validationOption?: ValidationOptions) {
    return (object: Object, propertyName: string) => {
        registerDecorator({
            name: "IsUnique",
            target: object.constructor,
            propertyName: propertyName,
            constraints: [options],
            options: validationOption,
            validator: IsUniqueConstraint
        })
    }
}