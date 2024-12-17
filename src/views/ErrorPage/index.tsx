import { useRouteError } from "react-router-dom";

type RouteError = {
  statusText?: string;
  status?: number;
  data?: string;
};

export default function ErrorFallback() {
  const error = useRouteError() as RouteError;

  return (
    <div className="w-full h-full flex">
      <div role="alert" className="flex flex-col gap-4 m-auto text-center">
        <h1 className="text-xl font-bold">{error?.status}</h1>
        <p>{error?.statusText || error?.data}</p>
      </div>
    </div>
  );
}
