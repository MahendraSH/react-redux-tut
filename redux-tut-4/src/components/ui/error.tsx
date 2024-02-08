import { FC } from "react";

interface ErrorComponentProps {
  error: string | undefined;
}

const ErrorComponent: FC<ErrorComponentProps> = ({ error }) => {
  return (
    <>
      <div className=" w-full min-h-20 p-4 m-4 rounded shadow-sm shadow-secondary-foreground bg-destructive text-destructive-foreground">
        {error}
      </div>
    </>
  );
};

export default ErrorComponent;
