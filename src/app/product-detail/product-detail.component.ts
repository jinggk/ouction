import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product, ProductService, Comment } from '../shared/product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  private product: Product;
  private comments: Comment[];

  constructor(private routerInfo: ActivatedRoute,private productService: ProductService) { }

  ngOnInit() {
    const productId: number = this.routerInfo.snapshot.params['id'];
    this.product = this.productService.getProduct(productId);
    this.comments = this.productService.getCommentsForProductId(productId);
   // console.log(this.routerInfo.snapshot.params['prodTitle']);
  }

}
