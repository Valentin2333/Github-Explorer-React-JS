import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage";
import RootLayout from "./pages/Root";
import UserProfilePage from "./pages/UserProfilePAge";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "userprofile", element: <UserProfilePage /> },
    ],
  },
]);

function App() {
  return <> 
  <RouterProvider router={router} />
  </>;
}

export default App;
