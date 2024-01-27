import { Helmet } from "react-helmet-async";
import { FaFacebook, FaLinkedin, FaTwitter } from "react-icons/fa";

const ContactUs = () => {
    return (
        <div className="contact-us-page bg-gray-100 p-8">
            <Helmet>
                <title>Inventify Hub | Contact us</title>
            </Helmet>
            <h1 className="text-3xl font-bold mb-4 text-center mb-6">Contact Us</h1>

            <div className="contact-info bg-white p-6 rounded-lg shadow-md mb-8">
                <p className="text-gray-700">
                    For any inquiries related to our Inventory Management System, please
                    feel free to contact us using the information below:
                </p>

                <ul className="mt-4">
                    <li className="text-gray-700">Email: info@inventifyhub.com</li>
                    <li className="text-gray-700">Phone: +1 (123) 456-7890</li>
                    <li className="text-gray-700">Address: 123 Main Street,  Dhanmondi, Dhaka 1234, Bangladesh</li>
                </ul>
            </div>

            <div className="social-links bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-4">Follow Us on Social Media</h2>

                <ul className="flex text-2xl space-x-4">
                    <li>
                        <a
                            href="https://www.facebook.com/inventorymanagement"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 hover:underline"
                        >
                            <FaFacebook />
                        </a>
                    </li>
                    <li>
                        <a
                            href="https://twitter.com/inventory_mgmt"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-400 hover:underline"
                        >
                            <FaTwitter />
                        </a>
                    </li>
                    <li>
                        <a
                            href="https://www.linkedin.com/company/inventory-management"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-700 hover:underline"
                        >
                            <FaLinkedin />
                        </a>
                    </li>
                    {/* Add other social media links as needed */}
                </ul>
            </div>
        </div>
    );
};

export default ContactUs;

