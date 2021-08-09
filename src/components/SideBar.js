import "./Sidebar.css";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Map from "./Map";
import IconButton from "@material-ui/core/IconButton";
import PublicIcon from "@material-ui/icons/Public";
import Tooltip from "@material-ui/core/Tooltip";
import { Typography, Button } from "@material-ui/core";

const Sidebar = ({ filteredFlags }) => {
  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => setSidebar(!sidebar);
  return (
    <nav
      className={sidebar ? "sidebar active" : "sidebar"}
      style={{ marginTop: "7px" }}
    >
      {/* <button
        className="hamburger"
        type="button"
        onClick={showSidebar}
      ></button> */}
      <Tooltip title="View Map" placement="left">
        <Button
          style={{
            borderLeft: "1px solid grey",
            borderBottom: "2px solid lightgrey",
            borderTop: "2px solid lightgrey",
            backgroundColor: "#fff",
            borderBottomLeftRadius: "15px",
            borderTopLeftRadius: "15px",
            paddingRight: "30px", 
            paddingLeft: "20px"
          }}
          button
          color="secondary"
          className="hamburger"
          onClick={showSidebar}
        >
          <PublicIcon style={{ fontSize: 40 }} />
        </Button>
      </Tooltip>

      <Map onClick={showSidebar} filteredFlags={filteredFlags} />
    </nav>
  );
};

export default Sidebar;
