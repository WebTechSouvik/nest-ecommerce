import { MigrationInterface, QueryRunner } from "typeorm";

export class SeedProduct1787768215373 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
      INSERT INTO "product"
        ("id", "name", "description", "price", "category", "avgRating", "stock", "images")
      VALUES
        (
          gen_random_uuid(),
          'iPhone 15',
          'Apple iPhone 15 with A16 Bionic chip',
          69999,
          'Electronics',
          4.5,
          20,
          'iphone15-front.jpg,iphone15-back.jpg'
        ),
        (
          gen_random_uuid(),
          'Samsung Galaxy S24',
          'Samsung Galaxy S24 flagship smartphone',
          74999,
          'Electronics',
          4.6,
          15,
          's24-front.jpg,s24-back.jpg'
        ),
        (
          gen_random_uuid(),
          'Sony WH-1000XM5',
          'Wireless noise cancelling headphones',
          29999,
          'Audio',
          4.7,
          25,
          'sony-xm5-black.jpg,sony-xm5-side.jpg'
        ),
        (
          gen_random_uuid(),
          'Nike Air Max 270',
          'Comfortable running shoes with Air Max cushioning',
          12999,
          'Shoes',
          4.4,
          30,
          'airmax270-front.jpg,airmax270-side.jpg'
        ),
        (
          gen_random_uuid(),
          'Levi''s 511 Jeans',
          'Slim fit stretch denim jeans',
          3999,
          'Clothing',
          4.2,
          40,
          'levis-511-front.jpg,levis-511-back.jpg'
        );
    `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
