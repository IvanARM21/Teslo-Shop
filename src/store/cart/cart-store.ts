import { CartProduct } from "@/interfaces";
import { it } from "node:test";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface State {
    cart: CartProduct[];
    
    getTotalItems: () => number;
    getSummaryInformation: () => {
        subTotal: number;
        tax: number;
        total: number;
        itemsInCart: number;
    }
    // Methods from cart
    addProductToCart: (product: CartProduct) => void;
    updateProductQuantity: (product: CartProduct, quantity: number) => void;
    removeProduct: (product : CartProduct) => void;

    clearCart: () => void
}

export const useCartStore = create<State>()(
    persist(
        (set, get) => ({
            cart: [],

            getTotalItems: () => {
                const { cart } = get();
                return cart.reduce((acc, item) => acc + item.quantity, 0);
            },

            getSummaryInformation: () => {
                const { cart } = get();

                const subTotal = cart.reduce((subTotal, product) => (product.quantity * product.price) + subTotal, 0);

                const tax = subTotal * 0.15;
                const total = subTotal + tax;
                const itemsInCart = cart.reduce((total, item) => (total + item.quantity), 0);

                return { subTotal, tax, total, itemsInCart };
            },

            // Methods
            addProductToCart: (product: CartProduct) => {
                const { cart } = get();
    
                // 1. Review if the product exists in the cart with selected size
                const productInCart = cart.some(
                    (item) => item.id === product.id && item.size === product.size
                );

                if(!productInCart) {
                    set({cart: [...cart, product]});
                    return;
                }
    
                // 2. I know the product exists because of the size... I have increase
                const updatedCartProducts = cart.map((item) => {
                    if(item.id === product.id && item.size === product.size) {
                        return {...item, quantity: item.quantity + product.quantity}
                    }
    
                    return item;
                });

                set({cart: updatedCartProducts});
                
            },

            updateProductQuantity: (product: CartProduct, quantity: number) => {
                const { cart } = get();

                // 1. Find the product
                const cartUpdate = cart.map(item => {
                    if(item.id === product.id && item.size === product.size) {
                        return { ...product, quantity: quantity};
                    }
                    return item;
                });
                
                // Update State
                set({cart: cartUpdate});
            },

            removeProduct: (product : CartProduct) => {
                const { cart } = get();

                // Find the Product and Delete
                const cartUpdate = cart.filter(item => item.id !== product.id || item.size !== product.size);

                // Update State
                set({cart: cartUpdate});
            },
            
            clearCart: () => {
                set({cart: []});
            }
        })
        , {
            name: 'shopping-cart',
            // skipHydration: true,
        }
    )
)