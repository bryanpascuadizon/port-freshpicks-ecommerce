import { Loader } from "lucide-react";

const PageLoader = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/50">
      <Loader className="w-10 h-10 animate-spin text-green-700" />
    </div>
  );
};

export default PageLoader;
