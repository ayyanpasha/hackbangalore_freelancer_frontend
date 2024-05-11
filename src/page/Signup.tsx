import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { userDataState } from '../atoms/userDataState';

const Signup: React.FC = () => {
  const [userData, setUserData] = useRecoilState(userDataState);
  const [dataInput, setDataInput] = React.useState({
    email: '',
    password: ''
  });
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    console.log(id, value)
    setDataInput(prevUserData => ({
      ...prevUserData,
      [id]: value
    }));
    console.log(dataInput)
  };

  const handleSignup = async () => {
    try {
        console.log(userData);
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      });

      if (!response.ok) {
        setUserData({
            email: '',
            authToken: '',
            bio: '',
            title: '',
            rate: '',
            loggedIn: false
        })
        throw new Error('Failed to sign up');
      }

      // Optionally, handle response from the server
      const data = await response.json();
      localStorage.setItem('Authorization',data.authToken);

      setUserData({
        email: data.email,
        authToken: data.authToken,
        loggedIn: true,
        bio: data.bio,
        title: data.title,
        rate: data.rate
      })
      
      
      // Redirect to home page upon successful sign-up
      navigate('/');
    } catch (error) {
      console.error('Error signing up:', error);
      // Handle error (e.g., show error message to the user)
    }
  };

  return (
    <div className='container d-flex justify-content-center align-items-center vh-100'>
      <div className='card p-4' style={{ maxWidth: '400px' }}>
      <Link to="/" style={{color: "black", textDecoration: "none"}}><h1 style={{textAlign: "center"}}>Bits2Bytes</h1></Link>
      <h3 style={{color: "#666"}}>Signup</h3>
        <form>
          {/* Email input */}
          <div data-mdb-input-init className="form-outline mb-4">
            <label className="form-label" htmlFor="email">Email address</label>
            <input type="email" id="email" className="form-control" value={dataInput.email} onChange={handleInputChange} />
          </div>

          {/* Password input */}
          <div data-mdb-input-init className="form-outline mb-4">
            <label className="form-label" htmlFor="password">Password</label>
            <input type="password" id="password" className="form-control" value={dataInput.password} onChange={handleInputChange} />
          </div>

          {/* Submit button */}
          <button type="button" className="btn btn-primary btn-block mb-4" onClick={handleSignup}>Sign up</button>

          {/* Login link */}
          <div className="text-center">
            <p>Already have an account? <Link to="/login">Login</Link></p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;