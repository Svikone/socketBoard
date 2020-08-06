import React from "react";
import { Formik } from "formik";
import { setLoginData } from "../../../store/auth/login/actions";
import { Button } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { connect } from "react-redux";

const Login = (props) => {
  const onSubmit = (values, { resetForm }) => {
    props.setLoginData(values);
    resetForm({});
  };

  return (
    <div className="">
      <Formik
        initialValues={{
          name: "",
          password: "",
        }}
        validate={(value) => {
          let errors = {};
          if (!value.name) {
            errors.name = "Fill in the name";
          } else if (!/^[a-zA-Z]*$/i.test(value.name)) {
            errors.name = "The name contains incorrect characters";
          }
          if (!value.password) {
            errors.password = "Fill in your password";
          }
          return errors;
        }}
        onSubmit={onSubmit}
      >
        {({ errors, handleSubmit, handleChange, touched, values }) => (
          <Form onSubmit={handleSubmit}>
            <h1>SIGN IN</h1>
            <Form.Group controlId="formName">
              <Form.Label>Имя</Form.Label>
              <Form.Control
                value={values.name}
                name="name"
                type="text"
                placeholder="Name..."
                onChange={handleChange}
              />
            </Form.Group>

            {errors.name && touched.name ? (
              <div className="error">{errors.name}</div>
            ) : null}

            <Form.Group controlId="formPassword">
              <Form.Label>Пароль</Form.Label>
              <Form.Control
                value={values.password}
                name="password"
                type="password"
                placeholder="Password..."
                onChange={handleChange}
              />
            </Form.Group>

            {errors.password && touched.password ? (
              <div className="error">{errors.password}</div>
            ) : null}

            <Button type="submit">Submit</Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    // error: state.login,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setLoginData: (values) => dispatch(setLoginData(values)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
