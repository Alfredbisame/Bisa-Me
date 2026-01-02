import { LoaderCircle } from "lucide-react";

const Loader = () => {
  return (
    <div className="w-full h-full my-20 flex items-center justify-center">
      <LoaderCircle className="animate-spin" size={20} color="orange" />
    </div>
  );
};

export default Loader;
