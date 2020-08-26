import React from "react";
import { connect } from "react-redux";
import { Formik } from "formik";
import { Button, Form } from "react-bootstrap";
import { createTask, getTask } from "../../../../store/main/action";
import history from "../../../../shared/history";
import ItemTask from "./itemsTask/itemTask";

class Card extends React.Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }
  componentDidMount() {
    console.log(this.props.match.params.id);
    this.props.getTask(this.props.match.params.id);
  }

  onSubmit = (values, { resetForm }) => {
    values._id = this.props.match.params.id;
    this.props.createTask(values);
    resetForm();
  };

  render() {
    return (
      <div className="">
        {this.props.tasks.length ? (
          <div className="">
            <Formik
              initialValues={{
                name: "",
                description: "",
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
                      placeholder="Name task"
                      className="mr-sm-2"
                      onChange={handleChange}
                    />
                  </Form.Group>

                  <Form.Group controlId="formDescription">
                    <Form.Control
                      value={values.description}
                      name="description"
                      type="text"
                      placeholder="Description"
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

            <h2>ТАСКИ</h2>
            {this.props.tasks.map((item, i) => (
              <ItemTask key={i} item={item} />
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
    tasks: state.main.tasks,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createTask: (values) => dispatch(createTask(values)),
    getTask: (values) => dispatch(getTask(values)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Card);
