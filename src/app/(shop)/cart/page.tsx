import { Title } from "@/components";
import Link from "next/link";
import { ProductsInCart } from "./ui/ProductsInCart";
import { OrderSummary } from "./ui/OrderSummary";

export default function CartPage() {

  return (
    <div className="flex justify-center items-center mb-20 px-2 sm:px-0">
      <div className="flex flex-col w-[1000px]">
        <Title title="Carrito" />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          {/* Carrito */}
          <div className="flex flex-col mt-5">
            <span className="text-xl">Agregar más items</span>

            <Link 
              href="/"
              className="underline mb-5"
            >Continúa comprando</Link>

          {/* Items */}
          <ProductsInCart />
          </div>


          {/* Checkout - Summary of order */}
          <div className="bg-white rounded-xl shadow py-7 px-5 h-fit top-16 sticky">
            <h2 className="text-2xl font-bold mb-2">Resumen de orden</h2>

            <OrderSummary />

              <Link
                className="flex btn-primary justify-center mt-5 mb-2 w-full"
                href="/checkout/address"
              >Continuar</Link>
          </div>
        </div>
      </div>
    </div>
  );
}