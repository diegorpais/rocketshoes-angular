import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/store/reducers/index';
import { Observable } from 'rxjs';
import { RemoveProductAction, UpdateAmountProductAction } from 'src/app/store/actions/product.action';

import { ProductModel } from 'src/app/models/product.model';
import { formatPrice } from 'src/app/util/util';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  products$: Observable<Array<ProductModel>>;
  cartProductList: Array<ProductModel> = [];
  total = '';

  constructor(
    private store: Store<AppState>,
  ) {
    this.products$ = this.store.pipe(select('product'));
  }

  ngOnInit(): void {
    this.getSubTotal();
  }

  getSubTotal() {
    this.products$.subscribe(
      res => {
        this.cartProductList = res.map(product => ({
          ...product,
          subtotal: formatPrice(product.price * product.amount),
        }));

        this.getTotal();
      },
    );
  }

  getTotal() {
    this.total = formatPrice(this.cartProductList.reduce((total: any, product: ProductModel) => {
      return total + product.price * product.amount;
    }, 0));
  }

  removeFromCart(productId: number) {
    this.store.dispatch(new RemoveProductAction(productId));
  }

  increment(product: ProductModel) {
    const p = { ...product };
    p.amount += 1;
    this.store.dispatch(new UpdateAmountProductAction(p));
  }

  decrement(product: ProductModel) {
    const p = { ...product };
    if (p.amount > 1) {
      p.amount -= 1;
      this.store.dispatch(new UpdateAmountProductAction(p));
    }
  }


}
