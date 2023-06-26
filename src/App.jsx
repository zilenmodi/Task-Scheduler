import "./App.css";
import { routersConfig, authRoutersConfig } from "./routes/routes";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useSelector } from "react-redux";

function App() {
  const authenticate = useSelector((state) => state.auth.authenticate);
  return (
    <>
      <Router>
        <Routes>
          <>
            {authRoutersConfig.routes.map((route) => {
              return (
                <Route
                  key={route.name}
                  path={route.url}
                  element={
                    !authenticate ? (
                      route.component
                    ) : (
                      <Navigate to="/admin/dashboard" />
                    )
                  }
                />
              );
            })}
          </>
          <>
            <Route path="/" element={<Navigate to="/admin/dashboard" />} />
            {routersConfig.routes.map((route) => {
              return (
                <Route
                  key={route.name}
                  path={route.url}
                  element={
                    authenticate ? route.component : <Navigate to="/login" />
                  }
                />
              );
            })}
          </>
        </Routes>
      </Router>
    </>
  );
}

export default App;
