import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";


const Footer = () => {
    return (
        <footer className="footer bg-gray-800 text-white">
            <div className="mx-auto py-8 text-center">
                <div className="md:flex md:justify-between items-center md:gap-28">
                    <div className="mb-6 lg:mb-0 md:w-[320px]">
                        <p className="text-xl font-bold">INVENTIFY HUB</p>
                        <p className="text-sm">Inventory Management System &copy; 2024</p>
                        <div className=" mt-2">
                            <a href="#" className="mr-4 ">About</a>
                            <a href="#" className="mr-4">Contact</a>
                            <a href="#" className="mr-4">Privacy Policy</a>
                            <a href="#">Terms of Service</a>
                        </div>
                    </div>
                    <div className="md:w-[320px]">
                        <div className="mb-4 lg:mb-0">
                            <div className="flex justify-center gap-4 mb-2 text-xl">
                                <FaFacebook />
                                <FaInstagram />
                                <FaYoutube />
                            </div>
                            <p className="mb-2">Visit us at:</p>
                            <address>
                                123 Main Street<br />
                                Dhanmondi, Dhaka 1234<br />
                                Bangladesh
                            </address>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;