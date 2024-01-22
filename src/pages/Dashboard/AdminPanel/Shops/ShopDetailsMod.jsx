import Modal from 'react-modal';
import { FaRegWindowClose } from "react-icons/fa";
import PropTypes from 'prop-types';


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

    },
};

const ShopDetailsMod = ({ modalIsOpen, setIsOpen, shop }) => {

    Modal.setAppElement('body');

    const { lineOfProduct, productLimit, shopDetails, shopEmployes, shopId, shopLocation, shopLogo, shopName, shopOwnerEmail, shopOwnerName, } = shop;

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

            <div className="w-[420px] max-w-md mx-auto bg-white rounded-xl overflow-hidde ">
                <img className="w-full h-48 object-cover" src={shopLogo} alt={shopName} />
                <div className="px-6 py-4">
                    <div className="font-bold text-xl mb-2">{shopName} <span className="badge badge-sm indicator-item">{shopId}</span></div>
                    <p className="text-gray-700 text-base">{shopDetails}</p>
                </div>
                <div className="px-6 py-4">
                    <p className="text-gray-700">Location: {shopLocation}</p>
                    <p className="text-gray-700">Owner: {shopOwnerName}</p>
                    <p className="text-gray-700">Email: {shopOwnerEmail}</p>
                </div>
                <div className="px-6 py-4 flex justify-between">
                    <div>
                        <p className="text-gray-700">Line of Product: {lineOfProduct}</p>
                        <p className="text-gray-700">Product Limit: {productLimit}</p>
                        <div>
                            <p className="text-gray-700">Shop Employees:</p>
                            {shopEmployes.map((employe, idx) => <li key={idx} className='ms-10'>{employe}</li>)}
                        </div>

                    </div>
                    <div className='flex justify-end items-end'>
                        <button onClick={closeModal} className='text-xl'><FaRegWindowClose /></button>
                    </div>
                </div>
            </div>
        </Modal>
    );
};
ShopDetailsMod.propTypes = {
    modalIsOpen: PropTypes.bool,
    setIsOpen: PropTypes.func,
    shop: PropTypes.object,

};
export default ShopDetailsMod;