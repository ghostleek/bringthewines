"use client";

import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react"
import {HiPlusCircle} from "react-icons/hi"

export default function Navbar(){
    const { status } = useSession();
    return (
        <nav className="flex justify-between items-center bg-stone-300 px-8 py-3 rounded-md">
          <Link className="font-light" href={"/"}>Bring the Wines</Link>
          <div className="flex"> {/* Container div to align buttons to the right */}
            {status === "authenticated" && (
              <Link className="p-2 rounded-md fill-white mr-4" href={"/addWine"}><HiPlusCircle size={24} /></Link> // Add Wine button enabled if authenticated
            )}
            {status === "authenticated" ? (
              <button
                onClick={() => signOut()}
                className="text-black px-3 py-2 rounded-md outline"
              >
                Sign Out
              </button>
            ) : (
              <button
                onClick={() => signIn("google")}
                className="bg-slate-900 text-white px-6 py-2 rounded-md"
              >
                Sign In
              </button>
            )}
          </div>
        </nav>
      );
    }