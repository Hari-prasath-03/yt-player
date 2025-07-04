import { Outlet } from "react-router-dom";
import Header from "../components/Header";

const RootLayout = () => {
  return (
    <div className="min-h-screen md:h-screen md:overflow-y-hidden bg-bg text-text dark:bg-dark-bg dark:text-dark-text w-full flex flex-col color-transition">
      <Header />
      <Outlet />
    </div>
  );
};

export default RootLayout;
