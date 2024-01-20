import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";
import { useParams } from "react-router-dom";

const Payment = () => {
    const {amount} = useParams();
    const stripePromise = loadStripe(import.meta.env.VITE_Payment_Getway_PK);
    return (
        <div>
            <div>
                <Elements stripe={stripePromise}>
                    <CheckoutForm amount={amount} />
                </Elements>
            </div>
        </div>
    );
};

export default Payment;