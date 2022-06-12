import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { ProductModel } from 'src/app/models/product.model';
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

}
