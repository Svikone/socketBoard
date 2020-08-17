import React from "react";
import "./board.scss";
import { Accordion, Card, Button, Form } from "react-bootstrap";
import { Formik } from "formik";
import { createBoard } from "../../../store/main/action.js";
import { connect } from "react-redux";

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }
  componentDidMount() {}

  onSubmit(values, { resetForm }) {
    this.props.createBoard(values);
    resetForm({});
  }

  render() {
    return (
      <div className="">
        <Accordion defaultActiveKey="0">
          <Card>
            <Card.Header>
              <Accordion.Toggle as={Button} variant="link" eventKey="1">
                <div className="addBoard">
                  <span>+</span> Create board
                </div>
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey="1">
              <Card.Body>
                <Formik
                  initialValues={{
                    name: "",
                  }}
                  onSubmit={this.onSubmit}
                >
                  {({
                    errors,
                    handleSubmit,
                    handleChange,
                    touched,
                    values,
                  }) => (
                    <Form inline onSubmit={handleSubmit}>
                      <Form.Group controlId="formName">
                        <Form.Control
                          value={values.name}
                          name="name"
                          type="text"
                          placeholder="Name board"
                          className="mr-sm-2"
                          onChange={handleChange}
                        />
                      </Form.Group>

                      <Button type="submit" variant="primary">
                        Add
                      </Button>
                    </Form>
                  )}
                </Formik>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    createBoard: (data) => dispatch(createBoard(data)),
  };
};

export default connect(null, mapDispatchToProps)(Board);
