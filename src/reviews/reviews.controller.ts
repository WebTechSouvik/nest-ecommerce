import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, ParseUUIDPipe } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { JwtGuard } from 'src/common/guards/jwt-auth.guard';
import { CurrentUser } from 'src/common/decorator/current-user.decorator';
import { SuccessMessage } from 'src/common/decorator/success-message.decorator';

@Controller('products/:productId/reviews')
@UseGuards(JwtGuard)
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) { }

  @Post()
  @SuccessMessage('Review created successfully')
  create(
    @Param('productId', new ParseUUIDPipe({ version: '4' })) productId: string,
    @CurrentUser('id') userId: string,
    @Body() createReviewDto: CreateReviewDto
  ) {
    return this.reviewsService.create(createReviewDto, userId, productId);
  }

  @Get()
  findAll(@Param('productId', new ParseUUIDPipe({ version: '4' })) productId: string, @CurrentUser('id') userId: string) {
    return this.reviewsService.findAll(productId, userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reviewsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateReviewDto: UpdateReviewDto) {
    return this.reviewsService.update(+id, updateReviewDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reviewsService.remove(+id);
  }
}
