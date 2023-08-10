import Link from "next/link";
import {HiPlusCircle} from "react-icons/hi"

export default function Navbar(){
    return (
        <nav className = "flex justify-between items-center bg-stone-300 px-8 py-3 rounded-md">
            <Link className="font-light" href={"/"}>Bring the Wines</Link>
            {/* <Link className="p-2 rounded-md fill-white" href={"/addWine"}><HiPlusCircle size ={24} />
</Link>*/}
        </nav>
    )
}