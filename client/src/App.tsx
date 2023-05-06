import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Layout";
// import Games from "./pages/Games";
import { AuthProvider } from "react-auth-kit";
import PrivateRoute from "./components/PrivateRoute";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <h1>Home</h1> },
      {
        path: "games",
        element: <p>Games</p>,
        children: [{ path: ":id", element: <h1>game :id</h1> }],
      },
      { path: "podcasts", element: <h1>podcasts</h1> },
      { path: "login", element: <h1>login</h1> },
      { path: "register", element: <h1>register</h1> },
      {
        path: "profile",
        element: <h1>profile</h1>,
        children: [
          {
            path: "collections",
            element: <h1>collections</h1>,
            children: [{ path: ":id", element: <h1>collections :id</h1> }],
          },
          { path: "details", element: <h1>profile details</h1> },
        ],
      },
    ],
  },
]);

const App = () => (
  <AuthProvider authType={"localstorage"} authName={"_auth"} cookieDomain={window.location.hostname} cookieSecure={window.location.protocol === "https:"}>
    <RouterProvider router={router} />
  </AuthProvider>
);

export default App;
