import * as actionTypes from "../actions/actionTypes";

const initialState = {
  ingredients:null,
  totalPrice: 80,
  error:false,
};

const INGREDIENT_PRICE = {
  salad: 30,
  cheese: 40,
  onion: 20,
  tomato: 10,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] + 1,
        },
        totalPrice: state.totalPrice + INGREDIENT_PRICE[action.ingredientName],
      };
    case actionTypes.REMOVE_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] - 1,
        },
        totalPrice: state.totalPrice - INGREDIENT_PRICE[action.ingredientName],

      };
    default:
      return state;
  }
};

export default reducer;
