import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useInvoiceAll = () => {

    const { user, loading } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: allInvoices, isLoading: isProductLoading, refetch } = useQuery({
        queryKey: [user?.email, 'invoices'],
        enabled: !loading,
        queryFn: async () => {
            const res = await axiosSecure.get(`/invoices`);
            // console.log(res.data);
            return res.data;

        }
    });
    // console.log(typeof refetch)
    return [allInvoices,  isProductLoading, refetch,];
};

export default useInvoiceAll;