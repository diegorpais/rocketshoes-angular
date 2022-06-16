import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/store/reducers/index';
import { Observable } from 'rxjs';

import { ProductModel } from 'src/app/models/product.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  products$: Observable<Array<ProductModel>>;
  totalItens = 0;

  constructor(
    private router: Router,
    private store: Store<AppState>,
  ) {
    this.products$ = this.store.pipe(select('product'));
  }

  ngOnInit(): void {
    this.getTotalItens();
  }

  goTo(route: string) {
    this.router.navigate([route]);
  }

  getTotalItens() {
    this.products$.subscribe(
      res => {
        this.totalItens = res.length;
      },
    );
  }

}
