import React, { useState } from 'react'
import { Form } from "semantic-ui-react";
import "./RegisterForm.scss";
import { useFormik } from "formik";
import { Auth } from "../../../../api"
import { initialValues, validationSchema } from "./RegisterForm.form";

const AuthController = new Auth();

export function RegisterForm(props) {
  const { openLogin } = props
  const [error, setError] = useState("");
  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try{
        console.log(formValue);
        setError("");
        await AuthController.register(formValue);
        openLogin();
      } catch(error) {
        setError("Error al registrar")
      }
    }
  });
  return (
    <Form className='register-form' onSubmit={formik.handleSubmit}>
      <Form.Input name="email" placeholder="Correo@mail.com" onChange={formik.handleChange} value={formik.values.email} error={formik.errors.email} />
      <Form.Input name="password" type='password' placeholder="Contraseña" onChange={formik.handleChange} value={formik.values.password} error={formik.errors.password} />
      <Form.Input name="repeatPassword" type='password' placeholder="Repetir Contraseña" onChange={formik.handleChange} value={formik.values.repeatPassword}  error={formik.errors.repeatPassword}/>
      <Form.Checkbox name='conditionsAccepted' label="He leido y acepto las políticas de privacidad" 
      onChange={(_, data) => formik.setFieldValue("conditionsAccepted", data.checked) } checked={formik.values.conditionsAccepted} error={formik.errors.conditionsAccepted} />
      <Form.Button type='submit' primary fluid loading={formik.isSubmitting} > 
        Crear cuenta
      </Form.Button>
      <p className='register-form__error' >{ error }</p>
    </Form>
  )
}
