import { faker } from "@faker-js/faker";

export const products = Array.from({ length: 4 }).map(() => {
  return {
    id: faker.number.int({ min: 10000, max: 20000 }),
    name: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    price: faker.commerce.price(),
    code: faker.number.int({ min: 30000, max: 50000 }),
    images: Array.from({ length: 4 }).map(() => {
      return faker.image.url();
    }),
    stock: faker.number.int({ min: 8, max: 200 }),
    stock_franchisor: faker.number.int({ min: 20, max: 200 }),
    sales_avarege: faker.number.int({ min: 2, max: 100 }),
    date_preview: faker.date.future(),
  };
});
