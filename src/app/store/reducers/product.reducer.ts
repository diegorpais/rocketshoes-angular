import { ProductModel } from 'src/app/models/product.model';
import { ProductAction, ProductActionsTypes } from 'src/app/store/actions/product.action';

export const initialState: Array<ProductModel> = [];

export function ProductReducer(
  state: Array<ProductModel> = initialState,
  action: ProductAction
) {

  switch (action.type) {
    case ProductActionsTypes.ADD_PRODUCT:
      return [...state, action.payload];

    case ProductActionsTypes.REMOVE_PRODUCT:
      return state.filter(item => item.id !== action.payload);

    default:
      return state;
  }
}