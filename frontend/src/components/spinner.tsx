const Spinner = () => {
  return (
    <div className="flex items-center justify-center h-screen">
        <div className="w-12 h-12 rounded-full absolute bottom-[45vh]
                        border-4 border-solid border-gray-200"></div>
        <div className="w-12 h-12 rounded-full animate-spin absolute bottom-[45vh]
                        border-4 border-solid border-blue-500 border-t-transparent"></div>
    </div>
  );
};

export default Spinner;