import { Outlet } from "react-router-dom";

const PlayListLayout = () => {
  return (
    <div className="flex flex-col items-center h-full min-w-full md:min-w-xl mx-auto py-6 px-3 font-delius">
      <Outlet />
    </div>
  );
};

export default PlayListLayout;
