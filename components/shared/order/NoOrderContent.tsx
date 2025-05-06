import { Search } from "lucide-react";
import Link from "next/link";

const NoOrderContent = () => {
  return (
    <div className="text-center mt-20">
      <Search className="text-green mb-5 m-auto" width={100} height={100} />
      <p className="text-base">
        No orders yet. Continue shopping{" "}
        <Link href="/" className="text-green">
          here
        </Link>
      </p>
    </div>
  );
};

export default NoOrderContent;
