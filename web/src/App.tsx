import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  Link, 
} from "react-router-dom";

import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";

const Layout = () => (
  <>
    <nav style={{ borderBottom: "1px solid #ccc", padding: "10px" }}>
      <Link to="/">Главная</Link> |{" "}
      <Link to="/about">О нас</Link> |{" "}
      <Link to="/contact">Контакты</Link>
    </nav>
    <div style={{ padding: "20px" }}>
      <Outlet /> 
    </div>
  </>
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />, // Общий макет
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "*",
        element: <div>404 Страница не найдена</div>,
      }
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;