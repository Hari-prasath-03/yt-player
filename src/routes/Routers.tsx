import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "../layouts/RootLayout";
import IndexPlayer from "../pages/IndexPlayer";
import YourLibrary from "../pages/YourLibrary";
import PlayListLayout from "../layouts/PlayListLayout";
import PlayListItemsPage from "../pages/PlayListItemsPage";

const Routers = () => {
  const routes = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      children: [
        {
          index: true,
          element: <IndexPlayer />,
        },
        {
          path: "your-library",
          element: <YourLibrary />,
        },
        {
          path: "playlist",
          element: <PlayListLayout />,
          children: [
            {
              path: ":playlist",
              element: <PlayListItemsPage />,
            },
          ],
        },
      ],
    },
  ]);
  return <RouterProvider router={routes} />;
};

export default Routers;
