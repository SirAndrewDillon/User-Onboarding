import React, { useState } from 'react';
import { withFormik, Form, Field } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import styled from 'styled-components';
import { Button } from '@smooth-ui/core-sc';

function OnboardForm({ errors, touched, isSubmitting }) {
  return (
    <FormContainer>
      <Form>
        <div>
          <Field type='text' name='firstName' placeholder='First Name' />
          {touched.firstName && errors.firstName && (
            <span className='errors'>{errors.firstName}</span>
          )}
        </div>
        <div>
          <Field type='text' name='lastName' placeholder='Last Name' />
          {touched.lastName && errors.lastName && (
            <span className='errors'>{errors.lastName}</span>
          )}
        </div>
        <div>
          <Field type='email' name='email' placeholder='Email' />
          {touched.email && errors.email && (
            <span className='errors'>{errors.email}</span>
          )}
        </div>
        <div>
          <Field type='password' name='password' placeholder='Password' />
          {touched.password && errors.password && (
            <span className='errors'>{errors.password}</span>
          )}
        </div>
        <div className='tos'>
          <label>
            <Field type='checkbox' name='tos' />
          </label>
          <span>I accept the terms of service.</span>
        </div>
        <p>
          {touched.tos && errors.tos && (
            <span className='errors'>{errors.tos}</span>
          )}
        </p>
        <Button disabled={isSubmitting}>Submit</Button>
      </Form>
    </FormContainer>
  );
}

const FormikForm = withFormik({
  mapPropsToValues({ firstName, lastName, email, password, tos }) {
    return {
      firstName: firstName || '',
      lastName: lastName || '',
      email: email || '',
      password: password || '',
      tos: tos || ''
    };
  },

  //=================== START FORM VALIDATION ======================
  validationSchema: Yup.object().shape({
    firstName: Yup.string()
      .required('First name is required.')
      .min(2, 'First name is required.'),
    lastName: Yup.string()
      .required('Last name is required.')
      .min(2, 'Last name is required.'),
    email: Yup.string()
      .required('Email is required.')
      .email('Email is not valid.'),
    password: Yup.string()
      .required('Password is required.')
      .min(8, 'Password must be at least 8 characters.'),
    tos: Yup.boolean()
      .oneOf([true], 'Please accept the TOS.')
      .required('Please accept the TOS.')
  }),
  //==================== END FORM VALIDATION =================

  handleSubmit(values, { resetForm, setErrors, setSubmitting }) {
    axios
      .post('https://reqres.in/api/users', values)
      .then(res => {
        alert(JSON.stringify(res.data));
        resetForm();
        setSubmitting(false);
      })
      .catch(err => {
        console.log(err);
        setSubmitting(false);
      });
  }
})(OnboardForm);

export default FormikForm;

const FormContainer = styled.div`
  width: 500vw;
  max-width: 400px;
  margin: 0 auto;

  form {
    width: 100%;
    max-width: 400px;
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
      justify-content: left;
      align-items: center;
      align-content: center;
      margin: 0 0 -1rem 0;
      padding: 1rem 0 0 0;

      label {
        width: 5%;
        display: flex;
        margin-right: 0.5rem;
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
    .errors {
      font-size: 0.9rem;
      color: #a9412d;
    }
  }
`;
