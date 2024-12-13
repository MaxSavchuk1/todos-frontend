// import Header from "@/components/Header";
import Loader from "@/components/Loader";
import Sidebar from "@/components/Sidebar";
import { Suspense } from "react";
import { Outlet } from "react-router-dom";

export default function CommonLayout() {
  return (
    <>
      {/* <Header /> */}

      <main className="flex h-full relative">
        <Sidebar />

        <div className="w-full h-full overflow-y-scroll">
          <Suspense fallback={<Loader />}>
            <Outlet />
          </Suspense>
        </div>
      </main>
    </>
  );
}
