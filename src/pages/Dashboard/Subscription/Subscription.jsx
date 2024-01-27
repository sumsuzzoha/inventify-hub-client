import { Helmet } from "react-helmet-async";
import PaymentCard from "./PaymentCard";

const Subscription = () => {
    return (
        <div>
            <Helmet><title>Inventify Hub | Subscription</title></Helmet>
            <div className="container mx-auto mt-">
                <section className="mb-8">
                    <h1 className="text-4xl font-bold mb-4 text-center text-blue-700">
                        Subscription Plans
                    </h1>
                    <div className="flex flex-col lg:flex-row justify-center items-center gap-8">
                        <PaymentCard
                            amount={10}
                            limit={200}
                            pack={'Silver Pack'}
                            description="Unlock the Silver Pack and enjoy a limit of 200. Upgrade today!"
                            additionalInfo="Save $5 when you subscribe annually!"
                        />
                        <PaymentCard
                            amount={20}
                            limit={450}
                            pack={'Gold Pack'}
                            description="Upgrade to the Gold Pack for a limit of 450. Exclusive features included."
                            additionalInfo="Save $10 when you subscribe annually!"
                        />
                        <PaymentCard
                            amount={50}
                            limit={1500}
                            pack={'Platinum Pack'}
                            description="Experience the Platinum Pack with a generous limit of 1500. Premium benefits await!"
                            additionalInfo="Save $20 when you subscribe annually!"
                        />
                    </div>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4 text-center text-green-600">
                        Subscription Features
                    </h2>
                    <div className="flex justify-center items-center gap-8 text-center text-gray-700">
                        <div>
                            <p>Unlimited Access to Premium Content</p>
                            <p>Enhanced Security and Privacy</p>
                        </div>
                        <div>
                            <p>Priority Customer Support</p>
                            <p>Early Access to New Features</p>
                        </div>
                        <div>
                            <p>Exclusive Discounts and Offers</p>
                            <p>Customizable User Experience</p>
                        </div>
                    </div>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4 text-center text-purple-600">
                        Why You Should Buy
                    </h2>
                    <p className="text-center text-gray-700">
                        Investing in a subscription not only unlocks advanced features and benefits but
                        also supports the ongoing development of our platform. Enjoy a seamless and
                        enhanced experience tailored just for you.
                    </p>
                </section>
            </div>
        </div>
    );
};

export default Subscription;
