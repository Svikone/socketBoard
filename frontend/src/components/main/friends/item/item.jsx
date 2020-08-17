import React from "react";
import { connect } from "react-redux";
import { ListGroup, Card, Button } from "react-bootstrap";
import "./item.scss";
import { addingToFriends } from "../../../../store/main/action";

const Item = (props) => {
  console.log(props);
  return (
    <div className="">
      <ListGroup.Item>
        <div>
          <span>{props.item.name}</span> хочет добавить вас в друзья
        </div>
        <div className="btnContainer">
          <Button
            variant="primary"
            onClick={() =>
              props.addingToFriends(true, props.item.friendWhoAppliedId)
            }
          >
            Добавить
          </Button>
          <Button
            variant="danger"
            onClick={() =>
              props.addingToFriends(false, props.item.friendWhoAppliedId)
            }
          >
            Отклонить
          </Button>
        </div>
      </ListGroup.Item>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    addingToFriends: (value, id) => dispatch(addingToFriends(value, id)),
  };
};
export default connect(null, mapDispatchToProps)(Item);
