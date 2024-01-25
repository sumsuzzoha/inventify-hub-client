import { useState } from 'react';
import useInvoiceSpecific from '../../hooks/useInvoiceSpecific';
import { useParams } from 'react-router-dom';
import useShopUserWise from '../../hooks/useShopUserWise';
import DataLoading from '../Loading/DataLoading';
import { Helmet } from 'react-helmet-async';
import DashPageHeader from '../DashPageHeader/DashPageHeader';
import Swal from 'sweetalert2';
import jsPDF from 'jspdf';
import domtoimage from 'dom-to-image';


const SaleInvoice = () => {
  const { id } = useParams();
  const [invoices = [], isInvLoading] = useInvoiceSpecific(id);
  const [shop] = useShopUserWise();
  const [isPdfGenerated, setIsPdfGenerated] = useState(false);

  if (isInvLoading) {
    return <DataLoading></DataLoading>
  }

  const { invoiceDate } = invoices[0];
  const { invoiceNumber } = invoices[0];
  const subTotalPriceWhDiscStr = invoices.reduce((total, invoice) => total + invoice.totalPriceWhDisc, 0)

  const handleGeneratePdf = async () => {
    setIsPdfGenerated(true);
    const contentElement = document.getElementById('content');
    domtoimage.toPng(contentElement)
      .then((dataUrl) => {
        const pdf = new jsPDF({
          format: 'a4',  // A4 size
          unit: 'mm',
        });

        const aspectRatio = 210 / contentElement.offsetWidth;
        pdf.addImage(dataUrl, 'PNG', 10, 10, 190, contentElement.offsetHeight * aspectRatio);

        pdf.save(`Generated-${invoiceNumber}.pdf`);
        setIsPdfGenerated(false);
      })
      .catch(() => {
        Swal.fire({
          position: "center",
          icon: "error",
          text: "Print page not ready",
          showConfirmButton: false,
          timer: 2500
        });
        setIsPdfGenerated(false);
      });


  };


  return (
    <div>
      <Helmet>
        <title>Inventify Hub | Invoices</title>
      </Helmet>
      <DashPageHeader
        title={"Invoice Management"}
        subTitle={"Product in this Invoice"}
        description={'Sale your products efficiently'}
        data={invoices}
        // dynamicLink={'/dashboard/checkOut'}
        link_Btn_Title={'Print PDF '}
        // icon={<FaShoppingCart />}
        // items={cartItems}
        func={handleGeneratePdf}
        loader={isPdfGenerated}
      ></DashPageHeader>

      <div id="content" className="w-full mx-auto my-8 ">
        <div className='w-full mx-auto p-20 '>
          {/* Your HTML content goes here */}
          <h1 className="text-4xl font-bold mb-4">Sales Invoice</h1>
          <div className="mb-4">
            <p className="font-semibold text-lg">Shop Name: {shop?.shopName}</p>
            <p className="font-semibold text-lg">Date: {invoiceDate}</p>
            <p className="font-semibold text-lg">Invoice: {invoiceNumber}</p>
          </div>
          <h2 className="text-xl font-semibold my-4 text-2xl">Selected Products:</h2>
          <table className="w-full mb-4">
            <thead>
              <tr>
                <th className="border p-2">Product Name</th>
                <th className="border p-2">Product ID</th>
                <th className="border p-2">Quantity</th>
                <th className="border p-2">Selling Price</th>
                <th className="border p-2">Discount (%)</th>
                <th className="border p-2">Total Amount</th>
              </tr>
            </thead>
            <tbody className='text-center'>
              {invoices.map((product, idx) => (
                <tr key={idx}>
                  <td className="border p-2">{product.name}</td>
                  <td className="border p-2">{product.productId}</td>
                  <td className="border p-2">{product.saleQuantity}</td>
                  <td className="border p-2">{product.sellingPrice}</td>
                  <td className="border p-2">{product.discount}</td>
                  <td className="border p-2">{product.totalPriceWhDisc}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className='flex justify-between items-end mt-10 px-16'>
            <div className="">
              <p className="font-semibold">Total Amount: ${parseFloat(subTotalPriceWhDiscStr).toFixed(2)}</p>
              <p>Thank you for your purchase!</p>
            </div>
            <div className="text-start mr-20">
              <p>Signature</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SaleInvoice;
