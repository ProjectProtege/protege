import React from 'react';

import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage, useFormik } from "formik";


import 'react-quill/dist/quill.snow.css';




const TestForm = ({ id, label, ...props}) => {
    
    return(
        <Formik 
        initialValues={{email: '', firstName: '', lastName: ''}} 
        validationSchema={Yup.object({
            firstName: Yup.string().max(20, "Must be less than 20 chars").required('Required'),
            lastName: Yup.string().max(20, "Must be less than 20 chars").required('Required'),
            email: Yup.string().email("Invalid email address").required('Required'),
        })}
        onSubmit={(values, { setSubmitting }) => {
            console.log(JSON.stringify(values, null, 2));
        }}
        >
            {formik => (
                <Form onSubmit={formik.handleSubmit}>
                    <label htmlFor='email'>Email:</label>
                    <Field 
                        name="email"
                        id="email"
                        type='email'
                    />
                    <ErrorMessage name='email' />
                    <label htmlFor='firstName'>firstName:</label>
                    <Field
                        name="firstName"
                        id="firstName"
                        type='text'
                    />
                    <ErrorMessage name='firstName' />
                    <label htmlFor='lastName'>lastName:</label>
                    <Field
                        name="lastName"
                        id="lastName"
                        type='text'
                    />
                    <ErrorMessage name='lastName' />
                    <button type="submit">Submit</button>
                </Form>
            )}
        </Formik>
    )
}

export default TestForm