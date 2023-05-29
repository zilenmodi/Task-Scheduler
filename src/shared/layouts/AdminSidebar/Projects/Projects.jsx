import * as React from "react";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import { Box, Button } from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";
import style from "./style.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteProject,
  fetchProjects,
  updateProject,
} from "../../../../redux/projectsSlice/projectsSlice";
import AddProject from "./AddProject";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Menu from "@mui/material/Menu";
import { useState } from "react";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import DeleteIcon from "@mui/icons-material/Delete";

const Projects = () => {
  const navigate = useNavigate();
  const projects = useSelector((state) => state.projects.projects);
  const status = useSelector((state) => state.projects.status);
  const dispatch = useDispatch();
  const [selectedProjectId, setSelectedProjectId] = useState("");
  const [selectedProjectName, setSelectedProjectName] = useState("");
  const [selectedProjectEvent, setSelectedProjectEvent] = useState("");
  const [anchorElMenu, setAnchorElMenu] = useState(null);
  const [anchorElRenameMenu, setAnchorElRenameMenu] = useState(null);
  const openMenu = Boolean(anchorElMenu);
  const openRenameMenu = Boolean(anchorElRenameMenu);

  const handleDeleteProject = () => {
    dispatch(deleteProject(selectedProjectId));
    handleCloseMenu("deleteClose");
  };

  const handleClickMenu = (id, name, event) => {
    setSelectedProjectId(id);
    setSelectedProjectName(name);
    setSelectedProjectEvent(event.currentTarget);
    setAnchorElMenu(event.currentTarget);
  };

  const handleCloseMenu = (type) => {
    setAnchorElMenu(null);
    if (type === "deleteClose") {
      navigate("/admin/dashboard");
    } else {
      navigate(`/projects/${selectedProjectId}`);
    }
    setSelectedProjectId("");
    setSelectedProjectName("");
    setSelectedProjectEvent("");
  };

  const handleClickRenameMenu = () => {
    setAnchorElMenu(null);
    setAnchorElRenameMenu(selectedProjectEvent);
  };

  const handleRenameBtnClick = () => {
    dispatch(
      updateProject({
        projectId: selectedProjectId,
        projectName:
          selectedProjectName == "" ? "Untitled" : selectedProjectName,
      })
    );
    handleCloseRenameMenu();
  };

  const handleCloseRenameMenu = () => {
    setAnchorElRenameMenu(null);
    setSelectedProjectId("");
    setSelectedProjectName("");
    setSelectedProjectEvent("");
  };

  React.useEffect(() => {
    dispatch(fetchProjects("Zilen Modi"));
  }, []);

  if (status === "pending") {
    return <h1>Loading</h1>;
  }

  return (
    <>
      <AddProject />
      <Box
        sx={{ width: "100%", overflow: "auto" }}
        className={style.projectsList}
      >
        <MenuList>
          {projects?.map((project) => {
            return (
              <NavLink
                key={project.projectId}
                to={`/projects/${project.projectId}`}
                className={({ isActive, isPending }) =>
                  isPending
                    ? "pending"
                    : isActive
                    ? `${style.active} ${style.navlink}`
                    : style.navlink
                }
              >
                <MenuItem
                  sx={{
                    display: "flex",
                    width: "100%",
                    justifyContent: "center",
                    gap: "1rem",
                  }}
                >
                  <ListItemText sx={{ overflow: "hidden" }}>
                    {project.projectName}
                  </ListItemText>
                  <MoreHorizIcon
                    onClick={(e) =>
                      handleClickMenu(project.projectId, project.projectName, e)
                    }
                  />
                </MenuItem>
              </NavLink>
            );
          })}
        </MenuList>
        <Menu
          id="basic-menu"
          anchorEl={anchorElMenu}
          open={openMenu}
          onClose={handleCloseMenu}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <Box sx={{ width: "165px" }} className={style.menuCard_all}>
            <MenuItem onClick={handleClickRenameMenu}>
              <DriveFileRenameOutlineIcon fontSize="small" sx={{ mr: 1 }} />
              Rename
            </MenuItem>
            <MenuItem onClick={handleDeleteProject}>
              <DeleteIcon fontSize="small" sx={{ mr: 1 }} />
              Delete
            </MenuItem>
          </Box>
        </Menu>
        <Menu
          id="basic-menu"
          anchorEl={anchorElRenameMenu}
          open={openRenameMenu}
          onClose={handleCloseRenameMenu}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <Box sx={{ p: 1, display: "flex", gap: "1rem" }}>
            <input
              autoFocus
              id="project-rename"
              name="project-rename"
              value={selectedProjectName}
              onChange={(e) => setSelectedProjectName(e.target.value)}
              className={style.inputField}
            />
            <Button
              variant="contained"
              onClick={handleRenameBtnClick}
              className={style.createBtn}
            >
              Rename
            </Button>
          </Box>
        </Menu>
      </Box>
    </>
  );
};

export default Projects;
