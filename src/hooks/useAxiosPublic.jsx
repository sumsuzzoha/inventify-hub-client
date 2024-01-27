import axios from "axios";

const axiosPublic = axios.create({
  baseURL: 'https://inventify-hub-server-ten.vercel.app',
  
  // timeout: 1000,
  // headers: {'X-Custom-Header': 'foobar'}
});

const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;