import { ProductModel } from 'src/app/models/product.model';
import { ProductAction, ProductActionsTypes } from 'src/app/store/actions/product.action';

export const initialState: Array<ProductModel> = [];

export function ProductReducer(
  state: Array<ProductModel> = initialState,
  action: ProductAction
) {

  const productIndex = state.findIndex(p => p.id === action.payload.id);
  // prevent error: cannot add property 0 object is not extensible
  const products = JSON.parse(JSON.stringify(state));

  switch (action.type) {
    case ProductActionsTypes.ADD_PRODUCT:
      if (productIndex >= 0) {
        products[productIndex].amount += 1;
        return products;
      }

      products.push({ ...action.payload, amount: 1 });

      return products;

    case ProductActionsTypes.REMOVE_PRODUCT:
      return state.filter(item => item.id !== action.payload);

    case ProductActionsTypes.UPDATE_AMOUNT_PRODUCT:
      if (action.payload.amount <= 0) {
        return state;
      }

      if (productIndex >= 0) {
        products[productIndex].amount = Number(action.payload.amount);
      }

      return products;

    default:
      return state;
  }
}