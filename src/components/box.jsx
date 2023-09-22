function Box({ children }) {
    return (
        <div className="flex items-center h-screen justify-center ml-64 p-8"> 
            <div className="w-auto h-auto flex shadow-xl rounded-lg bg-white">
                <div className="p-8">
                    {children}
                </div>
            </div>
        </div>
    )
}

export default Box;