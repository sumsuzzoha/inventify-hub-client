import PropTypes from 'prop-types';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const CandidateCard = ({ data, refetch }) => {
    const { _id, candidateName, candidateEmail, candidateAddress, joinReason, joinPost, selectedShopName, selectedShopId, requests, candidateImage } = data;
    const axiosSecure = useAxiosSecure();



    const handleReqApprove = (selectedShopId) => {
        const approvedReqInfo = {
            _id: _id,
            candidateEmail: candidateEmail,
            selectedShopId: selectedShopId,
            selectedShopName: selectedShopName,
            joinPost: joinPost,

        }
        Swal.fire({
            title: "Are you sure?",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Approved"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.patch('/approvedReq', approvedReqInfo)
                    .then(res => {
                        if (res.data.modifiedCount > 0) {
                            Swal.fire({
                                title: "Approved!",
                                text: "Joining request has been approved.",
                                icon: "success"
                            });
                            refetch();

                        }
                        Swal.fire({
                            title: "Failed!",
                            text: "Contact to It Dept.",
                            icon: "error"
                        });
                        refetch();
                    })
                    .catch(() => {
                        Swal.fire({
                            title: "Failed!",
                            text: "Contact to It Dept.",
                            icon: "error"
                        });
                    });
            }
        });

    }
    return (
        <div className="bg-base-200 rounded shadow p-6 w-full max-w-md mx-auto space-y-1 h-[530px] flex flex-col">
            <div className="relative mb-4">
                <img
                    src={candidateImage}
                    alt={`${candidateName}'s image`}
                    className="w-16 h-16 object-cover rounded-2xl mx-auto"
                />
            </div>
            <h2 className="text-xl font-semibold mb-4">{candidateName}</h2>
            <p className=" font-semibold text-lg text-start">Email: <span className='text-base font-normal'>{candidateEmail}</span></p>
            <p className=" font-semibold text-lg text-start flex-grow">Address: <span className='text-base font-normal'>{candidateAddress}</span></p>
            <div className=" font-semibold text-lg text-start   text-start">
                Join Reason:
                <p className="text-base font-normal h-24 border p-2 overflow-y-auto">{joinReason}</p>
            </div>
            <p className=" font-semibold text-lg text-start">Join Post: <span className='text-base font-semibold'>{joinPost}</span></p>
            <p className=" font-semibold text-lg text-start">Shop Name: <span className='text-base font-normal'>{selectedShopName}</span></p>
            <p className=" font-semibold text-lg text-start">Shop ID: <span className='text-base font-normal'>{selectedShopId}</span></p>
            <p className=" font-semibold text-lg text-start">Requests: <span className='text-base font-normal'>{requests}</span></p>
            <button onClick={() => handleReqApprove(_id)} className='btn btn-sm btn-accent w-6/12 mx-auto'>Approve</button>

        </div>
    );
};

CandidateCard.propTypes = {
    data: PropTypes.object,
    refetch: PropTypes.func
};
export default CandidateCard;
