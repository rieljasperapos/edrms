function Box({ children }) {
    return (
        <div className="flex items-center h-auto p-4 justify-center ml-64">
            <div className="w-auto h-auto max-h-screen pl-20 pr-20 flex shadow-xl rounded-lg bg-white">
                <div className="p-8 overflow-auto">
                    {children}
                </div>
            </div>
        </div>
    );
}

export default Box;
