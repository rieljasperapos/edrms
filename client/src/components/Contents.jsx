const Contents = ({ children }) => {
  return (
    <div className=" ml-28 flex min-h-screen items-center justify-center">
      <div className="h-220 max-h-220 w-11/12 overflow-auto rounded-lg border bg-white shadow-xl">
        {children}
      </div>
    </div>
  );
};

export default Contents;
