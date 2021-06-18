import React from "react";
import { NavItem, NavLink, Badge, Collapse, DropdownItem } from "shards-react";

export default class Notifications extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false
    };

    this.toggleNotifications = this.toggleNotifications.bind(this);
  }

  toggleNotifications() {
    this.setState({
      visible: !this.state.visible
    });
  }

  render() {
    return (
      <NavItem className="border-right dropdown notifications d-none">
          <p className="mt-3">
          {JSON.parse(localStorage.getItem('user')).name}

          </p>
      </NavItem>
    );
  }
}
