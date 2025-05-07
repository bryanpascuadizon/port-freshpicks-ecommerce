"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { getUserProfile } from "@/lib/actions/UserActions";
import { getUserAvatar } from "@/lib/utils";

import { useQuery } from "@tanstack/react-query";

const AvatarHeader = () => {
  const { data } = useQuery({
    queryKey: ["header-user"],
    queryFn: getUserProfile,
  });

  return (
    data && (
      <Avatar className="cursor-pointer mt-[-8px]">
        <AvatarFallback>{getUserAvatar(data.name)}</AvatarFallback>
      </Avatar>
    )
  );
};

export default AvatarHeader;
