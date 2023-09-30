// src/blog/blog.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Blog } from '../model/blog.model';
import { BlogInput } from '../input/blog.input';

@Injectable()
export class BlogService {
  constructor(@InjectModel('Blog') private readonly blogModel: Model<Blog>) {}

  async createBlog(blogData: Partial<Blog>): Promise<Blog> {
    console.log(blogData);
    const { title, content } = blogData;
    // const createdBlog = await new this.blogModel({
    //   title: title,
    //   content: content,
    // });
    const createdBlog = await this.blogModel.create({
      title: title,
      content: content,
    });

    console.log(createdBlog);
    // await createdBlog.save();
    return createdBlog;
  }

  async findAllBlogs(): Promise<Blog[]> {
    return this.blogModel.find().exec();
  }

  // Get Blog By Id
  async findBlogById(id: string): Promise<Blog | null> {
    return this.blogModel.findById(id).exec();
  }

  // Update Blog
  async updateBlog(id: string, updatedData: BlogInput): Promise<Blog> {
    const updatedBlog = await this.blogModel.findByIdAndUpdate(
      id,
      updatedData,
      { new: true },
    );
    if (!updatedBlog) {
      throw new NotFoundException('Blog not found');
    }
    return updatedBlog;
  }

  // delete Blog
  async deleteBlog(id: string): Promise<Blog> {
    const deleteBlog = await this.blogModel.findByIdAndRemove(id);
    if (!deleteBlog) {
      throw new NotFoundException('Blog not found');
    }
    return deleteBlog;
  }
}
