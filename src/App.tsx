import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import Homepage from "./components/Homepage";
import Dashboard, { loader as dashboardLoader } from "./components/Dashboard";
import Playground from "./components/Playground";
import ProtectedRoutes from "./components/ProtectedRoutes";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Homepage />} />
      <Route element={<ProtectedRoutes />}>
        <Route path="/dashboard" element={<Dashboard />} loader={dashboardLoader} />
      </Route>
      <Route path="/playground/:username" element={<Playground />} />
    </>
  )
);

const App = () => {
  return <RouterProvider router={router}></RouterProvider>;
};

export default App;
