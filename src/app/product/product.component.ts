import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  private products: Array<Product>;
  constructor() { }

  ngOnInit() {
    this.products = [
      new Product(1,"第一个商品",1.99,3.5,"这是第一个商品",["电子商品1","硬件设备"]),
      new Product(2,"第二个商品",2.99,2.5,"这是第二个商品",["电子商品2","硬件设备"]),
      new Product(3,"第三个商品",3.99,1.5,"这是第三个商品",["电子商品3","硬件设备"]),
      new Product(4,"第四个商品",4.99,4.5,"这是第四个商品",["电子商品4","硬件设备"]),
      new Product(5,"第五个商品",5.99,3,"这是第五个商品",["电子商品5","硬件设备"]),
      new Product(6,"第六个商品",6.99,4,"这是第六个商品",["电子商品6","硬件设备"]),
    ]
  }

}

export class Product {
  constructor(
    public id:number,
    public title:string,
    public price:number,
    public rating:number,
    public desc:string,
    public categories:Array<string>
  ){
  }
}