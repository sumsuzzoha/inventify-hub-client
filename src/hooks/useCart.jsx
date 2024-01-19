import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useCart = () => {
    const { user, loading } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: cartItems, isLoading: isProductLoading, refetch } = useQuery({
        queryKey: [user?.email, 'products'],
        enabled: !loading,
        queryFn: async () => {
            // console.log(user.email);
            const res = await axiosSecure.get(`/carts`);
            // console.log(res.data);
            return res.data;

        }
    });
    // console.log(typeof refetch)
    return [cartItems,  isProductLoading, refetch,];

};

export default useCart;