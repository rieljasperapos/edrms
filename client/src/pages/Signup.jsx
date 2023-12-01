import { useState, useEffect } from 'react';
import Logo from '../assets/dentalClinicLogo.png'
import Matched from '../assets/icon-check.png'
import EyeIcon from '../assets/eye-icon.png'

const Signup = () => {
    const [userName, setUserName] = useState('');
    const [userExist, setUserExist] = useState(false);
    const [password, setPassword] = useState('');
    const [validPassword, setValidPassword] = useState(false);
    const [invalidPassword, setInvalidPassword] = useState('');
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

    const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_+={}[\]|;:'"<>?,.\/])[A-Za-z\d!@#$%^&*()\-_+={}[\]|;:'"<>?,.\/]{8,}$/;


    const handleSignup = () => {
        if (!userName || !password || !firstName || !lastName || !middleName || !birthDate) {
            alert("All fields must be filled out");
            return;
        } else if (!validPassword) {
            alert("Enter a valid password");
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
            if (data.valid) {
                alert("Successfully Registered");
            } else {
                setUserExist(true);
                alert("User already exist");
            }
            console.log(data);
        })
        .catch(error => {
            console.error(`Error registering user: ${error.message}`);
        })
    }

    const handleChange = (e) => {
        const newUserName = e.target.value;
        setUserName(newUserName);
        console.log(newUserName);

        fetch(`http://localhost:3000/accounts`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userName: newUserName }),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
            setUserExist(data.exist);
        })
        .catch(error => {
            console.error(`Error registering user: ${error.message}`);
        });
    }

    const validatePassword = (password, confirmPassword) => {
        // I KNOW ITS MESSY HEHE
        if (password === '') {
            setInvalidPassword('');
            setValidPassword(false);
        } else if (password.length < 8) {
            setInvalidPassword(`Invalid Password. Minimum 8 characters required.`);
            setValidPassword(false);
        } else if (!/[A-Z]/.test(password)) {
            setInvalidPassword('Invalid Password. Must contain at least one uppercase character.')
        } else if (!/\d/.test(password)) {
            setInvalidPassword(`Invalid Password. Must contain at least one number (0-9).`);
            setValidPassword(false);
        } else if (!/(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_+={}[\]|;:'"<>?,.\/])[A-Za-z\d!@#$%^&*()\-_+={}[\]|;:'"<>?,.\/]{8,}/.test(password)) {
            setInvalidPassword(`Invalid Password. Must contain at least one special character.`);
            setValidPassword(false);
        } else if (regex.test(password)) {
            console.log('Valid Password');
            setValidPassword(true);
            setInvalidPassword('');
        } else {
            setInvalidPassword('Unexpected error. Please try again.');
            setValidPassword(false);
        }

        setMatchStatus(password === confirmPassword && (password !== '' || confirmPassword !== ''));
    }

    useEffect(() => {
        validatePassword(password, confirmPassword);
    }, [password, confirmPassword]);

    // console.log(matchStatus)

    return (
        <>
            <div className='sm:grid sm:grid-cols-2 h-screen'>
                <div className="bg-custom-blue flex justify-center sm:shadow-2xl mb-12 sm:mb-0 rounded-b-2xl">
                    <div className='flex justify-center items-center'>
                        <img src={Logo}></img>
                    </div>
                </div>
                <div className='w-auto flex flex-col justify-center mr-16 ml-16 2xl:mr-36 2xl:ml-36 pt-8 pb-8'>
                    <h1 className='text-custom-blue text-4xl font-semibold text-center p-10 pt-0'>Signup</h1>
                    <div className='flex justify-center items-center p-4'>
                        <div className='w-full'>
                            <p>Username</p>
                            <input required value={userName} type='text' className='border p-2 w-full rounded-lg' onChange={handleChange}></input>
                            {userExist && (<p className='text-red-500'>Username already exist</p>)}
                        </div>
                    </div>
                    <div className='flex justify-center items-center p-4'>
                        <div className='w-full'>
                            <div className='flex'>
                                <p>Password</p>
                                {(matchStatus && validPassword) && (<img className='h-6 ml-2' src={Matched}></img>)}
                            </div>
                            <div className='relative'>
                                <input
                                    required
                                    value={password}
                                    type={showPassword ? 'text' : 'password'} 
                                    className='border p-2 w-full rounded-lg' 
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                {validPassword || (<p className='text-red-500'>{invalidPassword}</p>)}
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
                                {(matchStatus && validPassword) && (<img className='h-6 ml-2' src={Matched}></img>)}
                            </div>
                            <div className='relative'>
                                <input
                                    required
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
                            <input required value={firstName} type='text' className='border p-2 w-full rounded-lg' onChange={(e) => setFirstName(e.target.value)}></input>
                        </div>
                        <div className='w-full pt-4 sm:p-0'>
                            <p>Last name</p>
                            <input required value={lastName} type='text' className='border p-2 w-full rounded-lg' onChange={(e) => setLastName(e.target.value)}></input>
                        </div>
                    </div>
                    <div className='flex flex-col sm:flex-row justify-center items-center p-4'>
                        <div className='w-full sm:mr-4 pb-4 sm:p-0'>
                            <p>Middle name</p>
                            <input required value={middleName} type='text' className='border p-2 w-full rounded-lg' onChange={(e) => setMiddleName(e.target.value)}></input>
                        </div>
                        <div className='w-full pt-4 sm:p-0'>
                            <p>Birth Date</p>
                            <input required value={birthDate} type="date" className='border p-2 w-full rounded-lg' onChange={(e) => setBirthDate(e.target.value)} placeholder='dd / mm / yy'></input>
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