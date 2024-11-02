import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage";
import RootLayout from "./pages/Root";
import UserDetailsPage from "./pages/UserDetailsPage";
import classes from "./App.module.css";
import ErrorContextProvider from "./components/ErrorContext";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "users/:username", element: <UserDetailsPage /> },
    ],
  },
]);

function App() {
  return (
    <ErrorContextProvider>
      <div className={classes["page-container"]}>
        <div className={classes.box}>
          <RouterProvider router={router} />
        </div>
      </div>
    </ErrorContextProvider>
  );
}

export default App;
