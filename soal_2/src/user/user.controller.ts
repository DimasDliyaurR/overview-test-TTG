import { Controller, Get, Post, Header, HttpException, HttpStatus, Body, Param, Delete } from '@nestjs/common';
import { UserService } from '@user/user.service';
import { User } from '@user/schema/user.schema';
import { UserCreateDTO } from '@user/dto/UserCreate.dto';

@Controller('user')
export class UserController {
    constructor(private UserService: UserService) { }

    @Get()
    async getUser(): Promise<{ statusCode: HttpStatus, message: string, data: User[] } | User[]> {
        try {
            const users: User[] = await this.UserService.getAll()

            if (users) {
                return {
                    statusCode: HttpStatus.OK,
                    message: "Get All User",
                    data: users
                }
            }
        } catch (err) {
            throw new HttpException({
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                error: "Internal Error"
            }, HttpStatus.INTERNAL_SERVER_ERROR, {
                cause: err
            })
        }
    }

    @Get("/:id")
    async getUserById(@Param("id") id: string): Promise<{ statusCode: HttpStatus, message: string, data: User[] } | User[]> {
        try {
            const user: User[] = await this.UserService.findById(id)

            if (user) {
                return {
                    statusCode: HttpStatus.OK,
                    message: "Get specific User",
                    data: user
                }
            }
        } catch (err) {
            throw new HttpException({
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                error: "Internal Error"
            }, HttpStatus.INTERNAL_SERVER_ERROR, {
                cause: err
            })
        }
    }

    @Post("/create")
    @Header("Content-Type", "application/json")
    async createUser(@Body() data: UserCreateDTO): Promise<{ statusCode: HttpStatus, message: string } | User[]> {
        try {
            const create = await this.UserService.create(data)

            if (create) {
                return {
                    statusCode: HttpStatus.OK,
                    message: "User has been create"
                }
            }
        } catch (err) {
            throw new HttpException({
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                error: "Internal Error"
            }, HttpStatus.INTERNAL_SERVER_ERROR, {
                cause: err
            })
        }
    }

    @Delete("/delete/:id")
    async deleteUser(@Param("id") id: string): Promise<{ statusCode: HttpStatus, message: string } | User> {
        try {
            const deleteUser = await this.UserService.delete(id)

            if (deleteUser) {
                return {
                    statusCode: HttpStatus.OK,
                    message: "User has been delete sucessfully"
                }
            }
        } catch (err) {
            throw new HttpException({
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                error: "Internal Error"
            }, HttpStatus.INTERNAL_SERVER_ERROR, {
                cause: err
            })
        }

    }
}
