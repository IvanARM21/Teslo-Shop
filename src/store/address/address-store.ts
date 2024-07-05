import { create } from "zustand";
import { persist } from "zustand/middleware";

interface State {
    address: {
        firstName: string;
        lastName: string;
        address: string;
        address2?: string;
        postalCode: string;
        city: string;
        country: string;
        phone: string;
    }

    // Methods
    setAddress: (address: State['address']) => void

    clearAddres: () => void
}

const initialAddress = {
    firstName: "",
    lastName: "",
    address: "",
    address2: "",
    postalCode: "",
    city: "",
    country: "",
    phone: "",
}

export const useAddressStore = create<State>()(
    persist(
        (set, get) => ({
            address: initialAddress,
            setAddress: (address) => {
                set({address});
            },
            clearAddres: () => {
                set({address: initialAddress});
            }
        }),
        {
            name: 'address-storage',
        }
    )
);