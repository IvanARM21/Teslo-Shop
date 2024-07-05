import { OrderStatus, PayPalButton, Title } from "@/components";
import Link from "next/link";
import Image from "next/image";
import clsx from "clsx";
import { IoCardOutline } from "react-icons/io5";
import { getOrderById } from "@/actions";
import { redirect } from "next/navigation";
import { currencyFormat } from "@/utils";

interface Props {
  params: {
    id: string;
  }
}

export default async function OrdersPage({ params } : Props) {

  const { id } = params;

  // TODO: Llamar el server action
  const { order, ok } = await getOrderById(id);

  // TODO: Verificar
  if(!ok || !order) {
    redirect('/');
  };

  const address = order!.OrderAddress;

  return (
    <div className="flex justify-center items-center mb-20 px-2 sm:px-0">
      <div className="flex flex-col w-[1000px]">
        <Title title={`Orden #${id.split('-').at(-1)}`} />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          {/* Carrito */}
          <div className="flex flex-col mt-5">
            
          <OrderStatus isPaid={order.isPaid} />

          {/* Items */}
          {
            order.OrderItem.map(item => (
              <div key={item.product.slug + '-' + item.size} className="flex gap-3 mb-5 ">
                  <Link 
                    className=" overflow-hidden max-w-36 h-fit"
                    href={`/product/${item.product.slug}`}
                >
                    <Image 
                        src={`/products/${item.product.productImage[0].url}`}
                        width={150}
                        height={150}
                        alt={item.product.title}
                        className="rounded w-full hover:scale-125 transition-transform duration-300"
                    />
                </Link>

                  <div>
                    <Link
                      href={`/product/${item.product.slug}`}
                      className="hover:text-blue-600 transition-colors duration-300"
                    >{item.product.title}</Link>
                    <p>${item.price} x {item.quantity}</p>
                    <p className="font-bold">Subtotal: ${item.price * item.quantity}</p>
                  </div>
              </div>
            ))
          }
          </div>


          {/* Checkout - Summary of order */}
          <div className="bg-white rounded-xl shadow py-7 px-5 h-fit top-16  sticky">

            <h2 className={`text-2xl mb-2 font-bold`}>Dirección de Entrega</h2>
            <div className="mb-10">
              <p className="text-xl">{address?.firstName} {address?.lastName}</p>
              <p>{address?.address}</p>
              <p>{address?.address2}</p>
              <p>{address?.countryId}</p>
              <p>{address?.city}</p>
              <p>{address?.phone}</p>
            </div>
            
            {/* Divider */}
            <div className="w-full h-0.5 rounded bg-gray-200 mb-10"></div>


            <h2 className={`text-2xl mb-2 font-bold`}>Resumen de orden</h2>

            <div className="grid grid-cols-2 gap-5">
              <span>Nro. Productos</span>
              <span className="text-right">{order.itemsInOrder} artículos</span>

              <span>Subtotal</span>
              <span className="text-right">{currencyFormat(order.subTotal)}</span>

              <span>Impuestos (15%)</span>
              <span className="text-right">{currencyFormat(order.tax)}</span>

              <span className="text-2xl font-bold">Total:</span>
              <span className="text-2xl text-right font-bold">{currencyFormat(order.total)}</span>
            </div>

            <div className="mt-5 mb-2 w-full">

              {order.isPaid ? (
                <OrderStatus isPaid={order.isPaid} />
              ) : (
                <PayPalButton
                  amount={order!.total}
                  orderId={order.id}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}