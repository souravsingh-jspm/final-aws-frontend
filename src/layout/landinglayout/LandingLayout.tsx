import { Suspense } from "react";
import { Outlet } from "react-router";
import LandingFoot from "./LandingFooter";
import LandingHeader from "./LandingHeader";

const LandingLayout = () => {
  return (
    <div>
      <LandingHeader />
      <Suspense>
        <div className="px-2 pt-10 tablet:pt-10 w-full flex flex-col items-center">
          <div className="w-full max-w-[1200px]">
            <Outlet />
          </div>
        </div>
      </Suspense>
      <LandingFoot />
    </div>
  );
};

export default LandingLayout;
