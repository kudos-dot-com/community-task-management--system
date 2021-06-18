import React from "react";
import { Link } from "react-router-dom";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Collapse,
  NavItem,
  NavLink
} from "shards-react";

export default class UserActions extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false
    };

    this.toggleUserActions = this.toggleUserActions.bind(this);
  }

  toggleUserActions() {
    this.setState({
      visible: !this.state.visible
    });
  }

  render() {
    return (
      <NavItem tag={Dropdown} caret toggle={this.toggleUserActions}>
        <DropdownToggle caret tag={NavLink} className="text-nowrap px-3 ">
          {/* <img
            className="user-avatar rounded-circle mr-2"
            src={require("./../../../../images/avatars/0.jpg")}
            alt="User Avatar"
          />{" "} */}
          {/* <i className="fas fa-user-circle " style={{transform:"scale(3)",margin:"5px 5px",padding:"10px"}}></i> */}
        {/* {JSON.parse(localStorage.getItem('user')).pic!==''?
        <img src={JSON.parse(localStorage.getItem('user')).pic} style={{height:"45px",width:"45px",border:"1px solid #fff",borderRadius:"50%"}}/>:
        <i className="fas fa-user-circle " style={{fontSize:"45px",margin:"auto"}}></i>
          } */}
          <span className="d-md-inline-block text-capitalize mt-2">Welcome! {JSON.parse(localStorage.getItem('user')).name}</span>
        </DropdownToggle>
        <Collapse tag={DropdownMenu}  small open={this.state.visible} >
          <DropdownItem tag={Link} to="/dashboard">
            <i className="material-icons">&#xE7FD;</i> Profile
          </DropdownItem>
          <DropdownItem tag={Link} to="edit-user-profile">
            <i className="material-icons">&#xE8B8;</i> Edit Profile
          </DropdownItem>
          <DropdownItem tag={Link} to="file-manager-list">
            <i className="material-icons">&#xE2C7;</i> Files
          </DropdownItem>
          <DropdownItem tag={Link} to="transaction-history">
            <i className="material-icons">&#xE896;</i> Transactions
          </DropdownItem>
          <DropdownItem divider />
          <DropdownItem tag={Link} to="/" className="text-danger">
            <i className="material-icons text-danger">&#xE879;</i> Logout
          </DropdownItem>
        </Collapse>
      </NavItem>
    );
  }
}
