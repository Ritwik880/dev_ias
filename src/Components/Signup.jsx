import React, { useState } from 'react';

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cPassword, setCPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    if (password !== cPassword) {
      alert("Passwords do not match!");
      return;
    }

    const userData = {
      name: name,
      email: email,
      password: password,
    };

    localStorage.setItem('user', JSON.stringify(userData));

    alert('Signup successful!');
    
    // Close the modal using Bootstrap's JavaScript API
    const modal = document.getElementById('signupModal');
    const bootstrapModal = bootstrap.Modal.getInstance(modal);
    bootstrapModal.hide();

    // Clear form fields
    setName('');
    setEmail('');
    setPassword('');
    setCPassword('');
  };

  return (
    <>
      <button className="btn btn-danger" type="button" data-bs-toggle="modal" data-bs-target="#signupModal">Sign Up</button>

      <div className="modal fade" id="signupModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Signup</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">Name</label>
                  <input type="text" className="form-control" id="name" required value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email address</label>
                  <input type="email" className="form-control" id="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password</label>
                  <input type="password" className="form-control" id="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div className="mb-3">
                  <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                  <input type="password" className="form-control" id="confirmPassword" required value={cPassword} onChange={(e) => setCPassword(e.target.value)} />
                </div>
                <button type="submit" className="btn btn-primary">Signup</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
