// import React, { useCallback } from "react";
import { Form, Input, Dropdown } from "semantic-ui-react";
import { useFormik } from "formik";
import { Menu } from "../../../../api";
import { useAuth } from "../../../../hooks";
import { initialValues, validationSchema } from "./MenuForm.form";
import "./MenuForm.scss";

const menuController = new Menu();

export function MenuForm(props) {
  const { close, onReload, menu } = props;
  const { accessToken } = useAuth();
  const formik = useFormik({
    initialValues: initialValues(menu),
    validationSchema: validationSchema(menu),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        const data = {
          title: formValue.title,
          path: `${formValue.protocol}${formValue.path}`,
          order: formValue.order, 
          active: formValue.active
        };
        if (!menu) {
          
          await menuController.createMenu(accessToken, data);
        } else {
          data.path = formValue.path;
          await menuController.updateMenu(accessToken, menu._id, data);
        }
        onReload();
        close();
      } catch (error) {
        console.error(error);
      }
    },
  });
  return (
    <Form className="user-form" onSubmit={formik.handleSubmit}>
      <Form.Group widths="equal">
        <Form.Input
          name="title"
          placeholder="Título de menu"
          onChange={formik.handleChange}
          value={formik.values.title}
          error={formik.errors.title}
        />
        <Form.Input
          name="order"
          type="number"
          placeholder="Orden"
          onChange={formik.handleChange}
          value={formik.values.order || 0}
          error={formik.errors.order}
        />
      </Form.Group>
      <Input
        name="path"
        placeholder="URL"
        fluid
        onChange={formik.handleChange}
        value={formik.values.path}
        error={formik.errors.path}
        label={
          !menu ? (
            <Dropdown
              options={options}
              onChange={(_, data) =>
                formik.setFieldValue("protocol", data.value)
              }
              value={formik.values.protocol}
              error={formik.errors.protocol}
            />
          ) : null
        }
      />
      <Form.Group />
      <Form.Button type="submit" primary fluid loading={formik.isSubmitting}>
        {menu ? "Actualizar menu" : "Guardar menu"}
      </Form.Button>
    </Form>
  );
}
const options = [
  { key: "https://", text: "https://", value: "https://" },
  { key: "http://", text: "http://", value: "http://" },
  { key: "/", text: "/", value: "/" },
];
