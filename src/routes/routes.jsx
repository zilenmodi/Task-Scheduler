import AddProjectContainer from "../containers/AddProjectContainer/AddProjectContainer";
import AddUserContainer from "../containers/AddProjectContainer copy/AddUserContainer";
import AdminDashboardContainer from "../containers/AdminDashboardContainer/AdminDashboardContainer";
import EditProjectContainer from "../containers/EditProjectContainer/EditProjectContainer";
import NotesContainer from "../containers/NotesContainer/NotesContainer";
import ProjectDashboardContainer from "../containers/ProjectDashboardContainer/ProjectDashboardContainer";
import TodaysTaskConatiner from "../containers/TodaysTaskContainer/TodaysTaskConatiner";
import LoginPageContainer from "../shared/containers/LoginPageContainer/LoginPageContainer";
import SignupPageContainer from "../shared/containers/SignupPageContainer/SignupPageContainer";
import {
  ADMIN_DASHBOARD,
  ADMIN_DASHBOARD_URL,
  LOGIN_PAGE,
  LOGIN_PAGE_URL,
  NOTES,
  NOTES_URL,
  PROJECTS_ID,
  PROJECTS_ID_ADD,
  PROJECTS_ID_ADD_URL,
  PROJECTS_ID_EDIT,
  PROJECTS_ID_EDIT_URL,
  PROJECTS_ID_URL,
  SIGN_UP_PAGE,
  SIGN_UP_PAGE_URL,
  TODAYS_TASKS,
  TODAYS_TASKS_URL,
  USERS_ID_ADD,
  USERS_ID_ADD_URL,
  USERS_ID_EDIT,
  USERS_ID_EDIT_URL,
} from "./constant";

export const routersConfig = {
  routes: [
    {
      name: LOGIN_PAGE,
      url: LOGIN_PAGE_URL,
      exact: true,
      component: <LoginPageContainer />,
    },
    {
      name: SIGN_UP_PAGE,
      url: SIGN_UP_PAGE_URL,
      exact: true,
      component: <SignupPageContainer />,
    },
    {
      name: ADMIN_DASHBOARD,
      url: ADMIN_DASHBOARD_URL,
      exact: true,
      component: <AdminDashboardContainer />,
    },
    {
      name: PROJECTS_ID,
      url: PROJECTS_ID_URL,
      exact: true,
      component: <ProjectDashboardContainer />,
    },
    {
      name: PROJECTS_ID_ADD,
      url: PROJECTS_ID_ADD_URL,
      exact: true,
      component: <AddProjectContainer />,
    },
    {
      name: PROJECTS_ID_EDIT,
      url: PROJECTS_ID_EDIT_URL,
      exact: true,
      component: <EditProjectContainer />,
    },
    {
      name: TODAYS_TASKS,
      url: TODAYS_TASKS_URL,
      exact: true,
      component: <TodaysTaskConatiner />,
    },
    {
      name: NOTES,
      url: NOTES_URL,
      exact: true,
      component: <NotesContainer />,
    },
    {
      name: USERS_ID_ADD,
      url: USERS_ID_ADD_URL,
      exact: true,
      component: <AddUserContainer />,
    },
    {
      name: USERS_ID_EDIT,
      url: USERS_ID_EDIT_URL,
      exact: true,
      component: <EditProjectContainer />,
    },
  ],
};
