import { Injectable } from '@nestjs/common';
import { User } from './schema/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { UserCreateDTO } from './dto/UserCreate.dto';
import { UserUpdateDTO } from './dto/UserUpdate.dto';

@Injectable()
export class UserService {

    constructor(@InjectModel(User.name) private UserModel) { }

    async getAll(): Promise<User[]> {
        return this.UserModel.find().exec()
    }

    async create(data: UserCreateDTO): Promise<User[]> {
        const create = this.UserModel.create(data);
        return create
    }

    async update(id: string, data: UserUpdateDTO): Promise<User> {
        return this.UserModel.findByIdAndUpdate({ _id: id }, data, { new: true }).exec()
    }

    async delete(id: string): Promise<User> {
        return this.UserModel.findByIdAndDelete({ _id: id }).exec()
    }
}
