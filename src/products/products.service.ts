import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductQueryDto } from './dto/product-query.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsService {
  constructor(@InjectRepository(Product) private productRepository: Repository<Product>) { }
  create(createProductDto: CreateProductDto) {
    return 'This action adds a new product';
  }

  async findAll(query: ProductQueryDto) {
    const { limit, page, category, price } = query
    const qb = this.productRepository.createQueryBuilder('products')
    const condition: string[] = []
    const parameter: Record<string, unknown> = {}

    if (category?.length) {
      condition.push('products.category IN (:...categories)')
      parameter.categories = category
    }

    if (price) {
      if (price.gte) {
        condition.push('products.price >= :priceGte')
        parameter.priceGte = price.gte

      }
      if (price.lte) {
        condition.push('products.price <= :priceLte')
        parameter.priceLte = price.lte

      }
    }
    qb.skip(limit * (page - 1))
    qb.take(limit)

    const [products, count] = await qb.where(condition.join(' AND '), parameter).getManyAndCount()
    return {
      products,
      count
    }

  }

  async findOne(id: string) {
    const product = await this.productRepository.findOne({
      where: { id }, relations: {
        reviews: true
      }
    })
    if (!product) throw new NotFoundException('Product is not found with this given id')
    return product
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
