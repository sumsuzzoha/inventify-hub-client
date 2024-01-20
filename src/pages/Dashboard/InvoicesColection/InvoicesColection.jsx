import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
// import useInvoiceAll from "../../../hooks/useInvoiceAll";

const InvoicesColection = () => {
    // const [allInvoices = []] = useInvoiceAll();
    // console.log(allInvoices);
    const navigate = useNavigate();

    const handleGo = () => {
        Swal.fire({
            // title: "Done",
            text: "Invoice Generated",
            icon: "success",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "See the Invoice"
          }).then((result) => {
            if (result.isConfirmed) {
                navigate('/dashboard/invoice/INV_20240119_202129_hu32')
            //   Swal.fire({
            //     title: "Deleted!",
            //     text: "Your file has been deleted.",
            //     icon: "success"
            //   });
            }
          });
    }
    return (
        <div>
            inv replace
            <button onClick={handleGo} className="btn btn-primary">alert</button>
        </div>
    );
};

export default InvoicesColection;
