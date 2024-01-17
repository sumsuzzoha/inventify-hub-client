import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useProduct = () => {
    const { user, loading } = useAuth();
    const axiosSecure = useAxiosSecure();

        const { data: products, isLoading: isProductLoading } = useQuery({
        queryKey: [user?.email, 'products'],
        enabled: !loading,
        queryFn: async () => {
            // console.log(user.email);
            const res = await axiosSecure.get(`/products/${user.email}`);
            // console.log(res.data);
            return res.data;

        }
    });
    return [products, isProductLoading];

};

export default useProduct;