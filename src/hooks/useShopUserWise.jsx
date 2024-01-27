import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useShopUserWise = () => {
    const {user, loading } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: shop =[], isLoading: isShopLoading, refetch } = useQuery({
        queryKey: [user?.email, 'shop'],
        enabled: !loading,
        queryFn: async () => {
            const res = await axiosSecure.get(`/shop?employee=${user.email}`);
            return res.data;

        }
    });
    return [shop,  isShopLoading, refetch,];
};

export default useShopUserWise;