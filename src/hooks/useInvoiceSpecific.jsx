import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useInvoiceSpecific = (invId) => {
    const { loading } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: Invoices = [], isLoading: isInvLoading, refetch } = useQuery({
        queryKey: [invId, 'invoice'],
        enabled: !loading,
        queryFn: async () => {
            const res = await axiosSecure.get(`/invoice?inv=${invId}`);
            return res.data;

        }
    });
    return [Invoices, isInvLoading, refetch,];
};

export default useInvoiceSpecific;