import AdminDashboardContainer from "../containers/AdminDashboardContainer/AdminDashboardContainer";
import ProjectDashboardContainer from "../containers/ProjectDashboardContainer/ProjectDashboardContainer";
import TodaysTaskConatiner from "../containers/TodaysTaskContainer/TodaysTaskConatiner";
import LoginPageContainer from "../shared/containers/LoginPageContainer/LoginPageContainer";
import SignupPageContainer from "../shared/containers/SignupPageContainer/SignupPageContainer";
import {
  ADMIN_DASHBOARD,
  ADMIN_DASHBOARD_URL,
  LOGIN_PAGE,
  LOGIN_PAGE_URL,
  PROJECTS_ID,
  PROJECTS_ID_URL,
  SIGN_UP_PAGE,
  SIGN_UP_PAGE_URL,
  TODAYS_TASKS,
  TODAYS_TASKS_URL,
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
      name: TODAYS_TASKS,
      url: TODAYS_TASKS_URL,
      exact: true,
      component: <TodaysTaskConatiner />,
    },
  ],
};
