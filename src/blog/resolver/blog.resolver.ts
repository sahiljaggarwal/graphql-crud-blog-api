// src/blog/blog.resolver.ts
import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { BlogService } from '../service/blog.service';
import { Blog } from '../model/blog.model';
import { BlogInput } from '../input/blog.input'; // dto
import { NotFoundException } from '@nestjs/common';

// @Resolver('Blog')
@Resolver((of) => Blog)
export class BlogResolver {
  constructor(private readonly blogService: BlogService) {}

  // Find All Blogs
  @Query((returns) => [Blog])
  async blogs(): Promise<Blog[]> {
    const data = await this.blogService.findAllBlogs();
    console.log(data);
    return data;
  }

  // Create Blogs
  @Mutation((returns) => Blog)
  async createBlog(
    @Args('blogData', { type: () => BlogInput }) blogData: BlogInput,
  ): Promise<Blog> {
    return this.blogService.createBlog(blogData);
  }

  // Get All Blogs by Id
  @Query((returns) => Blog)
  async getBlogById(@Args('id') id: string): Promise<Blog> {
    const data = await this.blogService.findBlogById(id);
    console.log(data);
    return data;
  }

  // Update Blog
  @Mutation((returns) => Blog)
  async updateBlog(
    @Args('id', { type: () => ID }) id: string,
    @Args('updatedData', { type: () => BlogInput }) updatedData: BlogInput,
  ): Promise<Blog> {
    const data = this.blogService.updateBlog(id, updatedData);
    return data;
  }

  // Delete Blog
  @Mutation((returns) => Blog)
  async deleteBlog(@Args('id', { type: () => ID }) id: string): Promise<Blog> {
    const data = await this.blogService.deleteBlog(id);
    return data;
  }
}
