function Box({ children }) {
    return (
        <div className="flex items-center p-4 justify-center ml-64">
            <div className="w-auto h-auto max-h-screen overflow-y-auto pl-20 pr-20 flex shadow-xl rounded-lg bg-white">
                <div className="p-8">
                    {children}
                </div>
            </div>
        </div>
    );
}

export default Box;
