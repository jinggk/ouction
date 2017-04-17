import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ProductService } from '../shared/product.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  categories: string[];
  formModel: FormGroup;
  constructor(private fb: FormBuilder, private productService: ProductService) {
    this.formModel = fb.group({
      title: ['', Validators.minLength(3)],
      price: [null, this.positiveNumberValidator],
      category: ['-1']
    });
  }

  ngOnInit() {
    this.categories = this.productService.getAllCategories();
  }

  positiveNumberValidator(control: FormControl): any {
    if (!control.value) {
      return null;
    }
    const price = parseFloat(control.value);
    if (price > 0) {
      return null;
    } else {
      return { positiveNumber: true };
    }
  }

  onSearch() {
    if(this.formModel.valid){
      console.log(this.formModel.value);
      this.productService.serachEvent.emit(this.formModel.value);
    }
  }
}
