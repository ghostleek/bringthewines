import Link from "next/link";
import RemoveBtn from "./RemoveBtn";
import {HiPencilAlt} from "react-icons/hi"
import dotenv from 'dotenv';

dotenv.config();

const getWines = async() => {
    try {
        const baseURL = process.env.NODE_ENV === 'development' ? `${process.env.NEXT_PUBLIC_API_URL}/api/wines` : '/api/wines';
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
            key = {t._id}
            className = "mt-4 p-4 border border-slate-300 rounded-md flex justify-between gap-5 items-start">
                <div>
                    <div style={{color: t.type === 'Red' ? 'red' : t.type === 'White' ? 'grey' : 'inherit'}}>{t.type}</div>
                    <div class = "flex"><h2 className="font-light bg-stone-100 rounded-md p-2"> {t.vintage} </h2><h2 className = "font-light text-xl p-2">{t.name}</h2></div>
                    <div className = "pb-2">{t.description}</div>
                    <div class = "flex"><h3 className = "font-bold">${t.price} </h3>&nbsp;| {t.ctscore} </div>
                    {/* Show the WhatsApp button if the status is "Available" */}
                    <div class = "pt-3">
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
                <div className ="flex gap-2">
                    {/* probably have a hacky front-end way to hide these buttons*/}
                    <RemoveBtn id={t._id}/>
                    <Link href={`/editWine/${t._id}`}>
                        <HiPencilAlt size ={24} />
                    </Link>
                </div>
            </div>
            );
        })}
        </>
    );
}
