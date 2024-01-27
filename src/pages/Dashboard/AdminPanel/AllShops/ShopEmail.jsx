// ShopEmail.jsx

import { FaRegWindowClose } from 'react-icons/fa';
import PropTypes from 'prop-types';
import { useEffect, useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import Swal from 'sweetalert2';

const ShopEmail = ({ setIsOpen, user }) => {
    const form = useRef();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const closeModal = () => {
        setIsOpen(false);
    };

    useEffect(() => {
        // Set the email state with the default value when the component mounts
        setName(user.name || ''); 
        setEmail(user.email || ''); 
        setEmail(user.email || ''); 
    }, [user.email, user.name]);

    const handleSendEmail = (e) => {
        e.preventDefault();

        const SERVICE_ID = 'service_zxh1m6w';
        const TEMPLATE_ID = 'template_q14gzo4';
        const PUBLIC_KEY = 'IV0aNztsa2IZjkAzd';

        const templateParams = {
            from_name: 'Inventify',
            from_email: email,
            to_name: name,
            message: message,
        };

        emailjs
            .send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY)
            .then(() => {
                Swal.fire({
                    icon: 'success',
                    title: 'Email sent.',
                    showClass: {
                        popup: `
                        animate__animated
                        animate__fadeInUp
                        animate__faster
                      `,
                    },
                    hideClass: {
                        popup: `
                        animate__animated
                        animate__fadeOutDown
                        animate__faster
                      `,
                    },
                });
                setName('');
                setEmail('');
                setMessage('');
                closeModal();
            })
            .catch(() => {
                Swal.fire({
                    title: "Failed!",
                    text: `Email failed to send, Contact IT dept.`,
                    icon: "error"
                });
                closeModal();
            });
    };

    return (
        <div>
            <div className="max-w-md mx-auto p-4 bg-gray-100 rounded shadow-md">
                <div className="flex justify-end items-end">
                    <button onClick={closeModal} className="text-xl">
                        <FaRegWindowClose />
                    </button>
                </div>
                <form ref={form} onSubmit={handleSendEmail} className="flex flex-col space-y-4">
                    <div>
                        <label htmlFor="recipient" className="text-gray-600 mb-1 block">
                            Sender Name
                        </label>
                        <input
                            type="text"
                            id="recipient"
                            defaultValue={'Inventify'}
                            // placeholder={'Inventify'}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
                        />
                    </div>
                    <div>
                        <label htmlFor="subject" className="text-gray-600 mb-1 block">
                            to:
                        </label>
                        <input
                            type="email"
                            id="subject"
                            // value={email}
                            defaultValue={user.email}
                            onBlur={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
                        />
                    </div>
                    <div>
                        <label htmlFor="body" className="text-gray-600 mb-1 block">
                            Body:
                        </label>
                        <textarea
                            id="body"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
                            rows="4"
                        ></textarea>
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none"
                        >
                            Send Email
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

ShopEmail.propTypes = {
    modalIsOpenShopEmail: PropTypes.bool,
    setIsOpen: PropTypes.func,
    user: PropTypes.object,
};

export default ShopEmail;
