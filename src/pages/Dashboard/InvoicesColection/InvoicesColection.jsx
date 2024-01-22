import { useNavigate } from "react-router-dom";
import useInvoiceShopWise from "../../../hooks/useInvoiceShopWise";

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
            <div className="bg-blue-500 px-8 py-4 mb-2 text-white text-center md:text-left md:flex justify-between items-center rounded-lg mb-4">
                <div className="mb-3 md:mb-0">
                    <h1 className="text-2xl font-semibold">Invoice Collection</h1>
                    <p className="text-sm mt-1">Sale your products efficiently</p>
                </div>
                <div className="uppercase text-lg font-bold">
                    Inventify Hub
                </div>
            </div>
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
