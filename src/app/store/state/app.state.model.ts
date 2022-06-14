import { ProductModel } from 'src/app/models/product.model';

export interface AppState {
  readonly product: Array<ProductModel>,
};