import "./App.css";
import { routersConfig } from "./routes/routes";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

function App() {
  return (
    <>
      <div className="app-container">
        <Router>
          <Routes>
            <>
              <Route path="/" element={<Navigate to="/admin/dashboard" />} />
              {routersConfig.routes.map((route) => {
                return (
                  <Route
                    key={route.name}
                    path={route.url}
                    element={route.component}
                  />
                );
              })}
            </>
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
