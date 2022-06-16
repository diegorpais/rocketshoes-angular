import { Action } from "@ngrx/store";

export enum ProductActionsTypes {
  ADD_PRODUCT = '[PRODUCT] Add',
  REMOVE_PRODUCT = '[PRODUCT] Remove',
  UPDATE_AMOUNT_PRODUCT = '[PRODUCT] Update amount',
}

export class AddProductAction implements Action {
  readonly type = ProductActionsTypes.ADD_PRODUCT;

  constructor(public payload: any) { }
}

export class RemoveProductAction implements Action {
  readonly type = ProductActionsTypes.REMOVE_PRODUCT;

  constructor(public payload: any) { }
}

export class UpdateAmountProductAction implements Action {
  readonly type = ProductActionsTypes.UPDATE_AMOUNT_PRODUCT;

  constructor(public payload: any) { }
}

export type ProductAction = AddProductAction | RemoveProductAction | UpdateAmountProductAction;
