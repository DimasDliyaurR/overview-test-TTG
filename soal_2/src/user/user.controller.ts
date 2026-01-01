import { Controller, Get, Post, Header, HttpException, HttpStatus, Body, Put, Param, Delete } from '@nestjs/common';
import { UserService } from '@user/user.service';
import { User } from '@user/schema/user.schema';
import { UserCreateDTO } from '@user/dto/UserCreate.dto';
import { UserUpdateDTO } from '@user/dto/UserUpdate.dto';

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

    @Put("update/:id")
    @Header("Content-Type", "application/json")
    async updateUser(@Param("id") id: string, @Body() data: UserUpdateDTO): Promise<{ statusCode: HttpStatus, message: string } | User> {
        try {
            const update: User = await this.UserService.update(id, data)

            if (update) {
                return {
                    statusCode: HttpStatus.OK,
                    message: "User has been update"
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
