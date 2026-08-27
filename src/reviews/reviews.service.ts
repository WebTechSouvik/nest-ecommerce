import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Review } from './entities/review.entity';
import { Repository } from 'typeorm/browser/repository/Repository.js';
import { ProductsService } from 'src/products/products.service';

@Injectable()
export class ReviewsService {
  constructor(@InjectRepository(Review) private reviewRepository: Repository<Review>, private readonly productsService: ProductsService) { }

  async create(createReviewDto: CreateReviewDto, userId: string, productId: string) {
    const product = await this.productsService.findOne(productId)
    if (!product) throw new NotFoundException('Product is not found with this given id')

    const review = this.reviewRepository.create({
      rating: createReviewDto.rating,
      description: createReviewDto.description,
      product: { id: productId },
      user: { id: userId }

    })
    await this.reviewRepository.save(review)
    return review
  }

  async findAll(productId: string, userId: string) {
    const qb = this.reviewRepository.createQueryBuilder('reviews')

    const [reviews, count] = await qb.innerJoinAndSelect('reviews.user', 'user').where('reviews.product.id=:productId', { productId }).getManyAndCount()

    return {
      reviews,
      count
    }

  }

  findOne(id: number) {
    return `This action returns a #${id} review`;
  }

  update(id: number, updateReviewDto: UpdateReviewDto) {
    return `This action updates a #${id} review`;
  }

  remove(id: number) {
    return `This action removes a #${id} review`;
  }
}
