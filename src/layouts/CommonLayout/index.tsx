import Header from "@/components/Header";
import Loader from "@/components/Loader";
import { Suspense } from "react";
import { Outlet } from "react-router-dom";

export default function CommonLayout() {
  return (
    <>
      <Header />
      <main className="h-full">
        <Suspense fallback={<Loader />}>
          <Outlet />
        </Suspense>
      </main>
    </>
  );
}
