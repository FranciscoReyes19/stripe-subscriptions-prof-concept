import React, {useState} from 'react';
import {loadStripe} from '@stripe/stripe-js';
import './SubscriptionForm.scss';
import {
    CardElement,
    Elements,
    useStripe,
    useElements,
} from '@stripe/react-stripe-js';
import {createSubscription} from "../../api";

const CheckoutForm = () => {
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const cardElement = elements.getElement(CardElement);

        try {
            const { error, paymentMethod }
                = await stripe.createPaymentMethod({
                type: "card",
                card: cardElement,
            });
            if (error) {
                setError(error.message);
                return;
            }

            const { id } = paymentMethod;
            const response = await createSubscription({
                email: event.target.email.value,
                price: event.target.plan.value,
                stripeToken: id,
            });

            if (response.error) {
                setError(response.error);
                return;
            }

            setSuccess(true);
        } catch (error) {
            setError(error.message);
        }
    };


    return (
        <div className={'main-container'} >
            <h2>Checkout</h2>
            <div className={'checkout-container'} >
                <form className={'checkout-form'}  onSubmit={handleSubmit}>
                    <input type="email" name="email" placeholder="Email" required />
                    <select name="plan" required>
                        <option value="price_1MpzByEtFa38wxSpuBj1TOjl">Price 1</option>
                        <option value="price_1MpzByEtFa38wxSpuBj1TOjl">Price 2</option>
                        <option value="price_1MpzByEtFa38wxSpuBj1TOjl">Price 3</option>
                    </select>
                    <CardElement />
                    {error && <p style={{ color: "red" }}>{error}</p>}
                    {success && <p style={{ color: "green" }}>Subscription created!</p>}
                    <button type="submit" disabled={!stripe}>
                        Subscribe
                    </button>
                </form>
            </div>
        </div>
    );

};

const stripePromise = loadStripe('pk_test_51Mn5mjEtFa38wxSptDLW4Ah9RBKmQBYLyhNDc4gvd9PRikWLzsYQKonDkoiaHxaqnpcpR5g9ExE3oZXB6NsLxEdc00t8nGf4b7');

const SubscriptionForm = () => (
    <Elements stripe={stripePromise}>
        <CheckoutForm />
    </Elements>
);

export default SubscriptionForm;
