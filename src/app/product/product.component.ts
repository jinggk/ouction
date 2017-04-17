import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import 'rxjs/Rx';
import { Product, ProductService } from '../shared/product.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  private products: Observable<Product[]>;
  constructor(private productService: ProductService) {
   }

  ngOnInit() {
    this.products = this.productService.getProducts();
    this.productService.serachEvent.subscribe(
      params => this.products = this.productService.search(params)
    );
  }

}

