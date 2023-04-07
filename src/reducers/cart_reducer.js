// Import the necessary action types from an actions file
import { ADD_TO_CART, CLEAR_CART, COUNT_CART_TOTALS, REMOVE_CART_ITEM, TOGGLE_CART_ITEM_AMOUNT } from '../actions';

// Define the cart reducer function that takes the current state and an action object as arguments
const cart_reducer = (state, action) => {

  // If the action type is ADD_TO_CART, add the item to the cart
  if (action.type === ADD_TO_CART) {

    // Extract the necessary data from the payload
    const { id, color, amount, product } = action.payload;

    // Check if the item already exists in the cart based on its ID and color
    const tempItem = state.cart.find((i) => i.id === id + color);

    if (tempItem) { // If the item exists in the cart, update its amount

      // Update the amount of the item in the cart, but ensure that the new amount does not exceed the maximum stock available for the item
      const tempCart = state.cart.map((cartItem) => {
        if (cartItem.id === id + color) {
          let newAmount = cartItem.amount + amount;
          if(newAmount > cartItem.max) {
            newAmount = cartItem.max;
          }
          return { ...cartItem, amount: newAmount };
        } else {
          return cartItem;
        }
      });

      // Return a new state object with the updated cart
      return { ...state, cart: tempCart };

    } else { // If the item does not exist in the cart, add a new item to the cart with the necessary details

      const newItem = {
        id: id + color,
        name: product.name,
        color,
        amount,
        image: product.images[0].url,
        price: product.price,
        max: product.stock,
      };

      // Return a new state object with the updated cart
      return { ...state, cart: [...state.cart, newItem] }

    }

  }

  // If the action type is REMOVE_CART_ITEM, remove the item from the cart
  if (action.type === REMOVE_CART_ITEM) {

    // Filter out the item with the matching ID from the cart
    const tempCart = state.cart.filter((item) => item.id !== action.payload);

    // Return a new state object with the updated cart
    return { ...state, cart: tempCart };

  }

  // If the action type is CLEAR_CART, clear all items from the cart
  if (action.type === CLEAR_CART) {

    // Return a new state object with an empty cart
    return { ...state, cart: [] };

  }

  // If the action type is TOGGLE_CART_ITEM_AMOUNT, increase or decrease the amount of the item in the cart
  if (action.type === TOGGLE_CART_ITEM_AMOUNT) {

    // Extract the necessary data from the payload
    const { id, value } = action.payload;

        // Map over the cart array and update the item whose id matches the one in the payload
        const tempCart = state.cart.map((item) => {
            if (item.id === id) {
                // If the value in the payload is 'inc', increase the amount by 1
                if (value === 'inc') {
                    let newAmount = item.amount + 1;
                    // If the new amount is greater than the max stock of the item, set it to the max stock
                    if (newAmount > item.max) {
                        newAmount = item.max;
                    }
                    // Return a new object with the updated amount
                    return { ...item, amount: newAmount };
                }
                // If the value in the payload is 'dec', decrease the amount by 1
                if (value === 'dec') {
                    let newAmount = item.amount - 1;
                    // If the new amount is less than 1, set it to 1
                    if (newAmount < 1) {
                        newAmount = 1;
                    }
                    // Return a new object with the updated amount
                    return { ...item, amount: newAmount };
                }
            }
            // If the item's id doesn't match the one in the payload, return it unchanged
            return item;
        });
    
        // Return a new state object with the updated cart array
        return { ...state, cart: tempCart };
    }
    
    // If the action type is COUNT_CART_TOTALS, calculate the total items and total amount in the cart
    if (action.type === COUNT_CART_TOTALS) {
        const { total_items, total_amount } = state.cart.reduce (
            // Use the reduce method to calculate the total items and total amount in the cart
            (total, cartItem) => {
                const { amount, price } = cartItem;
    
                total.total_items += amount;
                total.total_amount += price * amount;
    
                return total;
            },
            // Set the initial values of total_items and total_amount to 0
            {
                total_items: 0,
                total_amount: 0,
            }
        );
    
        // Return a new state object with the updated total_items and total_amount values
        return { ...state, total_items, total_amount };
    }
    
    // If none of the above action types match the type in the action object, throw an error
    throw new Error(`No Matching "${action.type}" - action type`);
}

// Export the cart_reducer function as the default export of this module
export default cart_reducer;
