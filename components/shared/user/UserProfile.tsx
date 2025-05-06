"use client";

import { getUserProfile, updateUserProfile } from "@/lib/actions/UserActions";
import { useQuery } from "@tanstack/react-query";
import { GENDER } from "@/lib/constants";
import { useActionState, useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import ButtonLoader from "../ButtonLoader";
import { formatPhoneNumber } from "@/lib/utils";
import { toast } from "sonner";

const UserProfile = () => {
  const { data: user, refetch } = useQuery({
    queryKey: ["user-profile"],
    queryFn: getUserProfile,
  });

  const [isEditing, setIsEditing] = useState(false);
  const [userState, action, isUpdatePending] = useActionState(
    updateUserProfile,
    {
      success: false,
      message: "",
    }
  );

  useEffect(() => {
    const refetchUser = async () => {
      if (userState.success) {
        setIsEditing(false);
        await refetch();

        toast(<p className="toast-text">Profile has been updated</p>);
      }
    };

    refetchUser();
  }, [userState, refetch, setIsEditing]);

  return (
    user && (
      <div className="h-full">
        <div className="rounded-sm">
          <div className="flex items-center mb-5">
            <p className="text-2xl font-bold">Profile</p>

            {!isEditing && (
              <Button
                className="green-button cursor-pointer bg-white ml-auto"
                onClick={() => setIsEditing(true)}
              >
                Update
              </Button>
            )}
          </div>

          <div className="w-full">
            <form action={action}>
              <Table className="text-base">
                <TableBody className="">
                  <TableRow className="tableRow">
                    <TableCell className="text-green ">Name</TableCell>
                    <TableCell>
                      {isEditing ? (
                        <Input
                          id="name"
                          name="name"
                          className="bg-white"
                          defaultValue={user.name}
                        />
                      ) : (
                        <>
                          {userState.success ? userState.user.name : user.name}
                        </>
                      )}
                    </TableCell>
                  </TableRow>
                  <TableRow className="tableRow">
                    <TableCell className="text-green">Email</TableCell>
                    <TableCell>
                      {" "}
                      {isEditing ? (
                        <Input
                          id="email"
                          name="email"
                          className="bg-white"
                          defaultValue={user.email}
                        />
                      ) : (
                        <>
                          {" "}
                          {userState.success
                            ? userState.user.email
                            : user.email}
                        </>
                      )}
                    </TableCell>
                  </TableRow>
                  <TableRow className="tableRow">
                    <TableCell className="text-green">Phone Number</TableCell>
                    <TableCell>
                      {isEditing ? (
                        <Input
                          id="phone_number"
                          name="phone_number"
                          className="bg-white"
                          defaultValue={user.phone_number}
                        />
                      ) : (
                        <>
                          {formatPhoneNumber(
                            userState.success
                              ? userState.user.phone_number
                              : user.phone_number
                          )}
                        </>
                      )}
                    </TableCell>
                  </TableRow>
                  <TableRow className="tableRow">
                    <TableCell className="text-green">Gender</TableCell>
                    <TableCell>
                      <RadioGroup
                        defaultValue={user.gender}
                        disabled={!isEditing}
                        name="gender"
                      >
                        <div className="flex items-center">
                          <RadioGroupItem
                            value={GENDER.Male}
                            id={GENDER.Male}
                            className="mr-2 cursor-pointer"
                          />
                          <Label
                            htmlFor={GENDER.Male}
                            className="text-base mr-3"
                          >
                            {GENDER.Male}
                          </Label>
                          <RadioGroupItem
                            value={GENDER.Female}
                            id={GENDER.Female}
                            className="mr-2 cursor-pointer"
                          />
                          <Label
                            htmlFor={GENDER.Female}
                            className="text-base mr-3 cursor-pointer"
                          >
                            {GENDER.Female}
                          </Label>
                          <RadioGroupItem
                            value={GENDER.Other}
                            id={GENDER.Other}
                            className="mr-2 cursor-pointer"
                          />
                          <Label
                            htmlFor={GENDER.Other}
                            className="text-base mr-3 cursor-pointer"
                          >
                            {GENDER.Other}
                          </Label>
                        </div>
                      </RadioGroup>
                    </TableCell>
                  </TableRow>
                  <TableRow className="tableRow">
                    <TableCell className="text-green">Date of Birth</TableCell>
                    <TableCell className="">**/**/1996</TableCell>
                  </TableRow>
                  {isEditing && (
                    <TableRow className="tableRow">
                      <TableCell></TableCell>
                      <TableCell className="flex gap-2">
                        {" "}
                        <Button
                          className="green-button-alternate min-w-[100px]"
                          onClick={() => setIsEditing(false)}
                        >
                          Cancel
                        </Button>
                        <Button
                          className="green-button min-w-[100px] cursor-pointer"
                          type="submit"
                        >
                          {isUpdatePending ? <ButtonLoader /> : "Update"}
                        </Button>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </form>
          </div>
        </div>
      </div>
    )
  );
};

export default UserProfile;
