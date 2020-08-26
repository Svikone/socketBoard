import React from "react";
import { connect } from "react-redux";
import { ListGroup, Card, Button } from "react-bootstrap";
import Item from "./item/item";
import ItemFriends from "./itemFriends/itemFriend";
import "./friends.scss";
import { getUser, addingToFriendsSuccess } from "../../../store/main/action";

class Friends extends React.Component {
  componentDidMount() {
    this.props.getUser();
    this.props.addingToFriendsSuccess();
  }

  render() {
    return (
      <div className="">
        <Card>
          {this.props.friendRequestItems.length ? (
            <div className="friendsRequest">
              <h2>Возможные друзья</h2>
              <ListGroup variant="flush">
                {this.props.friendRequestItems.map((item, i) => (
                  <Item key={i} item={item} />
                ))}
              </ListGroup>
            </div>
          ) : (
            <h2>Зайавки в друзья отсутствуют</h2>
          )}
          {this.props.friends ? (
            <div className="friends">
              <h2>Ваши друзья</h2>
              <ListGroup variant="flush">
                {this.props.friends.map((item, i) => (
                  <ItemFriends key={i} item={item} />
                ))}
              </ListGroup>
            </div>
          ) : (
            <h2>У вас пока нет друзей</h2>
          )}
        </Card>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    friendRequestItems: state.main.friends,
    friends: state.main.user.friends,
    // test: state.main.friends,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getUser: () => dispatch(getUser()),
    addingToFriendsSuccess: () => dispatch(addingToFriendsSuccess()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Friends);
