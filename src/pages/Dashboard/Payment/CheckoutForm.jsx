import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import useDateTime from "../../../hooks/useDateTime";
import Swal from "sweetalert2";
import useShopUserWise from "../../../hooks/useShopUserWise";
import PropTypes from 'prop-types';


const CheckoutForm = ({ amount }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState('');
    const [clientSecret, setClientSecret] = useState('');
    const [transactionId, setTransactionId] = useState('');
    const { user } = useAuth()
    const [shop] = useShopUserWise();
    const [formattedDateTime] = useDateTime();
    const axiosSecure = useAxiosSecure();
    const totalAmount = parseInt(amount);




    let limit = 0;
    if (totalAmount >= 50) {
        limit = 1500;
    } else if (totalAmount >= 20) {
        limit = 450;
    } else if (totalAmount >= 10) {
        limit = 200;
    }

    useEffect(() => {
        // Create PaymentIntent as soon as the page loads
        if (totalAmount > 0) {
            axiosSecure.post('/create-payment-intent', { price: totalAmount })
                .then((res) => {
                    setClientSecret(res.data.clientSecret);
                    // console.log(res.data.clientSecret);
                });
        }
    }, [axiosSecure, totalAmount]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setClientSecret('');
        setTransactionId('');

        if (!stripe || !elements) {
            // Stripe.js has not loaded yet. Make sure to disable
            return;
        }

        // to find your CardElement 
        const card = elements.getElement(CardElement);
        // if not found then return
        if (card == null) {
            return;
        }

        // create Payment Method / Use your card Element with other Stripe.js APIs
        const { error,  } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            setError(error.message);
            // console.log('[error]', error);
        } else {
            setError('');
            // console.log('[PaymentMethod]', paymentMethod);
        }
        // confirm payment
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email || 'Anonymous',
                    name: user?.displayName || 'Anonymous',
                },
            },
        })

        if (confirmError) {
            // console.log('confirmError', confirmError);
        } else {
            // console.log("payment Intant.", paymentIntent);
            if (paymentIntent.status === "succeeded") {
                // alert(`Transaction Succeeded. Id-${paymentIntent.id}`)
                setTransactionId(paymentIntent.id);
                // now save the payment in DB
                const paymentInfo = {
                    email: user.email,
                    paidAmount: totalAmount,
                    transactionId: paymentIntent.id,
                    date: formattedDateTime, // TODO: convert time as utc, use MomentJS
                    shopId: shop.shopId,
                    shopName: shop.shopName,
                    limit: limit,
                    status: "Payment Done"
                }
                // console.log(paymentInfo);
                const res = await axiosSecure.post('/payments', paymentInfo)
                // console.log('Payment saved', res.data)
                if (res.data?.acknowledged == true) {
                    Swal.fire({
                        title: "Payment Completed",
                        text: `Transaction Id-${paymentIntent.id}`,
                        icon: "success"
                    });

                    // navigate('/dashboard/paymentHistory')
                }
            }
        }

    }
    return (
        <div style={{ width: '400px', margin: 'auto' }}>
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '20px' }}>
                    <label style={{ fontSize: '24px', marginBottom: '8px', display: 'block', fontWeight: 700 }}>
                        Card Details
                    </label>
                    <CardElement
                        options={{
                            style: {
                                base: {
                                    fontSize: '16px',
                                    color: '#424770',
                                    '::placeholder': {
                                        color: '#aab7c4',
                                    },
                                },
                                invalid: {
                                    color: '#9e2146',
                                },
                            },
                        }}
                        className="border"
                    />
                </div>
                <button
                    type="submit"
                    disabled={!stripe || !clientSecret}
                    className="w-full btn btn-outline btn-info"
                >
                    Pay
                </button>
                <div>
                    {error && <p className="text-red-500 text-lg">{error}</p>}
                    {transactionId && <p className=" text-lg my-6">Transaction Id:{transactionId}</p>}
                </div>
            </form>

        </div>
    );
};

CheckoutForm.propTypes = {
    amount: PropTypes.string
};

export default CheckoutForm;