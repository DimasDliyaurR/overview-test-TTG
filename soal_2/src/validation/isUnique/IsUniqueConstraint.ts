import { Injectable } from "@nestjs/common";
import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator"
import { IsUniqueInterface } from "./IsUnique";
import { InjectConnection } from "@nestjs/mongoose";
import { Connection } from "mongoose";

@ValidatorConstraint({ name: "IsUniqueConstraint", async: true })
@Injectable()
export class IsUniqueConstraint implements ValidatorConstraintInterface {
    constructor(@InjectConnection() private readonly connection: Connection) { }

    async validate(value: any, args?: ValidationArguments): Promise<boolean> {
        const { tableName, column }: IsUniqueInterface = args.constraints[0]

        const count = await this.connection
            .collection(tableName)
            .countDocuments({ [column]: value })

        return count === 0
    }

    defaultMessage(args?: ValidationArguments): string {
        const column = args.property
        return `${column} is already in use`
    }
}