import React, { useState } from "react";
import "./Newsletter.scss";
import { Form, Icon, Message } from "semantic-ui-react";
import { useFormik } from "formik";
import { initialValues, validationSchema } from "./Newsletter.form";
import { Newsletter as Newsletterclass } from "../../../../api";
import { ShowHideMessage } from "../../../../components/Shared";

export function Newsletter() {
  const [success, setSuccess] = useState(false);


  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      setSuccess(false);
      try {
        // console.log(formValue.email);
        let newsletterController = new Newsletterclass();
        await newsletterController.createEmail(formValue.email);
        formik.resetForm();
        ShowHideMessage(setSuccess, false)
        setSuccess(true);
      } catch (error) {
        console.error(error);
      }
    },
  });
  return (
    <div className="footer-block">
      <h4>Aprenbe con nosotros!</h4>
      <Form onSubmit={formik.handleSubmit}>
        <Form.Input
          name="email"
          placeholder="tucorreo@dominio.com"
          onChange={formik.handleChange}
          value={formik.values.email}
          error={formik.errors.email}
        />
        <Form.Button type="submit" primary fluid loading={formik.isSubmitting}>
          <Icon name="mail" />
          Me Apunto!
        </Form.Button>
        {success && (
          <Message size="tiny" color="green">
            <Icon name="save"/>¡Email registrado correctamente!
          </Message>
        )}
      </Form>
    </div>
  );
}
