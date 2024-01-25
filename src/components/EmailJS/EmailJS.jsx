import Modal from 'react-modal';
import { FaRegWindowClose } from "react-icons/fa";
import PropTypes from 'prop-types';
import { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import Swal from 'sweetalert2';




const EmailJS = ({ modalIsOpen, setIsOpen, user }) => {
    // console.log(user);
    const form = useRef();  // Create a ref for the form element
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');




    const handleSendEmail = (e) => {
        e.preventDefault();

        const SERVICE_ID = 'service_zxh1m6w';
        const TEMPLATE_ID = 'template_q14gzo4';
        const PUBLIC_KEY = 'IV0aNztsa2IZjkAzd';

        const templateParams = {
            from_name: name || 'Inventify',
            from_email: email,
            to_name: user.name,
            message: message,
        };

        // console.log('templateParams:', templateParams);

        // Pass the form element directly using the ref
        emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY)
            .then(() => {
                // console.log('Email sent successfully', result);
                Swal.fire({
                    icon: 'success',
                    title: "Email sent.",
                    showClass: {
                        popup: `
                        animate__animated
                        animate__fadeInUp
                        animate__faster
                      `
                    },
                    hideClass: {
                        popup: `
                        animate__animated
                        animate__fadeOutDown
                        animate__faster
                      `
                    }
                });
                setName('');
                setEmail('');
                setMessage('');
                closeModal();  // Optionally close the modal after successful email sending
            })
            .catch((error) => {
                console.log('Email failed to send', error.text);
            });
    };



    Modal.setAppElement('body');
    function closeModal() {
        setIsOpen(false);
    }

    return (
        <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Example Modal"

        >
            <div>
                <div className="max-w-md mx-auto p-4 bg-gray-100 rounded shadow-md">
                    <div className='flex justify-end items-end'>
                        <button onClick={closeModal} className='text-xl'><FaRegWindowClose /></button>
                    </div>
                    <form ref={form} onSubmit={handleSendEmail} className="flex flex-col space-y-4">
                        <div>
                            <label htmlFor="recipient" className="text-gray-600 mb-1 block">Sender Name</label>
                            <input
                                type="text"
                                id="recipient"
                                value={name}
                                // defaultValue={user.email}
                                placeholder={'Inventify'}
                                onChange={e => setName(e.target.value)}
                                className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
                            />
                        </div>
                        <div>
                            <label htmlFor="subject" className="text-gray-600 mb-1 block">to:</label>
                            <input
                                type="email"
                                id="subject"
                                // value={email}
                                defaultValue={user.email}
                                onChange={e => setEmail(e.target.value)} className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
                            />
                        </div>
                        <div>
                            <label htmlFor="body" className="text-gray-600 mb-1 block">Body:</label>
                            <textarea
                                id="body"
                                value={message}
                                onChange={e => setMessage(e.target.value)} className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
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
        </Modal>
    );
};
EmailJS.propTypes = {
    modalIsOpen: PropTypes.bool,
    setIsOpen: PropTypes.func,
    user: PropTypes.object,

};
export default EmailJS;


const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        overflowY: 'auto',
        maxHeight: '80vh',
        width: '90%', // Set a default width
        maxWidth: '420px', // Set a maximum width

        // // Responsive max-width
        // '@media (min-width: 768px)': {
        //     maxWidth: '800px',
        // },
        // '@media (min-width: 1024px)': {
        //     maxWidth: '1000px',
        // },
    },
};
