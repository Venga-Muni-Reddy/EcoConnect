import { useState } from "react";
import { useNavigate } from 'react-router-dom';

const Login = ({ onLogin }) => { // onLogin prop from App.js
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(''); // State for login errors
    const navigate = useNavigate(); // For redirection

    const handleSubmit = (e) => {
        e.preventDefault();
        setError(''); // Clear previous errors

        if (onLogin(email, password)) {
            navigate('/dashboard'); // Redirect to dashboard on successful login
        } else {
            setError('Invalid email or password. Please try again.');
        }
    };

    return (
        <div style={{
            border: '2px solid #a3b18a', borderRadius: '10px', textAlign: 'center',
            width: '500px', height: '400px', marginBottom: '100px',
            marginLeft: 'auto', marginRight: 'auto', marginTop: '80px',
            boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
            background: 'linear-gradient(to bottom right, #f0f4f8, #d9e2ec)',
            padding: '20px', display: 'flex', flexDirection: 'column',
            justifyContent: 'center', alignItems: 'center'
        }}>
            <h1 style={{ color: '#34495e', marginBottom: '30px', letterSpacing: '1px' }}>Login Page</h1>
            <form onSubmit={handleSubmit} style={{ width: '80%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <input
                    type="email"
                    className="form-control"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value) }}
                    style={{
                        marginBottom: '15px', width: '100%', padding: '10px 15px',
                        borderRadius: '5px', border: '1px solid #ced4da', fontSize: '1rem',
                        outline: 'none', boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.1)'
                    }}
                />
                <input
                    type="password"
                    className="form-control"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => { setPassword(e.target.value) }}
                    style={{
                        marginBottom: '25px', width: '100%', padding: '10px 15px',
                        borderRadius: '5px', border: '1px solid #ced4da', fontSize: '1rem',
                        outline: 'none', boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.1)'
                    }}
                />
                <button
                    type="submit" // Important: type="submit" for form onSubmit
                    className="btn btn-success"
                    style={{
                        padding: '12px 30px', fontSize: '1.1rem', borderRadius: '25px',
                        backgroundColor: '#28a745', borderColor: '#28a745', color: 'white',
                        cursor: 'pointer', transition: 'background-color 0.3s ease, transform 0.2s ease',
                        boxShadow: '0 4px 8px rgba(40, 167, 69, 0.3)'
                    }}
                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#218838'}
                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#28a745'}
                    onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.98)'}
                    onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1)'}
                >
                    Login
                </button>
                {error && <h4 className="alert-warning" style={{ marginTop: '20px' }}>{error}</h4>}
            </form>
        </div>
    );
}

export default Login;