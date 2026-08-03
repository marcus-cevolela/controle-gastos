import { createBrowserRouter } from "react-router-dom";

import Home from "../pages/Home";
import People from "../pages/People";
import Transactions from "../pages/Transactions";
import Report from "../pages/Report";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />
    },
    {
        path: "/people",
        element: <People />
    },
    {
        path: "/transactions",
        element: <Transactions />
    },
    {
        path: "/report",
        element: <Report />
    }
]);