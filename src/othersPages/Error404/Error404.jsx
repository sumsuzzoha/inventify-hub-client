import { Link } from 'react-router-dom';
import errorImg from '../../assets/error.png'
import { Helmet } from 'react-helmet-async';
const Error404 = () => {
    return (
        <div>
            <Helmet>
                <title>404</title>
            </Helmet>
            <div className=" min-h-screen mx-auto text-center pt-6">
                <img src={errorImg} alt="404 Not Found" className=" max-w-full mx-auto" />
                {/* <h1 className="text-5xl font-bold text-red-500">404</h1> */}
                <p className="text-3xl font-semibold mt-4">Page Not Found</p>
                <p className="text-gray-600 mt-2">Oops! The page you are looking for might be in another dimension.</p>
                <Link to='/'><p className="text-gray-600 link-primary font-semibold btn text-lg mt-4">Return to home</p></Link>
                {/* <p > <a href="/"></a>.</p> */}
            </div>
        </div>
    );
};

export default Error404;
