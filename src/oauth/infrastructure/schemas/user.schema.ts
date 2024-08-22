import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true })
  type: string;

  @Prop({ required: true })
  documentNumber: string;

  @Prop({ required: true })
  firstName: string;

  @Prop()
  secondName?: string;

  @Prop({ required: true })
  lastName: string;

  @Prop()
  secondLastName?: string;

  @Prop({ required: true })
  password: string;

  @Prop({
    required: true,
    unique: true,
  })
  customerKey: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
