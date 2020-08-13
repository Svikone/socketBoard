import React from "react";
import { connect } from "react-redux";
import { ListGroup, Card, Button } from "react-bootstrap";
import "./item.scss";

const Item = (props) => {
  return (
    <div className="">
      <ListGroup.Item>
        <div>
          <span>vo</span> хочет добавить вас в друзья
        </div>
        <div className="btnContainer">
          <Button type="submit" variant="primary">
            Добавить
          </Button>
          <Button type="submit" variant="danger">
            Отклонить
          </Button>
        </div>
      </ListGroup.Item>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {};
};
export default connect(null, mapDispatchToProps)(Item);
