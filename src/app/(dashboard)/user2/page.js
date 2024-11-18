import Button from "@/components/ui/Button";
import EmailInput from "@/components/ui/inputFields/EmailInput";
import TextInput from "@/components/ui/inputFields/TextInput";
import React from "react";
import { IoAddCircleOutline } from "react-icons/io5";

export default function User2() {
  return (
    <div className="w-full flex flex-col gap-4 p-6 ">
      <h2 className="text-lg font-bold mb-4">Permissions</h2>
      <p className="mb-6">
        Enter one or multiple users. All users will be granted the permissions
        that you indicated on the previous screen. When finished adding users,
        click Next.
      </p>

      <div className="w-full flex flex-wrap justify-start items-center gap-4">
        <TextInput title={"First Name"}/>
        <TextInput title={"Last Name"}/>
        <EmailInput title={"Email"}/>
      </div>

      <Button title={"Add"} icon={<IoAddCircleOutline className="size-6" />}/>

      <div className="mt-6">
      <Button title={"Next"} icon={<IoAddCircleOutline className="size-6" />}/>
      </div>
    </div>
  );
}
