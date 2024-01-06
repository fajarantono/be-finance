import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Category } from './schemas/category.schema';
import { Model } from 'mongoose';
import { Query } from 'express-serve-static-core';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name)
    private categoryModel: Model<Category>,
  ) {}

  async findAll(query: Query): Promise<Category[]> {
    const resPerPage = 2;
    const currentPage = Number(query.page) || 1;
    const skip = resPerPage * (currentPage - 1);
    const keyword = query.keyword
      ? {
          title: {
            $regex: query.keyword,
            $options: 'i',
          },
        }
      : {};

    const categories = await this.categoryModel
      .find({ ...keyword })
      .limit(resPerPage)
      .skip(skip);

    return categories;
  }

  async create(category: Category): Promise<Category> {
    const res = await this.categoryModel.create(category);

    return res;
  }

  async findById(id: string): Promise<Category> {
    const res = await this.categoryModel.findById(id);

    if (!res) {
      throw new NotFoundException('Category not found');
    }

    return res;
  }

  async updateById(id: string, category: Category): Promise<Category> {
    return await this.categoryModel.findByIdAndUpdate(id, category, {
      new: true,
      runValidators: true,
    });
  }

  async deleteById(id: string): Promise<string> {
    try {
      const del = await this.categoryModel.findByIdAndDelete(id).exec();

      if (!del) {
        throw new NotFoundException(`Category with ID ${id} not found`);
      }

      return 'Category deleted successfully';
    } catch (error) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }
  }
}
