import { Injectable, EventEmitter } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/Rx';

@Injectable()
export class ProductService {

  constructor(private http: Http) { }

  serachEvent: EventEmitter<ProductSearchParams> = new EventEmitter();

  getAllCategories(): string[] {
    return ['电子商品1', '电子商品2', '电子商品3', '电子商品4', '电子商品5', '电子商品6'];
  }
  getProducts(): Observable<Product[]> {
    return this.http.get('/api/products').map(res => res.json());
  }

  getProduct(id: number): Observable<Product> {
    return this.http.get('/api/product/' + id).map(res => res.json());
  }

  getCommentsForProductId(id: number): Observable<Comment[]> {
    return this.http.get('/api/comment/' + id).map(res => res.json());
  }

  search(params: ProductSearchParams): Observable<Product[]> {
    return this.http.get('/api/products', { search: this.encodeParams(params) }).map(res => res.json());
  }

  private encodeParams(params: ProductSearchParams) {

    return Object.keys(params)
      .filter(key => params[key])
      .reduce((sum: URLSearchParams, key: string) => {
        sum.append(key, params[key]);
        return sum;
      }, new URLSearchParams());
  }
}
export class ProductSearchParams {
  constructor(
    public title: string,
    public price: number,
    public category: string
  ) { }

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
