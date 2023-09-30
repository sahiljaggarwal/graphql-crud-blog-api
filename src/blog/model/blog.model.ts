import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ObjectType, Field, ID } from '@nestjs/graphql';
import mongoose from 'mongoose';

@Schema()
@ObjectType()
export class Blog {
  // @Prop({})
  @Field((type) => ID)
  _id: mongoose.Types.ObjectId;

  @Prop({ required: true })
  @Field()
  title: string;

  @Prop({ required: true })
  @Field()
  content: string;
}

export const BlogSchema = SchemaFactory.createForClass(Blog);
