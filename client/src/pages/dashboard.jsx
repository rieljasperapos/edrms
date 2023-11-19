import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
    const[name, setName] = useState('');
    const navigate = useNavigate();

    const handleLogout = () => {
        fetch('http://localhost:3000/signout', {
            credentials: 'include',
        })
        .then(response => {
            if (!response.ok) {
                throw new Error (`Error ${response.status}`);
            }
            return response.json();
        })
        .then((data) => {
            console.log(data);
            navigate('/signin');
        })
    }

    useEffect(() => {
        fetch('http://localhost:3000/dashboard', {
            credentials: 'include',
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error(`Error ${response.status}`);
            }
            return response.json();
        })
        .then((data) => {
            if (data.valid) {
                setName(data.username);
            } else {
                navigate('/signin')
            }
        })
        .catch((err) => {
            console.error(err.message);
        })
    }, [])

    return (
        <>
            <h1>Temporary Dashboard</h1>
            <p>Welcome {name}</p>
            <button onClick={handleLogout}>Log out</button>
        </>
    )
}

export default Dashboard;