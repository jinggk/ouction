import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product, ProductService, Comment } from '../shared/product.service';
import 'rxjs/Rx';
import { WebSocketService } from '../shared/web-socket.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  private product: Product;
  private comments: Comment[];
  newRating: number = 5;
  newComment: string = '';
  isWatched: boolean = false;
  currentBid: number;

  subscription: Subscription;

  isCommentHidden: boolean = true;

  constructor(private routerInfo: ActivatedRoute, private productService: ProductService, private wsService: WebSocketService) { }

  ngOnInit() {
    const productId: number = this.routerInfo.snapshot.params['id'];
    this.productService.getProduct(productId).subscribe(data => {
      this.product = data;
      this.currentBid = data.price
    });
    this.productService.getCommentsForProductId(productId).subscribe(data => this.comments = data);
    // console.log(this.routerInfo.snapshot.params['prodTitle']);
  }

  addComment() {
    const comment = new Comment(0, this.product.id, new Date().toISOString(), 'someone', this.newRating, this.newComment);
    this.comments.unshift(comment);
    const sum = this.comments.reduce((sum, comment) => sum + comment.rating, 0);
    this.product.rating = sum / this.comments.length;
    this.newComment = null;
    this.newRating = 5;
    this.isCommentHidden = true;
  }

  watchProduct() {
    if (this.subscription) {
      this.subscription.unsubscribe();
      this.isWatched = false;
      this.subscription = null;
    } else {
      this.isWatched = true;
      this.subscription = this.wsService.createObservableSocket("ws://localhost:8085", this.product.id)
        .subscribe(
        products => {
          const product = products.find(p => p.productId === this.product.id);
          this.currentBid = product.bid;
        }
        );
    }
  }
}
