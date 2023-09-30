// src/blog/blog.input.ts
import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class BlogInput {
  @Field()
  title: string;

  @Field()
  content: string;
}
