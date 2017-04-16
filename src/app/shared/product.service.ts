import { Injectable } from '@angular/core';

@Injectable()
export class ProductService {

  private products: Product[] = [
    new Product(1, "第一个商品", 1.99, 3.5, "这是第一个商品", ["电子商品1", "硬件设备"]),
    new Product(2, "第二个商品", 2.99, 2.5, "这是第二个商品", ["电子商品2", "硬件设备"]),
    new Product(3, "第三个商品", 3.99, 1.5, "这是第三个商品", ["电子商品3", "硬件设备"]),
    new Product(4, "第四个商品", 4.99, 4.5, "这是第四个商品", ["电子商品4", "硬件设备"]),
    new Product(5, "第五个商品", 5.99, 3, "这是第五个商品", ["电子商品5", "硬件设备"]),
    new Product(6, "第六个商品", 6.99, 4, "这是第六个商品", ["电子商品6", "硬件设备"]),
  ]

  private comments: Comment[] = [
    new Comment(1, 1, '2017-02-02 22:22:22', '张三', 3, '东西不错1'),
    new Comment(2, 1, '2017-03-02 22:22:22', '李四', 4, '东西不错11'),
    new Comment(3, 1, '2017-04-02 22:22:22', '王五', 2, '东西不错222'),
    new Comment(4, 2, '2017-05-02 22:22:22', '赵六', 5, '东西不错33333'),
    new Comment(5, 3, '2017-06-02 22:22:22', '李三', 1, '东西不错4444444'),
    new Comment(6, 5, '2017-07-02 22:22:22', '王思聪', 3, '东西不错55555555'),
  ]
  constructor() { }

  getAllCategories(): string[] {
    return ['电子商品1', '电子商品2', '电子商品3', '电子商品4', '电子商品5', '电子商品6'];
  }
  getProducts(): Product[] {
    return this.products;
  }

  getProduct(id: number): Product {
    return this.products.find((product) => product.id == id);
  }

  getCommentsForProductId(id: number): Comment[] {
    return this.comments.filter((comment: Comment) => comment.productId == id);
  }
}

export class Product {
  constructor(
    public id: number,
    public title: string,
    public price: number,
    public rating: number,
    public desc: string,
    public categories: Array<string>
  ) {
  }
}


export class Comment {
  constructor(
    public id: number,
    public productId: number,
    public timetamp: string,
    public user: string,
    public rating: number,
    public content: string
  ) { }
}
