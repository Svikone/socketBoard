import React from "react";
import { connect } from "react-redux";
import { ListGroup, Card, Button } from "react-bootstrap";
import Item from "./item/item";
import "./friends.scss";

const Friends = (props) => {
  console.log(props.state);
  return (
    <div className="">
      <Card>
        <h2>Возможные друзья</h2>
        <ListGroup variant="flush">
          {/* {props.items.map((item, i) => (
            <Card key={i} item={item} />
          ))} */}
          <Item />
          <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
          <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
        </ListGroup>
      </Card>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    items: state.main.friends.possibleАriends,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Friends);
