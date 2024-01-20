import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useInvoiceSpecific = (invId) => {
    const { loading } = useAuth();
    const axiosSecure = useAxiosSecure();
    // console.log(invId);

    const { data: allInvoices =[], isLoading: isInvLoading, refetch } = useQuery({
        queryKey: [invId, 'invoice'],
        enabled: !loading,
        queryFn: async () => {
            const res = await axiosSecure.get(`/invoice?inv=${invId}`);
            // console.log(res.data);
            return res.data;

        }
    });
    // console.log(typeof refetch)
    return [allInvoices,  isInvLoading, refetch,];
};

export default useInvoiceSpecific;