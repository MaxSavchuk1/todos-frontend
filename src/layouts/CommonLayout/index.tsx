import Header from "@/components/Header";
import { Outlet } from "react-router-dom";

export default function CommonLayout() {
  return (
    <>
      <Header />
      <main className="h-full">
        <Outlet />
      </main>
    </>
  );
}
