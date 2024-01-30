import React, { FC, useEffect, useState, useRef } from 'react';
import { useFormik } from 'formik';
import './User_Details.scss';
import * as Yup from 'yup';
import userModel from '../../Model/userModel';

interface UserDetailsProps {
   addUser: (userToAdd:userModel) => void;
}

const User_Details: FC<UserDetailsProps> = (props) =>{
  const myFormik = useFormik({
    initialValues: {
      name: "",
      id: 0,
      username: "",
      email: ""
    },
    onSubmit: (valueForm:userModel) => {
      props.addUser(valueForm)
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().required('enter name'),
      id: Yup.number().required('press id'),
      username: Yup.string().required('enter name'),
      email: Yup.string().required('put email').email('wrong email')
    })
  })

  return (
    <div className="form">
      <div className="login-box">
        <h2>Login</h2>
        <form onSubmit={(e) => {
          e.preventDefault();
          myFormik.handleSubmit(e);
        }}>
          <div className="user-box">
            <input type="text" name="name" value={myFormik.values.name} onChange={myFormik.handleChange} className={myFormik.errors.name ? 'form-control is-invalid' : 'form-control'} />
            {myFormik.errors.name ? <small>{myFormik.errors.name}</small> : ''}
            <label>name</label>
          </div>
          <div className="user-box">
            <input type="text" name="id" value={myFormik.values.id} onChange={myFormik.handleChange} className={myFormik.errors.id ? 'form-control is-invalid' : 'form-control'} />
            {myFormik.errors.id ? <small>{myFormik.errors.id}</small> : ''}
            <label>id</label>
          </div>
          <div className="user-box">
            <input type="text" name="username" value={myFormik.values.username} onChange={myFormik.handleChange} className={myFormik.errors.username ? 'form-control is-invalid' : 'form-control'} />
            {myFormik.errors.username ? <small>{myFormik.errors.username}</small> : ''}
            <label>Username</label>
          </div>
          <div className="user-box">
            <input type="text" name="email" value={myFormik.values.email} onChange={myFormik.handleChange} className={myFormik.errors.email ? 'form-control is-invalid' : 'form-control'} />
            {myFormik.errors.email ? <small>{myFormik.errors.email}</small> : ''}
            <label>email</label>
          </div>
          <button type='submit' className='btn btn-warning mt-5'>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            Add User
          </button>
        </form>
      </div>
    </div>
  );
}

export default User_Details;