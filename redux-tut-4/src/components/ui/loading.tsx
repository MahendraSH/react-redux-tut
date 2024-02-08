import { Loader } from 'lucide-react';
import { FC } from 'react'

interface LoadingProps {
  
}

const Loading: FC<LoadingProps> = ({}) => {
  return (
    <>
      <div className="  w-16 h-16 ">
        <Loader className="w-10 h-10 animate-spin " />{" "}
      </div>
    </>
  );
}

export default Loading