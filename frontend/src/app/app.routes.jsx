import { createBrowserRouter } from "react-router";

import Login from "../features/auth/pages/Login";
import Register from "../features/auth/pages/Register";
import Protected from "../features/auth/components/Protected";

import Dashboard from "../features/habit/pages/Dashboard";
import HabitDetail from "../features/habit/pages/HabitDetail";
import AppLayout from "./AppLayout";
import Settings from "../features/habit/pages/Settings";


export const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    element: (
      <Protected>
        <AppLayout />
      </Protected>
    ),
    children: [
      {
        path: "/",
        element: <Dashboard />,
      },
      {
        path: "/habits/:id",
        element: <HabitDetail />,
      },
      {
        path: "/settings",
        element: <Settings />
      }
    ],
  },
]);