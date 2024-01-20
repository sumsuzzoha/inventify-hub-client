import PaymentCard from "./PaymentCard";

const Subscription = () => {


    return (
        <div className="flex justify-center items-center gap-4">
            <PaymentCard
                amount={10}
                limit={200}

                description="Pay $10 to increase limit to 200."
            />
            <PaymentCard
                amount={20}
                limit={450}
                description="Pay $20 to increase limit to 450."
            />
            <PaymentCard
                amount={50}
                limit={1500}
                description="Pay $50 to increase limit to 1500."
            />
        </div>
    );
};

export default Subscription;