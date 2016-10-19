import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';
import { Location }                 from '@angular/common';

import { ProductService } from './product.service';
import { Product } from './product';

@Component({
  selector: 'my-product-detail',
  templateUrl: 'product-detail.component.html',
  styleUrls: [ 'product-detail.component.css' ],
  moduleId: module.id
})
export class ProductDetailComponent implements OnInit{ngOnInit(): void {
  this.route.params.forEach((params: Params) => {
    let id = +params['id'];
    this.productService.getProduct(id)
      .then(product => this.product = product);
  });
}
  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private location: Location

  ) {}
  @Input()
  product: Product;

  goBack(): void {
    this.location.back();


  }

}

