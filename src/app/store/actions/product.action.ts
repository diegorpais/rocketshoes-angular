import { Action } from "@ngrx/store";
import { ProductModel } from 'src/app/models/product.model';

export enum ProductActionsTypes {
  ADD_PRODUCT = '[PRODUCT] Add',
  REMOVE_PRODUCT = '[PRODUCT] Add',
}

export class AddProductAction implements Action {
  readonly type = ProductActionsTypes.ADD_PRODUCT;

  constructor(public payload: ProductModel) { }
}

export class RemoveProductAction implements Action {
  readonly type = ProductActionsTypes.REMOVE_PRODUCT;

  constructor(public payload: number) { }
}

export type ProductAction = AddProductAction | RemoveProductAction;
