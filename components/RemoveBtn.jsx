// turn this into client component
"use client";

import { HiOutlineTrash } from "react-icons/hi";
import { useRouter} from "next/navigation";
import dotenv from 'dotenv';

dotenv.config();

export default function RemoveBtn( {id} ){
    const router = useRouter();
    const removeWine = async() => {
        const confirmed = confirm('Are you sure?')
        if (confirmed){
            const baseURL = process.env.NODE_ENV === 'development' ? `${process.env.NEXT_PUBLIC_API_URL}/api/wines` : '/api/wines';
            const res =  await fetch(baseURL, {
                method: "DELETE"
            });
            if (res.ok){
            router.refresh();
            }
        }
    };
    // add onclick
    return (
        <button onClick ={removeWine} className="text-red-400">
            <HiOutlineTrash size = {24} />
        </button>
    );
}