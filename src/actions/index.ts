// Address
export { setUserAddress } from './address/set-user-address';
export { getUserAddress } from './address/get-user-address';
export { deleteUserAddress } from './address/delete-user-address';

// Auth
export { authenticate, login } from './auth/login';
export { logout } from './auth/logout';
export { registerUser } from './auth/register';

// Countries
export { getCountries } from './country/get-country';

// Orders
export { placeOrder } from './order/place-order';
export { getOrdersByUser } from './order/get-order-by-user';
export { getPaginatedOrders } from './order/get-paginated-orders';
export { getOrderById } from './order/get-order-by-id';

// Payments
export { paypalCheckPayment } from './payments/paypal-check-payment';
export { setTransactionId } from './payments/set-transaction-id';

// Products
export { getProductBySlug } from './products/get-product-by-slug';
export { deleteProductImage } from './products/delete-product-image';
export { getPaginatedProductsWithImages } from './products/product-pagination';
export { getStockBySlug } from './products/get-stock-by-slug';
export { createUpdateProduct } from './products/create-update-product';

// Users
export { getPaginatedUsers } from './users/get-paginated-user';
