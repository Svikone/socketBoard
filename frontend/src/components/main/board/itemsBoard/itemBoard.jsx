import React from "react";
import { ListGroup, Card, Button } from "react-bootstrap";

const ItemBoard = (props) => {
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
          <Card.Text>
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};

export default ItemBoard;
