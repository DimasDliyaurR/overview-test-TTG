import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type UserDocument = User & Document;

@Schema()
export class User {
    @Prop({ unique: true })
    email: string

    @Prop({ required: true })
    name: string
}

export const UserSchema = SchemaFactory.createForClass(User)