import { useRef, useState } from 'react';
import useInvoiceSpecific from '../../hooks/useInvoiceSpecific';
import { useParams } from 'react-router-dom';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useShopUserWise from '../../hooks/useShopUserWise';
import DataLoading from '../Loading/DataLoading';
import { Helmet } from 'react-helmet-async';
import DashPageHeader from '../DashPageHeader/DashPageHeader';
import Swal from 'sweetalert2';
// import './SaleInvoice.css';

const SaleInvoice = () => {
  const { id } = useParams();
  const [invoices = [], isInvLoading] = useInvoiceSpecific(id);
  // const firstInvoice = invoices.find(() => true); // Finds the first item in the array
  const [shop] = useShopUserWise();
  const axiosSecure = useAxiosSecure();
  const contentRef = useRef(null);
  const [isPdfGenerated, setIsPdfGenerated] = useState(false);

  if (isInvLoading) {
    return <DataLoading></DataLoading>
  }

  const { invoiceDate } = invoices[0];
  const { invoiceNumber } = invoices[0];
  const subTotalPriceWhDiscStr = invoices.reduce((total, invoice) => total + invoice.totalPriceWhDisc, 0)

  const handleGeneratePdf = async () => {
    setIsPdfGenerated(true);
    const contentElement = contentRef.current;

    // Extract HTML content
    const htmlContent = contentElement.innerHTML;

    // Send HTML content to the server to generate PDF
    try {
      const response = await axiosSecure.post('/generate-pdf', {
        htmlContent,
      }, {
        responseType: 'arraybuffer', // Important: Set responseType to 'arraybuffer'
      });

      // Convert the received PDF blob to a data URL
      const pdfBlob = new Blob([response.data], { type: 'application/pdf' });
      const pdfUrl = URL.createObjectURL(pdfBlob);

      setIsPdfGenerated(false);
      // Open the generated PDF in a new window
      window.open(pdfUrl, '_blank');
    } catch (error) {
      Swal.fire({
        position: "center",
        icon: "error",
        text: "Print page not ready",
        showConfirmButton: false,
        timer: 2500
      });
      setIsPdfGenerated(false);
    }
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
      <div>
        <div ref={contentRef}>
          {/* Your HTML content goes here */}
          <div style={{ width: '210mm', margin: '0 auto', boxSizing: 'border-box', padding: '10mm', }}>
            <div style={{ padding: '20px' }}>
              <h1 style={{ textAlign: 'center', fontSize: '24px', fontWeight: '700' }}>Sales Invoice</h1>
              <div style={{ marginTop: '20px' }}>
                <p style={{ margin: '5px 0', fontWeight: '500' }}>Shop Name: {shop?.shopName}</p>
                <p style={{ margin: '5px 0', fontWeight: '500' }}>Date: {invoiceDate}</p>
                <p style={{ margin: '5px 0', fontWeight: '500' }}>Invoice: {invoiceNumber}</p>
              </div>
              <div style={{ marginTop: '20px' }}>
                <h2 style={{ fontSize: '18px', marginBottom: '10px', fontWeight: '600' }}>Selected Products:</h2>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr>
                      <th style={{ border: '1px solid #ccc', padding: '8px', textAlign: 'center' }}>Product Name</th>
                      <th style={{ border: '1px solid #ccc', padding: '8px', textAlign: 'center' }}>Product ID</th>
                      <th style={{ border: '1px solid #ccc', padding: '8px', textAlign: 'center' }}>Quantity</th>
                      <th style={{ border: '1px solid #ccc', padding: '8px', textAlign: 'center' }}>Selling Price</th>
                      <th style={{ border: '1px solid #ccc', padding: '8px', textAlign: 'center' }}>Discount (%)</th>
                      <th style={{ border: '1px solid #ccc', padding: '8px', textAlign: 'center' }}>Total Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {invoices.map((product, idx) => (
                      <tr key={idx}>
                        <td style={{ border: '1px solid #ccc', padding: '8px', textAlign: 'center' }}>{product.name}</td>
                        <td style={{ border: '1px solid #ccc', padding: '8px', textAlign: 'center' }}>{product.productId}</td>
                        <td style={{ border: '1px solid #ccc', padding: '8px', textAlign: 'center' }}>{product.saleQuantity}</td>
                        <td style={{ border: '1px solid #ccc', padding: '8px', textAlign: 'center' }}>{product.sellingPrice}</td>
                        <td style={{ border: '1px solid #ccc', padding: '8px', textAlign: 'center' }}>{product.discount}</td>
                        <td style={{ border: '1px solid #ccc', padding: '8px', textAlign: 'center' }}>{product.totalPriceWhDisc}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '60px' }}>
                <div style={{ flexGrow: '1' }}>
                  <p style={{ margin: '5px 0', fontWeight: '500' }}>Total Amount: ${parseFloat(subTotalPriceWhDiscStr).toFixed(2)}</p>
                  <p style={{ margin: '5px 0' }}>Thank you for your purchase!</p>
                </div>
                <div style={{ textAlign: 'center', marginRight: '4rem' }}>
                  <p style={{ margin: '5px 0' }}>Signature</p>
                  {/* Add a signature image or a line for manual signature */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SaleInvoice;
