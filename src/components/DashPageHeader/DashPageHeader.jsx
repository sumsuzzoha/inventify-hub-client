import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// Need to send these Data as props 
{/* <DashPageHeader
    title={"Sales Management"}
    subTitle={"Product in cart to sell"}
    description={'Sale your products efficiently'}
    data={cartItems}
    dynamicLink={'/dashboard/checkOut'}
    link_Btn_Title={'Generate Invoice'}
    // icon={<FaShoppingCart />}
    // items={cartItems}
    func={handleGenarateInvoice}
></DashPageHeader> */}



const DashPageHeader = ({ title, subTitle, description, data, dynamicLink, link_Btn_Title, icon, items, func, loader }) => {
    const displayStyle = loader ? 'block' : 'none';
    return (
        <div className="bg-blue-500 p-4 mb-2 text-white text-center md:text-left md:flex justify-between items-center rounded-lg ">
            <div className="mb-3 md:mb-0">
                <h1 className="text-2xl font-semibold">{title}</h1>
                <p className="text-sm mt-1">{description}</p>
                <p className="text-m mt-1">{data?.length} {subTitle}</p>
            </div>
            <div className="flex flex-col md:flex-row items-center md:gap-8">
                <div className={`indicator text-3xl ${!icon && "hidden"} hidden lg:block`}>
                    {icon}
                    <span className={`badge badge-sm indicator-item ${!icon && "hidden"}`}>{items?.length}</span>
                </div>
                <div>
                    {link_Btn_Title && <div>
                        {dynamicLink && <Link to={dynamicLink}><button onClick={func} className="bg-white text-blue-500 px-4 py-2 rounded-full hover:bg-blue-100 focus:outline-none">
                            {link_Btn_Title}
                        </button></Link>}
                        {func && <button onClick={func} className=" btn bg-white text-blue-500 px-4 py-2 rounded-full hover:bg-blue-100 focus:outline-none"><span className={`loading loading-spinner `} style={{ display: displayStyle }}></span>
                            {link_Btn_Title}
                        </button>}

                    </div>}

                </div>
            </div>
        </div>
    );
};
DashPageHeader.propTypes = {
    title: PropTypes.string,
    subTitle: PropTypes.string,
    description: PropTypes.string,
    data: PropTypes.array,
    dynamicLink: PropTypes.string,
    link_Btn_Title: PropTypes.string,
    icon: PropTypes.node,
    items: PropTypes.array,
    func: PropTypes.func,
    loader: PropTypes.bool,

};
export default DashPageHeader;