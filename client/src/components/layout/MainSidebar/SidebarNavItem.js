import React,{useState} from "react";
import PropTypes from "prop-types";
import { NavLink as RouteNavLink } from "react-router-dom";
import { NavItem, NavLink } from "shards-react";

function SidebarNavItem ({ item }) { 
  const [user,setuser]=useState(JSON.parse(localStorage.getItem('user')));
  return(
  <NavItem style={{display:user && (user.role===item.user || item.user==='all')?'block':'none'}}>
    <NavLink tag={RouteNavLink} to={item.to}>
      {item.htmlBefore && (
        <div
          className="d-inline-block item-icon-wrapper"
          dangerouslySetInnerHTML={{ __html: item.htmlBefore }}
        />
      )}
      {item.title && <span>{item.title}</span>}
      {item.htmlAfter && (
        <div
          className="d-inline-block item-icon-wrapper"
          dangerouslySetInnerHTML={{ __html: item.htmlAfter }}
        />
      )}
    </NavLink>
  </NavItem>
);
}
SidebarNavItem.propTypes = {
  /**
   * The item object.
   */
  item: PropTypes.object
};

export default SidebarNavItem;
