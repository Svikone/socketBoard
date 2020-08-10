import React from "react";
import { Navbar, Nav, Form, FormControl, Button } from "react-bootstrap";
import { Formik } from "formik";
import { connect } from "react-redux";
import { friendRequest, friendRequestSucces } from "../../../store/main/action";

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }
  componentDidMount() {
    this.props.friendRequestSucces();
  }

  onSubmit(values, { resetForm }) {
    this.props.friendRequest(values);
    resetForm({});
  }

  render() {
    return (
      <Navbar bg="primary" variant="dark">
        <Navbar.Brand href="#home">Navbar</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="#home">Home</Nav.Link>
          <Nav.Link href="#features">Features</Nav.Link>
          <Nav.Link href="#pricing">Pricing</Nav.Link>
        </Nav>
        <Formik
          initialValues={{
            name: "",
          }}
          onSubmit={this.onSubmit}
        >
          {({ errors, handleSubmit, handleChange, touched, values }) => (
            <Form inline onSubmit={handleSubmit}>
              <Form.Group controlId="formName">
                <Form.Control
                  value={values.name}
                  name="name"
                  type="text"
                  placeholder="Add as Friend"
                  className="mr-sm-2"
                  onChange={handleChange}
                />
              </Form.Group>

              <Button type="submit" variant="outline-light">
                Add
              </Button>
            </Form>
          )}
        </Formik>
      </Navbar>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    // error: state.login,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    friendRequest: (values) => dispatch(friendRequest(values)),
    friendRequestSucces: () => dispatch(friendRequestSucces()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
