import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
} from "react-router-dom";

import { MainPage } from "./pages/MainPage/MainPage";
import About from "./pages/About";
import Contact from "./pages/Contact";
import { Header } from "./components/Header/Header";
import { Footer } from "./components/Footer/Footer";

const Layout = () => (
  <>
    <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        minHeight: '100vh', // Растягиваем на всю высоту экрана
        backgroundColor: '#f5eee8', // Общий фон страницы из макета
        width: '100%',
        margin:0,
        padding:0,
      }}>
      <Header />
      <main style={{ flex: '1 0 auto' }}> 
        <Outlet />
      </main>
      <Footer />
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
        element: <MainPage />,
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