import React, {useEffect, useState} from "react";
// import {loadStripe} from "@stripe/stripe-js";
import './singlePaymentForm.scss'

//const stripePromise = loadStripe('pk_test_51Mn5mjEtFa38wxSptDLW4Ah9RBKmQBYLyhNDc4gvd9PRikWLzsYQKonDkoiaHxaqnpcpR5g9ExE3oZXB6NsLxEdc00t8nGf4b7');

const ProductDisplay = () => (
    <section>
        <div className="product">
            <img
                src="https://i.imgur.com/EHyR2nP.png"
                alt="The cover of Stubborn Attachments"
            />
            <div className="description">
                <h3>Stubborn Attachments</h3>
                <h5>$20.00</h5>
            </div>
        </div>
        {/* http://localhost:3000 -> BACKEND DOMAIN */}
        <form action="http://localhost:3000/create-checkout-session" method="POST" >
            <button type="submit">
                Checkout
            </button>
        </form>
    </section>
);

const Message = ({message}) => (
    <section>
        <p>{message}</p>
    </section>
);


const SinglePaymentForm = () => {
    const [message, setMessage] = useState("");

    useEffect(() => {
        // Check to see if this is a redirect back from Checkout
        const query = new URLSearchParams(window.location.search);

        if (query.get("success")) {
            setMessage("Order placed! You will receive an email confirmation.");
        }

        if (query.get("canceled")) {
            setMessage(
                "Order canceled -- continue to shop around and checkout when you're ready."
            );
        }
    }, []);

    return message ? (
        <Message message={message}/>
    ) : (
        <ProductDisplay/>
    );
};

export default SinglePaymentForm;

