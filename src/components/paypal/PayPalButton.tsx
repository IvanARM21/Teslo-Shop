"use client";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { CreateOrderData, CreateOrderActions, OnApproveActions, OnApproveData } from "@paypal/paypal-js";
import { Spinner } from "../ui/spinner/Spinner";
import { paypalCheckPayment, setTransactionId } from "@/actions";

interface Props {
    orderId: string;
    amount: number
}

export const PayPalButton = ({orderId, amount} : Props) => {
    const [{ isPending }] = usePayPalScriptReducer();

    const rountedAmount = (Math.round(amount * 100)) / 100;

    if(isPending) return <Spinner className="w-[70px] my-auto mx-auto" classNameChilds="w-[20px] h-[20px]" />


    const createOrder = async (data: CreateOrderData, actions: CreateOrderActions) => {
        const transactionId = await actions.order.create({
            intent: 'CAPTURE',
            purchase_units: [
                {
                    invoice_id: orderId,
                    amount: {
                        value: rountedAmount.toString(),
                        currency_code: 'USD' // Agregar el currency_code aquí
                    },
                }
            ]
        });

        const { ok } = await setTransactionId(orderId, transactionId);
        if(!ok) {
            throw new Error('No se pudo actualizar la orden')
        }
        return transactionId;
    }

    const onApprove = async (data : OnApproveData, actions : OnApproveActions) => {
        console.log('onApprove')
        const details = await actions.order?.capture();
        if(!details || !details?.id) return;

        await paypalCheckPayment(details.id);
    }

  return (
    <div className="relative z-0">
        <PayPalButtons 
            createOrder={createOrder}
            onApprove={onApprove}
        />
    </div>
  )
}
