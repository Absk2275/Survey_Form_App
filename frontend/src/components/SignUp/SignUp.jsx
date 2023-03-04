import React from 'react';
import { useState } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './SignUp.css'

function SignUp() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    profession: '',
    password: '',
    confirmPassword: '',
    termsAgreed: false,
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  const navigate = useNavigate();
  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: checked,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/user/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (response.status === 200) {
        navigate("/"); // redirect to login page
      } else {
        const error = await response.json();
        const errorMessage = error.message || 'Something went wrong';
        document.getElementById('error-message').textContent = errorMessage;
      }
      // if(response.status === 409){
      //   alert('user already exists')
      // }
    } catch (error) {
      console.log(error)
      document.getElementById('error-message').textContent =
        error.message || 'Something went wrong';
    }
    console.log(formData)
  };

  return (
    <div className='container'>
      <div className='left-container'>
        <h1 className='left-h1-1st'>Welcome MAP Survey</h1>
        <h2 className='left-h1-2nd'>An online platform To create Survey</h2>
        <p className='left-p-1st'>Sign in to continue access pages</p>
        <p className='left-p-2nd'>
          Already Have An Account*{' '}
          <Link to='/' className='left-link'>
            <button>
            Sign In
            </button>
          </Link>
        </p>
      </div>
      <div className='right-container'>
        <div className='right-first-div'>
          <h2>Register</h2>
          <p>Register to continue access pages</p>
        </div>
        <div className='right-second-div'>
        <div className='error-block'>
            <p id='error-message'  className='error-message'></p>
          </div>
          <form onSubmit={handleSubmit}>
            <div className='form-grid-block'>
              <label>
                <input
                  placeholder='Name'
                  type='text'
                  name='name'
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </label>
              <label>
                <input
                  placeholder='email'
                  type='email'
                  name='email'
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </label>
              <label>
                <input
                  placeholder='phone'
                  type='number'
                  name='phone'
                  minLength='10'
                  maxLength='10'
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                />
              </label>
              <label>
                <input
                  placeholder='profession'
                  type='text'
                  name='profession'
                  value={formData.profession}
                  onChange={handleInputChange}
                  required
                />
              </label>
              <label>
                <input
                  placeholder='password'
                  type='password'
                  name='password'
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                />
              </label>
              <label>
                <input
                  placeholder='confirm password'
                  type='password'
                  name='confirmPassword'
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  required
                />
              </label>
            </div>
            <label className='check-box-lable'>
                  <input
                    type='checkbox'
                    name='termsAgreed'
                    checked={formData.termsAgreed}
                    onChange={handleCheckboxChange}
                    required
                  />
                  I agree to the terms and conditions of this website.
                </label>
            <button type='submit' className='btn'>
                Register
              </button>
          </form>
        
        </div>
      </div>
    </div>
  );
}

export default SignUp;