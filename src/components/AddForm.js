import React from 'react';
import { withFormik, Form, Field } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import styled from 'styled-components';
import { Button } from '@smooth-ui/core-sc';
import './AddForm.css';

function AddForm({ values, errors, touched, isSubmitting }) {
  return (
    <FormContainer>
      <Form className='hatch'>
        <div>
          <h1 className='form-text'>Join The Marines</h1>
          <Field type='text' name='name' placeholder='Your Name' />
          {touched.firstName && errors.firstName && (
            <span className='errors'>{errors.firstName}</span>
          )}
        </div>
        <div>
          <Field type='email' name='email' placeholder='Your Email' />
          {touched.email && errors.email && (
            <span className='errors'>{errors.email}</span>
          )}
        </div>
        <div>
          <Field
            type='password'
            name='password'
            placeholder='Enter Your Password'
          />
          {touched.password && errors.password && (
            <span className='errors'>{errors.password}</span>
          )}
        </div>
        <div className='tos'>
          <label>
            <Field type='checkbox' name='tos' />
          </label>
          <span className='tos-text'>I accept the terms of service.</span>
        </div>
        <p>
          {touched.tos && errors.tos && (
            <span className='errors'>{errors.tos}</span>
          )}
        </p>
        <Button className='submit' disabled={isSubmitting}>
          Submit
        </Button>
      </Form>
    </FormContainer>
  );
}

const FormikForm = withFormik({
  mapPropsToValues({ name, email, password, tos }) {
    return {
      name: name || '',
      email: email || '',
      password: password || '',
      tos: tos || false
    };
  },
  validationSchema: Yup.object().shape({
    email: Yup.string()
      .email('Email not valid')
      .required('Email is required'),
    password: Yup.string()
      .min(8, 'Password must be 8 character or longer')
      .required('password is required')
  }),
  handleSubmit: (values, { resetForm, setErrors, setSubmitting }) => {
    if (values.email === 'alreadytaken@atb.dev') {
      setErrors({ email: 'That email is already taken' });
    } else {
      axios
        .post('https://reqres.in/api/users', values)
        .then(res => {
          console.log(res);
          resetForm();
          setSubmitting(false);
        })
        .catch(err => {
          console.log(err);
          setSubmitting(false);
        });
    }
  }
})(AddForm);

export default FormikForm;

const FormContainer = styled.div`
  width: 500vw;
  max-width: 400px;
  margin: 150px 680px;
  padding-top: 6rem;
  form {
    width: 100%;
    background: url('https://avante.biz/wp-content/uploads/Camouflage-Wallpaper/Camouflage-Wallpaper-044.jpg');
    max-width: 500px;
    display: flex;
    flex-direction: column;
    padding: 2rem;
    border: 1px solid black;
    border-radius: 0.25rem;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    div {
    }
    input,
    span {
      display: block;
      width: 95%;
    }
    input {
      margin-top: 1rem;
      padding: 0.5rem;
      border: 1px solid grey;
    }
    span {
      margin-top: 0.25rem;
      text-align: left;
    }
    .tos {
      display: flex;
      justify-content: center;
      align-items: center;
      align-content: center;
      align-text: center;
      margin: 0 auto;
      padding: 1rem 0 0 0;
      label {
        width: 5%;
        display: flex;

        input {
          margin-top: 5px;
        }
      }
      p {
        margin: 0;
        padding: 0;
      }
    }
    button {
      margin-top: 1rem;
      align-self: flex-end;
    }
    .tos-text {
      color: #fff;
      margin-left: 0px;
    }

    .form-text {
      text-align: center;
      color: #fff;
    }

    .errors {
      font-size: 0.9rem;
      color: #a9412d;
    }
  }
`;
