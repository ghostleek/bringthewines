import Link from "next/link";
import RemoveBtn from "./RemoveBtn";
import {HiPencilAlt, HiOutlineInformationCircle} from "react-icons/hi"
import dotenv from 'dotenv';

dotenv.config();

const getWines = async() => {
    try {
        const baseURL = process.env.NODE_ENV === 'development' ? `http://localhost:3000/api/wines` : 'https://bringthewines.vercel.app/api/wines';
        const res =  await fetch(baseURL, {
            cache: "no-store",
        });
        if (!res.ok) {
            throw new Error(`Failed to fetch wines with status ${res.status}`);
        }
        const data = await res.json(); // Parse the response as JSON
        return data; // Assuming the response object has a 'wines' property
    } catch (error) {
        console.log("Error loading wines:", error.message, error.stack);
    }
};


export default async function WineList() {
    const response = await getWines();
    const wines = response?.wines || [];

    return (
        <>
        {wines.map((t) => {
            // Prepare the WhatsApp message
            const whatsappMessage = `Hi, I am interested to buy ${t.name} for ${t.price}. Can I suggest a few time/places for self collection`;
            // Encode the message for use in a URL
            const encodedMessage = encodeURIComponent(whatsappMessage);
            // Create the WhatsApp URL
            const whatsappURL = `https://wa.me/+6597383295?text=${encodedMessage}`;

            return (
                <div 
                key={t._id}
                className="mt-4 p-4 border border-slate-300 rounded-md flex flex-col gap-5">
                    <div>
                        <div className="flex justify-between">
                            <div className="pl-1" style={{ color: t.type === 'Red' ? 'red' : t.type === 'White' ? 'grey' : 'inherit' }}>
                                {t.type}
                            </div>
                            <div className="flex gap-2">
                                <RemoveBtn id={t._id}/>
                                <Link href={`/editWine/${t._id}`}>
                                    <HiPencilAlt size={24} />
                                </Link>
                            </div>
                        </div>
                    <div class = "flex pb-1"><h2 className="font-light bg-stone-100 rounded-md p-2"> {t.vintage} </h2><h2 className = "font-light text-xl p-2">{t.name}</h2></div>
                    <div className = "pb-2">{t.description}</div>
                    <div class = "flex"><h3 className = "font-bold text-xl">${t.price} </h3></div>
                    <div className="flex items-center gap-2">
                            <span>{t.ctscore}</span>
                            <div className="relative inline-block hover:cursor-pointer group">
                            <HiOutlineInformationCircle className="hover:opacity-100" />
                            <div className="absolute left-full top-1/2 transform -translate-y-1/3 w-72 p-2 text-xs bg-white border rounded-md shadow-lg opacity-0 group-hover:opacity-100 z-10">
                                Score based on Parker scoring system. <br></br>
                                 
                                <a class = "red"
                                    href="https://www.wineinvestment.com/sg/learn/magazine/2021/05/the-role-of-wine-critics-2/" 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                >
                                    Read more
                                </a>
                            </div>
                        </div>
                    </div>
                    {/* Show the WhatsApp button if the status is "Available" */}
                    <div class = "pt-3 flex justify-end">
                    {t.status === 'Available' ? (
                        <a href={whatsappURL} target="_blank" rel="noopener noreferrer">
                        <button className="bg-black text-white p-2 rounded-md w-28">
                            Buy now
                        </button>
                        </a>
                    ) : t.status === 'Reserved' ? (
                        <button className="bg-gray-300 text-gray-600 p-2 rounded-md w-28" disabled>
                        Reserved
                        </button>
                    ) : null}                    
                </div>                
                </div>
            </div>
            );
        })}
        </>
    );
}
