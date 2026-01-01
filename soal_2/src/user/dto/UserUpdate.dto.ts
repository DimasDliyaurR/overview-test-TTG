import { IsUnique } from "@validation/isUnique/IsUnique"
import { IsEmail } from "class-validator"

export class UserUpdateDTO {
    @IsEmail()
    @IsUnique({ tableName: "users", column: "email" })
    email: string

    name: string
}