import React, { useState, useContext } from 'react';
// import { ModalContext } from '../context/ModalContext';
import { doLogin } from '../auth';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = ({ onLogin }) => {
    // const {isLoginModalOpen, hideLoginModal} = useContext(ModalContext)
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        if(email.trim() == '' || password.trim() == ''){
            toast.error('Please fill in all fields');
            return
        }

        const storedUser = JSON.parse(localStorage.getItem('user'));

        if (storedUser && storedUser.email === email && storedUser.password === password) {
            alert('Login successful!');
            doLogin(storedUser, ()=>{
                console.log('data is saved to localstorage');
                
            })
            onLogin(storedUser);

            const modal = document.getElementById('exampleModal');
            const bootstrapModal = bootstrap.Modal.getInstance(modal);
            bootstrapModal.hide();

            setEmail('');
            setPassword('');
        } else {
            toast.error('User does not exist or incorrect credentials. Please sign up.');
            setEmail('');
            setPassword('')
        }
    };
    return (
        <>
            <button className="btn btn-danger mx-2" type="button" data-bs-toggle="modal" data-bs-target="#exampleModal">Login</button>
            {/* <div className={`modal fade ${isLoginModalOpen ? 'show': ''}`} id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" style={{display: isLoginModalOpen ? 'block' : 'none'}}> */}
            <div className={`modal fade`} id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel">
            <ToastContainer autoClose={1000}/>
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Login</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={email} onChange={(e) => setEmail(e.target.value)} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                                    <input type="password" className="form-control" id="exampleInputPassword1" value={password} onChange={(e) => setPassword(e.target.value)} />
                                </div>
                                <button type="submit" className="btn btn-primary">Login</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login