// Importing action types
import { LOAD_PRODUCTS, SET_LISTVIEW, SET_GRIDVIEW, UPDATE_SORT, SORT_PRODUCTS, UPDATE_FILTERS, FILTER_PRODUCTS, CLEAR_FILTERS } from '../actions';

// Reducer function for the filters
const filter_reducer = (state, action) => {
  // If action is LOAD_PRODUCTS
  if (action.type === LOAD_PRODUCTS) {
    // Get the maximum price from all products
    let maxPrice = action.payload.map((p) => p.price);
    maxPrice = Math.max(...maxPrice);

    // Return a new state object with all products, filtered products, and filters updated
    return {
      ...state,
      all_products: [...action.payload],
      filtered_products: [...action.payload],
      filters: { ...state.filters, max_price: maxPrice, price: maxPrice },
    };
  }

  // If action is SET_GRIDVIEW
  if (action.type === SET_GRIDVIEW) {
    // Return a new state object with grid_view set to true
    return { ...state, grid_view: true };
  }

  // If action is SET_LISTVIEW
  if (action.type === SET_LISTVIEW) {
    // Return a new state object with grid_view set to false
    return { ...state, grid_view: false };
  }

  // If action is UPDATE_SORT
  if (action.type === UPDATE_SORT) {
    // Return a new state object with sort updated
    return { ...state, sort: action.payload };
  }

  // If action is SORT_PRODUCTS
  if (action.type === SORT_PRODUCTS) {
    // Get the current sort and filtered products from the state
    const { sort, filtered_products } = state;
    let tempProducts = [...filtered_products];

    // Sort the products based on the sort type
    if (sort === 'price-lowest') {
      tempProducts = tempProducts.sort((a, b) => a.price - b.price);
    }
    if (sort === 'price-highest') {
      tempProducts = tempProducts.sort((a, b) => b.price - a.price);
    }
    if (sort === 'name-a') {
      tempProducts = tempProducts.sort((a, b) => {
        return a.name.localeCompare(b.name);
      });
    }
    if (sort === 'name-z') {
      tempProducts = tempProducts.sort((a, b) => {
        return b.name.localeCompare(a.name);
      });
    }

    // Return a new state object with filtered_products updated
    return { ...state, filtered_products: tempProducts };
  }

  // If action is UPDATE_FILTERS
  if (action.type === UPDATE_FILTERS) {
    // Get the filter name and value from the payload
    const { name, value } = action.payload;
    
    // Return a new state object with filters updated
    return { ...state, filters: { ...state.filters, [name]: value } };
  }

  // If action is FILTER_PRODUCTS
  if (action.type === FILTER_PRODUCTS) {
    // Get all products from the state
    const { all_products } = state;

    // Get the filter values from the state
    const { text, category, company, color, price, shipping } = state.filters;

    let tempProducts = [...all_products];

    // Filtering

    // Text
    if (text) {
      tempProducts = tempProducts.filter((product) => {
        return product.name.toLowerCase().startsWith(text);
      });
    }

    // Category
    // If a category other than "all" is selected in the dropdown, filter the products by category
    if (category !== 'all') {
    tempProducts = tempProducts.filter((product) => product.category === category);
    }
    
    // Company
    // If a company other than "all" is selected in the dropdown, filter the products by company
    if (company !== 'all') {
    tempProducts = tempProducts.filter((product) => product.company === company);
    }
    
    // Color
    // If a color other than "all" is selected in the dropdown, filter the products by color
    if (color !== 'all') {
    tempProducts = tempProducts.filter((product) => {
    return product.colors.find((c) => c === color);
    });
    }
    
    // Price
    // Filter the products by price, only showing products with a price less than or equal to the maximum price set in the filters
    tempProducts = tempProducts.filter((product) => product.price <= price);
    
    //Shipping
    // If the "free shipping" checkbox is checked, filter the products by whether or not they have free shipping
    if (shipping) {
    tempProducts = tempProducts.filter((product) => product.shipping === true);
    }
    
    // Return the filtered products
    return { ...state, filtered_products: tempProducts };

    // CLEAR_FILTERS
    // Reset all filters to their initial values
    if (action.type === CLEAR_FILTERS) {
    return {
    ...state,
    filters: {
    ...state.filters,
    text: '',
    company: 'all',
    category: 'all',
    color: 'all',
    price: state.filters.max_price,
    shipping: false,
    },
    };
    }
    
    // Throw an error if the action type does not match any of the above cases
    throw new Error(`No Matching "${action.type}" - action type`);
    }
}    
    // Export the filter_reducer function as the default export of this module
   export default filter_reducer;