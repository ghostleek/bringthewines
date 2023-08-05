import RemoveBtn from "./RemoveBtn";
import Link from "next/link";
import {HiPencilAlt} from "react-icons/hi"

export default function WineList() {
    return <>
    <div className = "mt-4 p-4 border border-slate-300 rounded-md flex justify-between gap-5 items-start">
        <div>
            <h2 className = "font-light text-2xl">Wine Name</h2>
            <div>Wine Type</div>
            <div>Wine Price</div>
            <div>Wine Description</div>
        </div>
        <div className ="flex gap-2">
            <RemoveBtn />
            <Link href={'/editWine/'}>
                <HiPencilAlt size ={24} />
            </Link>
        </div>
    </div>
    </>
}