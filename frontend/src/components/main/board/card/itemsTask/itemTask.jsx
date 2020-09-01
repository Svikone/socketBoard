import React from "react";
import { ListGroup, Card, Button } from "react-bootstrap";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const ItemTask = (props) => {
  return (
    <Draggable draggableId={props.index + ""} index={props.index}>
      {(provided) => (
        <div
          className=""
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          provided={provided}
        >
          <Card
            text="white"
            bg="primary"
            className="mb-2"
            style={{ width: "18rem" }}
          >
            <Card.Header>{props.item.name}</Card.Header>
            <Card.Body>
              <Card.Text>{props.item.description}</Card.Text>
            </Card.Body>
          </Card>
        </div>
      )}
    </Draggable>
  );
};

export default ItemTask;
