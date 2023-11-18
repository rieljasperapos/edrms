import Logo from '../assets/dentalClinicLogo.png'
const Signup = () => {
    return (
        <>
            <div className='sm:grid sm:grid-cols-2 h-screen'>
                <div className="bg-custom-blue flex justify-center sm:shadow-2xl mb-12 sm:mb-0">
                    <div className='flex justify-center items-center'>
                        <img src={Logo}></img>
                    </div>
                </div>
                <div className='w-auto flex flex-col justify-center mr-16 ml-16 2xl:mr-36 2xl:ml-36'>
                    <h1 className='text-custom-blue text-4xl font-semibold text-center p-10 pt-0'>Signup</h1>
                    <div className='flex justify-center items-center p-4'>
                        <div className='w-full'>
                            <p>Username</p>
                            <input className='border p-2 w-full rounded-lg'></input>
                        </div>
                    </div>
                    <div className='flex justify-center items-center p-4'>
                        <div className='w-full'>
                            <p>Password</p>
                            <input className='border p-2 w-full rounded-lg'></input>
                        </div>
                    </div>
                    <div className='flex flex-col sm:flex-row justify-center items-center p-4'>
                        <div className='w-full sm:mr-4 pb-4 sm:p-0'>
                            <p>First name</p>
                            <input className='border p-2 w-full rounded-lg'></input>
                        </div>
                        <div className='w-full pt-4 sm:p-0'>
                            <p>Last name</p>
                            <input className='border p-2 w-full rounded-lg'></input>
                        </div>
                    </div>
                    <div className='flex flex-col sm:flex-row justify-center items-center p-4'>
                        <div className='w-full sm:mr-4 pb-4 sm:p-0'>
                            <p>Middle name</p>
                            <input className='border p-2 w-full rounded-lg'></input>
                        </div>
                        <div className='w-full pt-4 sm:p-0'>
                            <p>Birth Date</p>
                            <input type="date" className='border p-2 w-full rounded-lg' placeholder='dd / mm / yy'></input>
                        </div>
                    </div>
                    <div className='flex justify-center items-center p-4 mt-16'>
                        <div className='w-full'>
                            <button className='bg-custom-blue hover:bg-opacity-60 transition-transform ease-in text-white p-4 rounded-lg w-full'>Sign up</button>
                            <div className='flex flex-row justify-center mt-4'>
                                <div className='border-b h-2 w-64 mt-2'></div>
                                <p className='text-center ml-4 mr-4'>or</p>
                                <div className='border-b h-2 w-64 mt-2'></div>
                            </div>
                            <div className='flex justify-center items-center p-4'>
                                <p>Already have an account? <span className='text-custom-blue cursor-pointer hover:text-opacity-60 transition-transform ease-in'>Signup</span></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>

    )
}

export default Signup;