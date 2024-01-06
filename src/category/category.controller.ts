import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { Category } from './schemas/category.schema';
import { UpdateCategoryDto } from './dto/update.category.dto';
import { CreateCategoryDto } from './dto/create.category.dto';
import { Query as ExpressQuery } from 'express-serve-static-core';
import { AuthGuard } from '@nestjs/passport';

@Controller('categories')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Get()
  async getAllCategories(@Query() query: ExpressQuery): Promise<Category[]> {
    return this.categoryService.findAll(query);
  }

  @Post()
  @UseGuards(AuthGuard())
  async createCategory(@Body() category: CreateCategoryDto): Promise<Category> {
    return this.categoryService.create(category);
  }

  @Get(':id')
  async getCategory(@Param('id') id: string): Promise<Category> {
    return this.categoryService.findById(id);
  }

  @Put(':id')
  async updateCategory(
    @Param('id') id: string,
    @Body() category: UpdateCategoryDto,
  ): Promise<Category> {
    return this.categoryService.updateById(id, category);
  }

  @Delete(':id')
  async deleteCategory(@Param('id') id: string): Promise<{ message: string }> {
    const message = await this.categoryService.deleteById(id);
    return { message };
  }
}
