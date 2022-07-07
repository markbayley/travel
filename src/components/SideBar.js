import "./Sidebar.css";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Map from "./Map";
import IconButton from "@material-ui/core/IconButton";
import PublicIcon from "@material-ui/icons/Public";
import Tooltip from "@material-ui/core/Tooltip";
import { Typography, Button } from "@material-ui/core";
import { Badge } from "@material-ui/core";

import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";

import { makeStyles, createStyles, withStyles } from "@material-ui/core/styles";
import { green, orange, grey, red } from "@material-ui/core/colors";

const GreenRadio = withStyles({
  root: {
    color: green[400],
    "&$checked": {
      color: green[600],
    },
  },
  checked: {},
})((props) => <Radio color="default" {...props} />);

const OrangeRadio = withStyles({
  root: {
    color: orange[400],
    "&$checked": {
      color: orange[600],
    },
  },
  checked: {},
})((props) => <Radio color="default" {...props} />);

const RedRadio = withStyles({
  root: {
    color: red[400],
    "&$checked": {
      color: red[600],
    },
  },
  checked: {},
})((props) => <Radio color="default" {...props} />);

const GreyRadio = withStyles({
  root: {
    color: grey[400],
    "&$checked": {
      color: grey[600],
    },
  },
  checked: {},
})((props) => <Radio color="default" {...props} />);

export const RadioButtons = ({
  items,
  setFilteredFlags,
  filteredFlags,
  filteredStatus,
  setStatus,
}) => {
  const [value, setValue] = useState("All");
  //   const [filteredStatus, setStatus] = useState("Any");

  const Restricted = items.filter((item) => item?.status?.[0] === "Restricted");
  const Closed = items.filter((item) => item?.status?.[0] === "Closed");
  const Open = items.filter((item) => item?.status?.[0] === "Open");

  const filterAny = () => {
    setStatus("Any");
    setValue("All");
    return setFilteredFlags(items);
  };

  const filterRestricted = () => {
    if (filteredStatus === "Restricted") {
      setStatus("Restricted");
      return setFilteredFlags(items);
    } else {
      setValue("Restricted");
      setStatus("Restricted");

      return setFilteredFlags(Restricted);
    }
  };

  const filterOpen = () => {
    if (filteredStatus === "Open") {
      setStatus("Open");
      return setFilteredFlags(items);
    } else {
      setValue("Open");
      setStatus("Open");

      return setFilteredFlags(Open);
    }
  };

  const filterClosed = () => {
    if (filteredStatus === "Closed") {
      setStatus("Closed");
      return setFilteredFlags(items);
    } else {
      setValue("Closed");
      setStatus("Closed");

      return setFilteredFlags(Closed);
    }
  };

  return (
    <div>
      <Tooltip title="Travel Open" placement="top">
        <FormControlLabel
          control={<GreenRadio />}
          label="Open"
          checked={value === "Open"}
          onChange={filterOpen}
        />
      </Tooltip>
      <Tooltip title="Travel Restricted" placement="top">
        <FormControlLabel
          control={<OrangeRadio />}
          label="Restricted"
          checked={value === "Restricted"}
          onChange={filterRestricted}
        />
      </Tooltip>
      <Tooltip title="Travel Closed" placement="top">
        <FormControlLabel
          control={<RedRadio />}
          label="Closed"
          checked={value === "Closed"}
          onChange={filterClosed}
        />
      </Tooltip>
      <Tooltip title="Any Status" placement="top">
        <FormControlLabel
          control={<GreyRadio />}
          label="All"
          checked={value === "All"}
          onChange={filterAny}
        />
      </Tooltip>
    </div>
  );
};

const Sidebar = ({
  filteredFlags,
  ActivateModal,
  DetailRequest,
  ShowDetail,
  items,
  setFilteredFlags,
}) => {
  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => setSidebar(!sidebar);

  const [filteredStatus, setStatus] = useState("");

  return (
    <nav
      className={sidebar ? "sidebar active" : "sidebar"}
      style={{ marginTop: "-13px" }}
    >
      {/* <button
        className="hamburger"
        type="button"
        onClick={showSidebar}
      ></button> */}
      {/* <div style={{ display: "flex" }}> */}

      {/* <RadioButtons
          items={items}
          setFilteredFlags={setFilteredFlags}
          filteredFlags={filteredFlags}
          filteredStatus={filteredStatus}
          setStatus={setStatus}
        /> */}
      {/* <Tooltip title="View Map" placement="left">
          <Badge
            badgeContent={"Population"}
            color="error"
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
          ></Badge>
        </Tooltip> */}
      {/* </div> */}
      <div>
        <Tooltip title="View Map" placement="left">
          <div
            style={{
              borderLeft: "1px solid #bbb",
              borderBottom: "1px solid #aaa",
              borderTop: "1px solid #aaa",
              backgroundColor: "#fff",
              borderBottomLeftRadius: "15px",
              borderTopLeftRadius: "15px",
              paddingRight: "30px",
              paddingLeft: "5px",
              color: "grey",
              //   boxShadow: "0 0 3px 2px #ddd",
            }}
            button
            // color="orange"
            className="hamburger"
            onClick={showSidebar}
          >
            <PublicIcon style={{ fontSize: 40 }} />
          </div>
        </Tooltip>

        <Map
          onClick={showSidebar}
          filteredFlags={filteredFlags}
          ActivateModal={ActivateModal}
          DetailRequest={DetailRequest}
          ShowDetail={ShowDetail}
          filteredStatus={filteredStatus}
        />
      </div>
    </nav>
  );
};

export default Sidebar;
