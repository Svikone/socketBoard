import React from "react";
import { ListGroup, Card, Button } from "react-bootstrap";

const ItemFriend = (props) => {
  return (
    <div className="">
      <ListGroup.Item>
        <div>{props.item.name}</div>
      </ListGroup.Item>
    </div>
  );
};

export default ItemFriend;
