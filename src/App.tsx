import {
    RouterProvider,
    createBrowserRouter,
    createRoutesFromElements,
    Route,
} from 'react-router-dom';
import Homepage from './pages/Homepage';
import Dashboard, { loader as dashboardLoader } from './pages/Dashboard';
import Playground from './pages/Playground';
import ProtectedRoutes from './utils/ProtectedRoutes';
import { DataProvider } from './utils/DataProvider';

const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path="/" element={<Homepage />} />
            <Route element={<ProtectedRoutes />}>
                <Route
                    path="/dashboard"
                    element={<Dashboard />}
                    loader={dashboardLoader}
                />
            </Route>
            <Route path="/playground/:username" element={<Playground />} />
        </>,
    ),
);

const App = () => {
    return (
        <DataProvider>
            <RouterProvider router={router} />
        </DataProvider>
    );
};

export default App;
