
const useDateTime = () => {

    const addedDate = new Date();
    // Format date
    const formattedDate = addedDate.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });
    // Format time
    const formattedTime = addedDate.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    });
    // Combine date and time
    const formattedDateTime = `${formattedDate}, ${formattedTime.toLowerCase()}`;

    return [formattedDateTime];
};

export default useDateTime;