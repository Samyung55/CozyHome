import {
    SIDEBAR_OPEN,
    SIDEBAR_CLOSE,
    GET_PRODUCTS_BEGIN,
    GET_PRODUCTS_SUCCESS,
    GET_PRODUCTS_ERROR,
    GET_SINGLE_PRODUCT_BEGIN,
    GET_SINGLE_PRODUCT_SUCCESS,
    GET_SINGLE_PRODUCT_ERROR,
  } from '../actions'
  
  // This is the reducer function that takes the current state and an action and returns a new state
  const products_reducer = (state, action) => {
  
    // Check if the action type is `SIDEBAR_OPEN`
    if (action.type === SIDEBAR_OPEN) {
      // Return a new state object with `isSidebarOpen` set to `true`
      return {...state, isSidebarOpen: true}
    }
  
    // Check if the action type is `SIDEBAR_CLOSE`
    if (action.type === SIDEBAR_CLOSE) {
      // Return a new state object with `isSidebarOpen` set to `false`
      return {...state, isSidebarOpen: false}
    }
  
    // Check if the action type is `GET_PRODUCTS_BEGIN`
    if (action.type === GET_PRODUCTS_BEGIN) {
      // Return a new state object with `products_loading` set to `true`
      return {...state, products_loading: true}
    }
  
    // Check if the action type is `GET_PRODUCTS_SUCCESS`
    if (action.type === GET_PRODUCTS_SUCCESS) {
      // Filter the payload for products with `featured` property set to `true`
      const featured_products = action.payload.filter((product) => product.featured === true)
      // Return a new state object with `products_loading` set to `false`, `products` set to payload, and `featured_products` set to filtered products
      return {...state, products_loading: false, products: action.payload, featured_products} 
    }
  
    // Check if the action type is `GET_PRODUCTS_ERROR`
    if (action.type === GET_PRODUCTS_ERROR) {
      // Return a new state object with `products_loading` set to `false` and `products_error` set to `true`
      return {...state, products_loading: false, products_error: true}
    } 
  
    // Check if the action type is `GET_SINGLE_PRODUCT_BEGIN`
    if (action.type === GET_SINGLE_PRODUCT_BEGIN) {
      // Return a new state object with `single_product_loading` set to `true` and `single_product_error` set to `false`
      return {...state, single_product_loading: true, single_product_error: false}
    }
  
    // Check if the action type is `GET_SINGLE_PRODUCT_SUCCESS`
    if (action.type === GET_SINGLE_PRODUCT_SUCCESS) {
      // Return a new state object with `single_product_loading` and `single_product` set to the action payload
      return {...state, single_product_loading: false, single_product: action.payload}
    }
  
    // Check if the action type is `GET_SINGLE_PRODUCT_ERROR`
    if (action.type === GET_SINGLE_PRODUCT_ERROR) {
      // Return a new state object with `single_product_loading` set to `false` and `single_product_error` set to `true`
      return { ...state, single_product_loading: false, single_product_error: true }
    }
  
    // If none of the above conditions are met, throw an error indicating that there is no matching action type
    throw new Error(`No matching "${action.type}" - action type`)
  
  }
  
  // Export the `products_reducer` as the default export of the module
  export default products_reducer
  