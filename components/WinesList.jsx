import Link from "next/link";
import RemoveBtn from "./RemoveBtn";
import {HiPencilAlt} from "react-icons/hi"

const getWines = async() => {
    try {
        const res = await fetch('http://localhost:3000/api/wines', {
            cache: "no-store",
        });
        if (!res.ok) {
            throw new Error("Failed to fetch wines");
        }
        const data = await res.json(); // Parse the response as JSON
        return data; // Assuming the response object has a 'wines' property
    } catch (error) {
        console.log("Error loading wines");
    }
};


export default async function WineList() {
    const { wines } = await getWines();

    return (
        <>
        {wines.map((t) => (
            <div 
            key = {t._id}
            className = "mt-4 p-4 border border-slate-300 rounded-md flex justify-between gap-5 items-start">
                <div>
                    <h2 className = "font-light text-2xl">{t.name}</h2>
                    <div>{t.type}</div>
                    <div>${t.price}</div>
                    <div>{t.description}</div>
                    <div>{t.status}</div>
                </div>
                <div className ="flex gap-2">
                    <RemoveBtn id={t._id}/>
                    <Link href={`/editWine/${t._id}`}>
                        <HiPencilAlt size ={24} />
                    </Link>
                </div>
            </div>
        ))}
        </>
    );
}