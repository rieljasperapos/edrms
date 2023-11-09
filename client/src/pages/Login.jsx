import { FaRegUserCircle } from "react-icons/fa";
import { FiLock } from "react-icons/fi";

function Login() {
  return (
    <>
      <div className="mt-24 text-center ">
        <h1 className="font-bold text-5xl">Clam-Pasco Dental Clinic</h1>
        <div className="bg-cyan-600 h-px my-10 mx-96"></div>
      </div>

      <div className="my-10 space-y-4 text-center">
        <h2 className="text-4xl">Login</h2>
        <h3 className="font-bold">ADMIN ACCESS ONLY</h3>
      </div>

      <div className="flex flex-col items-center">
        {/* Username input box */}
        <div className="my-5">
          <div className="relative">
            <FaRegUserCircle
              className="absolute top-1/2 left-4 transform -translate-y-1/2 text-black"
              size={22}
            />
            <input
              className="pl-12 rounded-lg border-2 border-cyan-600 h-12 w-96"
              type="text"
              placeholder="Username"
            />
          </div>
        </div>

        {/* Password input box */}
        <div className="my-5">
          <div className="relative">
            <FiLock
              className="absolute top-1/2 left-4 transform -translate-y-1/2 text-black"
              size={22}
            />
            <input
              className="pl-12 rounded-lg border-2 border-cyan-600 h-12 w-96"
              type="text"
              placeholder="Password"
            />
          </div>
        </div>

        {/* Log in button */}
        <div className="my-5">
          <button className="rounded-lg border-2 h-12 w-96 bg-green-400 hover:bg-green-600 text-white">
            Log in
          </button>
        </div>
      </div>
    </>
  );
}

export default Login;
