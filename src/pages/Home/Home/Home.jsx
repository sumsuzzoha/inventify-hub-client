import { Helmet } from "react-helmet-async";
import AboutUs from "../../../othersPages/About/About";

const Home = () => {
    return (
        <div>
            <Helmet>
                <title>Inventify Hub | Home</title>
            </Helmet>
            <AboutUs></AboutUs>
        </div>
    );
};

export default Home;