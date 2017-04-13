import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import 'rxjs/Rx';
import { Product, ProductService } from '../shared/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  private products: Array<Product>;
  private keyWord: string;
  private titleFilter: FormControl =new FormControl();
  constructor(private productService: ProductService) {
    this.titleFilter.valueChanges
    .debounceTime(500)
    .subscribe(
      value => this.keyWord = value
    );
   }

  ngOnInit() {
    this.products = this.productService.getProducts();
  }

}

