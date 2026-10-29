import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {HomePage } from "../pages/HomePage"
const router = createBrowserRouter([
    {
        path: "/",
        element: <HomePage />,
    },
    {
        path: "begin",
        element: <div>2</div>
    },
    {
        path: "qr",
        element: <div>3</div>
    },
    {
        path: "game",
        element: <div>4</div>
    },
    {
        path: "result",
        element: <div>5</div>
    },
]);

function AppRouter() {
    return <RouterProvider router={router} />;
}

export { AppRouter };