import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/reducers/index';
import { AddProductAction } from 'src/app/store/actions/product.action';

import { ProductModel } from 'src/app/models/product.model';
import { ProductsService } from 'src/app/services/products.service';
import { formatPrice } from 'src/app/util/util';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  products: ProductModel[] = [];

  constructor(
    private productsService: ProductsService,
    private store: Store<AppState>,
  ) { }

  ngOnInit(): void {
    this.getProductList();
  }

  getProductList() {
    this.productsService.getProductsList().subscribe({
      next: (res) => this.handleProduct(res),
      error: (error) => console.log(error),
    });
  }

  handleProduct(products: ProductModel[]) {
    const data = products.map(product => ({
      ...product,
      priceFormatted: formatPrice(product.price),
    }));

    this.products = data;
  }

  addProductToCart(product: ProductModel) {
    this.store.dispatch(new AddProductAction(product));
  }

}
