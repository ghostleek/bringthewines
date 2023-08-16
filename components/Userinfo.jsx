"use client";

// import SignInBtn from "./SignInBtn";
import { useSession } from "next-auth/react";

export default function UserInfo() {
  const { status, data: session } = useSession();

  if (status === "authenticated") {
    return (
      <div className= "p-3 rounded-md flex flex-col gap-3 bg-yellow-100">
        <div>
          You are logged in as: <span className="font-bold">{session?.user?.name}</span>  {session?.user?.email}  <br></br>      
          Note: If you are not Kahhow or Melvin, signing up does nothing for now
        </div>
      </div>
    );
  } else {
    // return <SignInBtn />;
  }
}