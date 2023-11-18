import { useState, useEffect } from 'react';
import Logo from '../assets/dentalClinicLogo.png'
import Matched from '../assets/icon-check.png'
import EyeIcon from '../assets/eye-icon.png'

const Signup = () => {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [matchStatus, setMatchStatus] = useState(false);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [middleName, setMiddleName] = useState('');
    const [birthDate, setBirthDate] = useState('');

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    }

    const handleSignup = () => {
        if (!userName || !password || !firstName || !lastName || !middleName || !birthDate) {
            alert("All fields must be filled out");
            return;
        }

        fetch(`http://localhost:3000/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({userName, password, firstName, lastName, middleName, birthDate}),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            alert("Successfully Registered");
            console.log(data);
        })
        .catch(error => {
            console.error(`Error registering user: ${error.message}`);
        })
    }

    useEffect(() => {
        if (password === confirmPassword && (password != '' || confirmPassword != '')) {
            setMatchStatus(true);
        } else {
            setMatchStatus(false);
        }
    }, [password, confirmPassword]);

    // console.log(matchStatus)

    return (
        <>
            <div className='sm:grid sm:grid-cols-2 h-screen'>
                <div className="bg-custom-blue flex justify-center sm:shadow-2xl mb-12 sm:mb-0">
                    <div className='flex justify-center items-center'>
                        <img src={Logo}></img>
                    </div>
                </div>
                <div className='w-auto flex flex-col justify-center mr-16 ml-16 2xl:mr-36 2xl:ml-36 pt-8 pb-8'>
                    <h1 className='text-custom-blue text-4xl font-semibold text-center p-10 pt-0'>Signup</h1>
                    <div className='flex justify-center items-center p-4'>
                        <div className='w-full'>
                            <p>Username</p>
                            <input value={userName} type='text' className='border p-2 w-full rounded-lg' onChange={(e) => setUserName(e.target.value)}></input>
                        </div>
                    </div>
                    <div className='flex justify-center items-center p-4'>
                        <div className='w-full'>
                            <div className='flex'>
                                <p>Password</p>
                                {matchStatus && (<img className='h-6 ml-2' src={Matched}></img>)}
                            </div>
                            <div className='relative'>
                                <input
                                    value={password}
                                    type={showPassword ? 'text' : 'password'} 
                                    className='border p-2 w-full rounded-lg' 
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <div className='absolute top-2.5 right-4 cursor-pointer' onClick={togglePasswordVisibility}>
                                    <img className='h-5' src={EyeIcon} alt={showPassword ? 'Hide' : 'Show'} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='flex justify-center items-center p-4'>
                        <div className='w-full'>
                            <div className='flex'>
                                <p>Confirm Password</p>
                                {matchStatus && (<img className='h-6 ml-2' src={Matched}></img>)}
                            </div>
                            <div className='relative'>
                                <input
                                    value={confirmPassword}
                                    type={showPassword ? 'text' : 'password'} 
                                    className='border p-2 w-full rounded-lg' 
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                                <div className='absolute top-2.5 right-4 cursor-pointer' onClick={togglePasswordVisibility}>
                                        <img className='h-5' src={EyeIcon} alt={showPassword ? 'Hide' : 'Show'} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-col sm:flex-row justify-center items-center p-4'>
                        <div className='w-full sm:mr-4 pb-4 sm:p-0'>
                            <p>First name</p>
                            <input value={firstName} type='text' className='border p-2 w-full rounded-lg' onChange={(e) => setFirstName(e.target.value)}></input>
                        </div>
                        <div className='w-full pt-4 sm:p-0'>
                            <p>Last name</p>
                            <input value={lastName} type='text' className='border p-2 w-full rounded-lg' onChange={(e) => setLastName(e.target.value)}></input>
                        </div>
                    </div>
                    <div className='flex flex-col sm:flex-row justify-center items-center p-4'>
                        <div className='w-full sm:mr-4 pb-4 sm:p-0'>
                            <p>Middle name</p>
                            <input value={middleName} type='text' className='border p-2 w-full rounded-lg' onChange={(e) => setMiddleName(e.target.value)}></input>
                        </div>
                        <div className='w-full pt-4 sm:p-0'>
                            <p>Birth Date</p>
                            <input value={birthDate} type="date" className='border p-2 w-full rounded-lg' onChange={(e) => setBirthDate(e.target.value)} placeholder='dd / mm / yy'></input>
                        </div>
                    </div>
                    <div className='flex justify-center items-center p-4 mt-16'>
                        <div className='w-full'>
                            <button className='bg-custom-blue hover:bg-opacity-60 transition-transform ease-in text-white p-4 rounded-lg w-full' onClick={handleSignup}>Sign up</button>
                            <div className='flex flex-row justify-center mt-4'>
                                <div className='border-b h-2 w-64 mt-2'></div>
                                <p className='text-center ml-4 mr-4'>or</p>
                                <div className='border-b h-2 w-64 mt-2'></div>
                            </div>
                            <div className='flex justify-center items-center p-4'>
                                <p>Already have an account? <span className='text-custom-blue cursor-pointer hover:text-opacity-60 transition-transform ease-in'>Sign in</span></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>

    )
}

export default Signup;