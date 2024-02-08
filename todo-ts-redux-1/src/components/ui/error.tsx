import { FetchBaseQueryError } from "@reduxjs/toolkit/query/react";
import { SerializedError } from "@reduxjs/toolkit/react";
import { FC } from "react";

interface ErrorComponentProps {
  error: FetchBaseQueryError | SerializedError | undefined;
}

const ErrorComponent: FC<ErrorComponentProps> = ({ error }) => {
  console.log(error);
  return (
    <>
      <div className=" w-full min-h-20 p-4 m-4 rounded shadow-sm shadow-secondary-foreground bg-destructive text-destructive-foreground">
        {"Some thing when wrong "}
      </div>
    </>
  );
};

export default ErrorComponent;
