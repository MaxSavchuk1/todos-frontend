import { ChevronLeftIcon } from "@heroicons/react/16/solid";
import { Suspense, useMemo } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Loader from "@/components/Loader";
import Sidebar from "@/components/Sidebar";
import { sidebarLinks } from "@/constants";

export default function CommonLayout() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const showBackButton = useMemo(
    () => !sidebarLinks.map((link) => link.path).includes(pathname),
    [pathname]
  );

  return (
    <>
      <main className="flex h-full relative">
        <Sidebar />

        <div className="w-full h-full overflow-y-scroll">
          {showBackButton && (
            <div
              className="flex gap-1 items-center cursor-pointer my-3 w-fit"
              onClick={() => navigate(-1)}
            >
              <ChevronLeftIcon className="w-5" />
              <span className="text-sm">Back</span>
            </div>
          )}

          <Suspense fallback={<Loader />}>
            <Outlet />
          </Suspense>
        </div>
      </main>
    </>
  );
}
