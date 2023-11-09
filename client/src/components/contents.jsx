const Contents = ({ children }) => {
  return (
    <div className="ml-28 flex min-h-screen items-center justify-center">
      <div className="max-h-216 min-h-max w-11/12 overflow-x-auto rounded-lg border bg-white shadow-xl">
        {children}
      </div>
    </div>
  );
};

export default Contents;
