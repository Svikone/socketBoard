import React from "react";
import "./board.scss";
import { Accordion, Card, Button, Form } from "react-bootstrap";
import { Formik } from "formik";
import { createBoard, getBoard } from "../../../store/main/action.js";
import { connect } from "react-redux";
import ItemBoard from "./itemsBoard/itemBoard";
import { Link } from "react-router-dom";

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }
  componentDidMount() {
    this.props.getBoard();
  }

  onSubmit(values, { resetForm }) {
    this.props.createBoard(values);
    resetForm({});
  }

  render() {
    return (
      <div className="">
        <Accordion>
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
        {this.props.boards.length ? (
          <div className="">
            <h2>Доски</h2>
            {this.props.boards.map((item, i) => (
              <Link to={`/main/board/${item._id}`} key={i}>
                <ItemBoard key={i} item={item} />
              </Link>
            ))}
          </div>
        ) : (
          <h2>Вы еще не создали доску</h2>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    boards: state.main.board,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createBoard: (data) => dispatch(createBoard(data)),
    getBoard: () => dispatch(getBoard()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Board);
