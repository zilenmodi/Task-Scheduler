import * as React from "react";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";
import { NavLink } from "react-router-dom";
import style from "./style.module.css";

const Navbar = (props) => {
  const { sidebarOptions } = props;
  return (
    <>
      <Box sx={{ width: "100%", mb: 4 }}>
        <MenuList>
          <NavLink
            key={"dashboard"}
            to={"/admin/dashboard"}
            className={({ isActive, isPending }) =>
              isPending
                ? "pending"
                : isActive
                ? `${style.active} ${style.navlink}`
                : style.navlink
            }
          >
            <MenuItem>
              <ListItemText>Dashboard</ListItemText>
            </MenuItem>
          </NavLink>
          <NavLink
            key={"todays-tasks"}
            to={"/todays-tasks"}
            className={({ isActive, isPending }) =>
              isPending
                ? "pending"
                : isActive
                ? `${style.active} ${style.navlink}`
                : style.navlink
            }
          >
            <MenuItem>
              <ListItemText>Today's Tasks</ListItemText>
            </MenuItem>
          </NavLink>
        </MenuList>
      </Box>
    </>
  );
};

export default Navbar;
