import { motion } from 'framer-motion';

const QuestionSec = () => {
    return (
        <div className="pt-4">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
                className="container mx-auto text-center"
            >
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="bg-gray-700 text-white p-8 rounded-lg shadow-lg mb-8"
                >
                    <h2 className="text-3xl text-center font-bold mb-6 text-blue-600">Frequently Asked Questions</h2>
                    <div className="collapse collapse-arrow bg-blue-200 my-2">
                        <input type="radio" name="my-accordion-2" defaultChecked="checked" />
                        <div className="collapse-title text-xl font-medium">
                            What is the purpose of the Inventory Management System?
                        </div>
                        <div className="collapse-content">
                            <p className="mb-4">The Inventory Management System is designed to help businesses efficiently track and manage their inventory. It provides real-time tracking, reporting, and analytics to optimize inventory control, reduce costs, and enhance overall efficiency.
                            </p>
                        </div>
                    </div>
                    <div className="collapse collapse-arrow bg-blue-200 my-2">
                        <input type="radio" name="my-accordion-2" />
                        <div className="collapse-title text-xl font-medium">
                            How can I integrate the system with other business tools?
                        </div>
                        <div className="collapse-content">
                            <p className="mb-4">
                                The Inventory Management System offers seamless integration capabilities. You can easily integrate it with other business systems such as accounting or ERP software, ensuring a smooth flow of data across different departments for enhanced efficiency.
                            </p>
                        </div>
                    </div>
                    <div className="collapse collapse-arrow bg-blue-200 my-2">
                        <input type="radio" name="my-accordion-2" />
                        <div className="collapse-title text-xl font-medium">
                            Is the system suitable for small businesses?
                        </div>
                        <div className="collapse-content">
                            <p className="mb-4">
                                Yes, the Inventory Management System is designed to meet the needs of businesses of all sizes, including small startups. Its user-friendly interface and customizable features make it adaptable to the unique requirements of small and large enterprises alike.
                            </p>
                        </div>
                    </div>
                </motion.div>
            </motion.div>


        </div>
    );
};

export default QuestionSec;