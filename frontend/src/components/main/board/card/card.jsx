import React from "react";
import { connect } from "react-redux";
import { Formik } from "formik";
import { Button, Form } from "react-bootstrap";
import * as actions from "../../../../store/main/action";
import history from "../../../../shared/history";
import ItemTask from "./itemsTask/itemTask";
import "./card.scss";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

class Card extends React.Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }
  componentDidMount() {
    this.props.connectToBoard(this.props.match.params.id);
  }

  onSubmit = (values, { resetForm }) => {
    values._id = this.props.match.params.id;
    this.props.createTask(values);
    resetForm();
  };

  onDragEnd = (result) => {
    const { destination, source, reason } = result;
    const droppedTasks = this.props.tasks[source.index];

    console.log(result);
    if (!destination || reason === "CANCEL") {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }
    if (source.droppableId != destination.droppableId) {
      this.props.tasks[source.index].state = destination.droppableId;
      this.props.tasks.splice(source.index, 1);
      this.props.tasks.splice(destination.index, 0, droppedTasks);
      this.props.socketMove(this.props.match.params.id, this.props.tasks);
      return;
    }
    this.props.tasks.splice(source.index, 1);
    this.props.tasks.splice(destination.index, 0, droppedTasks);
    this.props.socketMove(this.props.match.params.id, this.props.tasks);
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
            <div className="container">
              <DragDropContext onDragEnd={this.onDragEnd}>
                {this.props.stateTasks.map((item, i) => (
                  <div className="card closed" key={i}>
                    <div className="title green">{item}</div>
                    <Droppable droppableId={item + ""}>
                      {(provided) => (
                        <div
                          {...provided.draggableProps}
                          provided={provided}
                          {...provided.dragHandleProps}
                          ref={provided.innerRef}
                        >
                          {this.props.tasks.map((item2, i) =>
                            item2.state === item ? (
                              <ItemTask key={i} index={i} item={item2} />
                            ) : null
                          )}
                          {provided.placeholder}
                        </div>
                      )}
                    </Droppable>
                  </div>
                ))}
              </DragDropContext>
            </div>
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
    tasks: state.main.selectedBoard.tasks,
    stateTasks: state.main.selectedBoard.state,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createTask: (values) => dispatch(actions.createTask(values)),
    connectToBoard: (values) => dispatch(actions.connectToBoard(values)),
    socketMove: (boardId, tasks) =>
      dispatch(actions.socketMove(boardId, tasks)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Card);
