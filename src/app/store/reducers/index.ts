import { ActionReducerMap } from '@ngrx/store';
import { ProductReducer } from "./product.reducer";
import { ProductModel } from 'src/app/models/product.model';

import { ProductAction } from './../actions/product.action';

export interface AppState {
  product: ProductModel[] | any,
}

export const appReducers: ActionReducerMap<AppState, any> = {
  product: ProductReducer
}