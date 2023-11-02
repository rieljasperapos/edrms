const Contents = ({children}) => {
    return (
        <div className="ml-28 flex h-screen justify-center items-center">
            <div className="w-11/12 overflow-x-auto border bg-white h-95 rounded-lg shadow-xl">
                {children}
            </div>
        </div>
    )
}

export default Contents;
