import React from "react";
import { ListGroup, Card, Button } from "react-bootstrap";

const ItemTask = (props) => {
  return (
    <div className="">
      <Card
        text="white"
        bg="primary"
        className="mb-2"
        style={{ width: "18rem" }}
      >
        <Card.Header>{props.item.name}</Card.Header>
        <Card.Body>
          <Card.Title> Card Title </Card.Title>
          <Card.Text>{props.item.description}</Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};

export default ItemTask;
