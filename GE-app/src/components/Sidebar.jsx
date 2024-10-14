import React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import classes from "./Sidebar.module.css";
import { NavLink } from "react-router-dom";

export default function Sidebar() {
  const [open, setOpen] = useState(false);

  const toggleSidebar = (newOpen) => () => {
    setOpen(newOpen);
  };

  const SidebarList = (
    <Box sx={{ width: 224 }} role="presentation" onClick={toggleSidebar(false)}>
      <List>
        <Button sx={{paddingTop:2, marginLeft: 20, paddingBottom: 2 }} onClick={toggleSidebar(false)}>
          <img src="/times.svg" alt="Close sidebar" />
        </Button>
        <ul className={classes["links-sidebar"]}>
          <li>
            <NavLink  
              to="/"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/userprofile"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              User Profile
            </NavLink>
          </li>
        </ul>
      </List>
    </Box>
  );

  return (
    <div>
      <Button onClick={toggleSidebar(true)}>
        <img width="25" height="25" src="/hamburger.svg" />
      </Button>
      <Drawer open={open} onClose={toggleSidebar(false)}>
        {SidebarList}
      </Drawer>
    </div>
  );
}
