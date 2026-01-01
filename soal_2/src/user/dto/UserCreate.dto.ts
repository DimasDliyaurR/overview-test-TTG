import { IsEmail, IsNotEmpty } from "class-validator"
import { IsUnique } from "@validation/isUnique/IsUnique"

export class UserCreateDTO {
    @IsEmail()
    @IsUnique({ tableName: "users", column: "email" })
    email: string

    @IsNotEmpty()
    name: string
}