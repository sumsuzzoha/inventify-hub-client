import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useShop = () => {
    const {user, loading } = useAuth();
    const axiosSecure = useAxiosSecure();
    // console.log(invId);

    const { data: shop =[], isLoading: isShopLoading, refetch } = useQuery({
        queryKey: [user?.email, 'shop'],
        enabled: !loading,
        queryFn: async () => {
            const res = await axiosSecure.get(`/shop?employe=${user.email}`);
            // console.log(res.data);
            return res.data;

        }
    });
    // console.log(typeof refetch)
    return [shop,  isShopLoading, refetch,];
};

export default useShop;