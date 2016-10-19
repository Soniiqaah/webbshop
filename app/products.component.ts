import { Component } from '@angular/core';
import { OnInit } from '@angular/core';

import {Router} from "@angular/router";
import {ProductService} from "./product.service";
import {Product} from "./product";

@Component({
  moduleId: module.id,
  selector: 'my-products',
  templateUrl: 'products.component.html',
  styleUrls: [ 'products.component.css' ],
})

export class ProductsComponent implements OnInit{


  constructor(private productService: ProductService, private router: Router) { }
  ngOnInit(): void {
    this.getProducts();
  }

  products: Product[];
  product: Product;
  selectedProduct: Product;

  onSelect(product: Product): void {
    this.selectedProduct = product;
  }

  getProducts(): void {
    this.productService.getProducts().then(products => this.products = products);
  }
  gotoDetail(): void{
    this.router.navigate(['/detail', this.selectedProduct.id]);
  }

}
