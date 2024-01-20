// import React from 'react';
import useInvoiceSpecific from '../../hooks/useInvoiceSpecific';
import { useParams } from 'react-router-dom';
import TableData from './TableData';


const SaleInvoice = () => {
  const { id } = useParams();
  const [allInvoices = [],] = useInvoiceSpecific(id);

  // total price in string
  const subTotalPriceWhDisc = allInvoices.reduce((total, product) => {
    return (total + parseFloat(product.totalPriceWhDisc));
  }, 0);
  const subTotalPriceWhDiscStr = parseFloat(subTotalPriceWhDisc).toFixed(2);

  // Inv number 
  const invNum = allInvoices.find(item => item.invoiceNumber);

  return (
    <div style={a4SizeStyles} className=" bg-white p-8 rounded-lg shadow-md">
      {/* TODO: Add shop Logo here */}
      {/* <div className=" flex items-center gap-4">
        <img className="w-[50px]" src={logo} alt="" />
        <h2 className="text-4xl font-bold uppercase">Inventify Hub</h2>
      </div> */}
      <h1 className="text-3xl font-bold mb-6">Sales Invoice</h1>
      <div className="invoice-details mb-4">
        <p>Date: {new Date().toLocaleDateString()}</p>
        <p>Invoice: {invNum?.invoiceNumber}</p>
      </div>
      <div className="product-list mb-8">
        <h2 className="text-xl font-semibold mb-2">Selected Products:</h2>
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="border p-2">Product Name</th>
              <th className="border p-2">Quantity</th>
              <th className="border p-2">Selling Price</th>
              <th className="border p-2">Discount (%)</th>
              <th className="border p-2">Total</th>
            </tr>
          </thead>
          <tbody>
            {allInvoices.map((product, idx) => <TableData key={idx} product={product}></TableData>)}

          </tbody>
        </table>
      </div>
      <div className="mt-20">
        <p className="text-xl font-semibold mb-2">Total Amount: ${subTotalPriceWhDiscStr}</p>
        <p>Thank you for your purchase!</p>
      </div>
    </div>
  );
};

const a4SizeStyles = {
  width: '210mm', // A4 width
  height: '297mm', // A4 height
  margin: '0 auto', 
  padding: '10mm',
  pageBreakBefore: 'always', // Add a page break before when printing
};

export default SaleInvoice;
