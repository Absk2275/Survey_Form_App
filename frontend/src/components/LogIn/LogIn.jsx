// import React, { useState } from "react";
// // import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
// import { BrowserRouter as Router, Route, Link, useHistory } from 'react-router-dom';
// import './LogIn.css'

// function Login() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const history = useHistory();

//   const handleFormSubmit = async (event) => {
//     event.preventDefault();
//     try {
//       const response = await fetch('api/user/login', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({ email, password })
//       });
//       const data = await response.json();
//       if (response.ok) {
//         localStorage.setItem('token', data.message.token);
//         localStorage.setItem('userdetails', JSON.stringify(data.message.userdetails));
//         history.push('/SurveyList');
//       } else {
//         console.log(data.error);
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   }
  
//   return (
//     <div className="main-container">
//       <div className="welcome-container">
//         <h1 className="welcome-header">Survey Page</h1>
//         <h1 className="welcome-text">Best Surveys Will be here</h1>
//         <p className="welcome-info">Sign in to continue access pages</p>
//         <p className="welcome-register"> Don’t Have An Account</p>
//         <Link className="link-btn" to='/'>
//             <button className="register-button">
//               Register
//             </button>
//         </Link>
//       </div>
//         <div className="upon-div">
//         <div className="form-container">
//       <div className="form-header">
//           <h2>Sign In</h2>
//           <p>Sign in to continue access pages</p>
//         </div>
//         <div className="form-body">
//           <form onSubmit={handleFormSubmit}>
//             <label>
//               <input placeholder="email" type="email" name="email" className="email-input" value={email} onChange={(event) => setEmail(event.target.value)} />
//             </label>
//             <br />
//             <label>
//               <input placeholder="password" type="password" name="password" className="password-input" value={password} onChange={(event) => setPassword(event.target.value)} />
//             </label>
//             <br />
//             <button type="submit" id="signin-button">Sign In</button>
//           </form>
//         </div>
//       </div>
//         </div>
//     </div>
//   )
// }

// export default Login;




import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'
import './LogIn.css'

function Login() {
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage]=useState({status:"", message:""});

  
const navigate = useNavigate();

const handleCheckInput=()=>{
  if(email===''){
    alert('Give email')
  }else if(password ===''){
    alert('Give Password')
  }
}

const handleFormSubmit = async (event) => {
  console.log(password, email);
  event.preventDefault();

  try {
    const response = await axios.post('http://localhost:8080/user/login', {
      email,
      password,
    });

    const data = response.data;
    console.log(data)
    

    if (data.status!=="Failed") {
      
      localStorage.setItem('token', data.message.token);
      localStorage.setItem(
        'userdetails',
        JSON.stringify(data.message.userdetails)
      );
      navigate("/survey");

        
    } else {
      const errorMessage = data.message || 'Something went wrong';
        document.getElementById('error-message').textContent = errorMessage;;
      console.log(data.error);
    }
  } catch (error) {
    console.log('I came all the way down');
    console.log(error.message);
    setMessage(error?.response?.data);
   
  }
};


  return (
    <div className="main-container">
      <div className="welcome-container">
        <h1 className="welcome-header">Survey Page</h1>
        <h2 className="welcome-text">Best Surveys Will be here</h2>
        <p className="welcome-info">Sign in to continue access pages</p>
        <p className="welcome-register"> Don’t Have An Account</p>
        <Link className="link-btn" to='/Reg'>
            <button className="register-button">
              Register
            </button>
        </Link>
      </div>
        <div className="upon-div">
        <div className="form-container">
      <div className="form-header">
          <h2>Sign In</h2>
          <p>Sign in to continue access pages</p>
        </div>
        <div className="form-body">
        <div className='error-block'>
            <p id='error-message'  className='error-message'></p>
          </div>
          <form onSubmit={handleFormSubmit}>
            <label>
              <input placeholder="email" type="email" name="email" className="email-input" value={email} onChange={(event) => setEmail(event.target.value)} required/>
            </label>
            <br />
            <label>
              <input placeholder="password" type="password" name="password" className="password-input" value={password} onChange={(event) => setPassword(event.target.value)} required/>
            </label>
            <br />
            <button type="submit" id="signin-button" onClick={handleCheckInput}>Sign In</button>
          </form>
        </div>
      </div>
        </div>
    </div>
  )
}

export default Login;
