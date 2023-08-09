import React, {useState} from 'react'
import bgImg from '../assest/img1.jpg'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

function Form() {
    const fieldInput = {uname: "", email: ""}
    const [input, setInput] = useState(fieldInput)
    const [login, setLogin] = useState(null)

    const handleChange = (e) => {
        setInput({...input, [e.target.name]: e.target.value})
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.get("https://jsonplaceholder.typicode.com/users")
        .then((res)=> {
            const users = res.data
            const {uname, email} = input
            const userFind = users.find(user => (user.username === uname && user.email === email))
            setLogin(userFind ? "Login SUccessfull" : "Login Failed")
            if(userFind){
              setLogin("Login Successful")
              toast.success("Login successfull", {
                position: 'top-center'
              })
            }
            else{
              setLogin(null)
              toast.error("Username or Email is incorrect",{
                position: 'top-center'
              })
            }
          })
          .catch((error)=> {
            setLogin(null)
          })
        }
  return (
    <>
    {/* {login ? (
      <section>
        <h1>You are logged in</h1><br/>
        <p><a href="#">Go to Home</a></p>
      </section>
    ): */}
    (
    <section>
        <div className="register">
            <div className="col-1">
                <h1>Login</h1>
                <span>Login and Enjoy the services</span>

                <form id='form' className='flex flex-col'>
                    <input type="text" name='uname' value={input.uname} onChange={handleChange} placeholder='Enter Username' />
                    <input type="text" name='email' value={input.email} onChange={handleChange} placeholder='Enter email' />
                    <button className='btn' onClick={handleSubmit}>Login</button>
                    <h3>OR</h3>
                    <button className='btn' >Sign Up</button>
                    <img src="images/logogoogle.png" alt="asdad" className='google' />
                    <ToastContainer/>
                </form>

            </div>
            <div className="col-2">
                <img src={bgImg} />
            </div>
        </div>
    </section>
    
    </>
  )
}

export default Form
