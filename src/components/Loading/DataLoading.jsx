import { FadeLoader } from "react-spinners";

const DataLoading = () => {
    return (
        <div className="min-h-screen w-full mx-auto text-center mt-20">
            <FadeLoader color="rgba(54, 215, 183, 1)" speedMultiplier={1} />
        </div>
    );
};

export default DataLoading;