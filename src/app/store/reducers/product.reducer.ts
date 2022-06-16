import { ProductModel } from 'src/app/models/product.model';
import { ProductAction, ProductActionsTypes } from 'src/app/store/actions/product.action';

export const initialState: Array<ProductModel> = [];

export function ProductReducer(
  state: Array<ProductModel> = initialState,
  action: ProductAction
) {

  switch (action.type) {
    case ProductActionsTypes.ADD_PRODUCT:
      const productIndex = state.findIndex(p => p.id === action.payload.id);
      // prevent error: cannot add property 0 object is not extensible
      const products = JSON.parse(JSON.stringify(state));

      if (productIndex >= 0) {
        products[productIndex].amount += 1;
        return products;
      }

      products.push({ ...action.payload, amount: 1 });

      return products;

    case ProductActionsTypes.REMOVE_PRODUCT:
      return state.filter(item => item.id !== action.payload);

    default:
      return state;
  }
}