import { useNavigate } from "react-router-dom";
import useInvoiceShopWise from "../../../hooks/useInvoiceShopWise";
import DashPageHeader from "../../../components/DashPageHeader/DashPageHeader";

const InvoicesColection = () => {
    const [allInvoices = []] = useInvoiceShopWise();
    const navigate = useNavigate();

    const sortedInvoices = allInvoices.sort((a, b) => {
        const getDateTime = (invoice) => invoice.invoiceNumber.split('_').slice(1, 3);
        return getDateTime(b).join('') - getDateTime(a).join('');
    });

    const handleSeeInv = (inv) => {
        navigate(`/dashboard/invoice/${inv}`)

    }
    return (
        <div>
            <DashPageHeader
                title={"Invoice Collection"}
                subTitle={"Invoices are generate in this shop"}
                description={'Sale your products efficiently'}
                data={allInvoices}
                // dynamicLink={'/dashboard/checkOut'}
                // link_Btn_Title={'Generate Invoice'}
                // icon={<FaShoppingCart />}
                // items={cartItems}
                // func={handleGenarateInvoice}
            ></DashPageHeader>           
            <div className="overflow-x-auto w-full max-w-2xl mx-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>SL</th>
                            <th>Shop Id</th>
                            <th>Invoice Number</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedInvoices.map((invoice, idx) => <tr key={idx} className="hover">
                            <th>{idx + 1}</th>
                            <td>{invoice.shopId}</td>
                            <td>{invoice.invoiceNumber}</td>
                            <td><button onClick={() => handleSeeInv(invoice.invoiceNumber)} className="btn btn-sm btn-primary">See Invoice</button></td>
                        </tr>)}

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default InvoicesColection;
