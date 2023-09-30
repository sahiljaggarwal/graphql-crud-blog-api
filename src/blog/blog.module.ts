import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Blog, BlogSchema } from './model/blog.model';
import { BlogService } from './service/blog.service';
import { BlogResolver } from './resolver/blog.resolver';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Blog.name, schema: BlogSchema }]),
  ],
  providers: [BlogService, BlogResolver],
  exports: [],
})
export class BlogModule {}
