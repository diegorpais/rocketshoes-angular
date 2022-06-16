import { Component, OnInit } from '@angular/core';

import { AddProductAction } from 'src/app/store/actions/product.action';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/store/reducers/index';
import { Observable } from 'rxjs';

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

  cartProducts$: Observable<Array<ProductModel>>;
  cartProducts: ProductModel[] = [];

  constructor(
    private productsService: ProductsService,
    private store: Store<AppState>,
  ) {
    this.cartProducts$ = this.store.pipe(select('product'));
    this.cartProducts$.subscribe(
      res => {
        this.cartProducts = res;
      },
    );
  }

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

  getTotalItem(producId: number) {
    const product = this.cartProducts.filter(p => p.id === producId);
    if (product.length > 0) {
      return product[0].amount;
    }
    return 0;
  }

}
