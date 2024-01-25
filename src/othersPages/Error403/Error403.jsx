
const Error403 = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-4">Forbidden Access</h1>
      <p className="text-lg text-gray-600">Sorry, the page you are looking for does not exist or you do not have permission to access it.</p>
    </div>
  );
};

export default Error403;
