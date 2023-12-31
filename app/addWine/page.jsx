"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { RSC } from "next/dist/client/components/app-router-headers";

import dotenv from 'dotenv';

dotenv.config();

export default function AddWine(){
    const [name, setName] = useState("")
    const [type, setType] = useState("")
    const [vintage, setVintage] = useState("")
    const [ctscore, setCtscore] = useState("")
    const [price, setPrice] = useState("")
    const [description, setDescription] = useState("")
    const [status, setStatus] = useState("Available");

    const router = useRouter()

    const handleSubmit = async (e) => { 
        e.preventDefault();

        if (!name || !type || !price || !description || !status || !vintage || !ctscore){
            alert("Oops - you missed a field. Please check(:")
            return;
        }
        try {
            const res = await fetch(`${process.env.NODE_ENV === 'development' ? `http://localhost:3000/` : 'https://bringthewines.vercel.app'}/api/wines`, {
                method: "POST",
                headers: {
                    "Content-type": "application/json" 
                },
                body: JSON.stringify({name,type,price,description,status,ctscore,vintage})
                });
        if (res.ok){
            router.refresh();
            router.push('/');
        } else {
            throw new Error("Failed to create wine")
            console.log(error);
        }
        } catch (error){}
    };

    return (
    <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
        <div className="font-bold items-center">Add a Wine</div>
        <input 
        className= "border border-slate-500 px-2 rounded"
        type = "text"
        placeholder = "Name of wine"
        onChange={e => setName(e.target.value)} 
        />
        <select 
            className="border border-slate-500 px-2 rounded"
            value={type} // Bind the value to the state
            onChange={e => setType(e.target.value)} // Update the state on change
        >
          <option value="" disabled selected>Select type of wine</option>
          <option value="Red">Red</option>
          <option value="White">White</option>
          <option value="Rosé">Rosé</option>
          <option value="Sparkling">Sparkling</option>
          <option value="Dessert">Dessert</option>
        </select>
        <input 
        className= "border border-slate-500 px-2 rounded"
        type = "text"
        placeholder = "Vintage"
        onChange={e => setVintage(e.target.value)} 
        />
        <input 
        className= "border border-slate-500 px-2 rounded"
        type = "text"
        placeholder = "CT Score"
        onChange={e => setCtscore(e.target.value)} 
        />
                <input 
        className= "price-input border border-slate-500 px-2 rounded"
        type = "text"
        placeholder = "Price"
        onChange={e => setPrice(e.target.value)} 
        />
        <input 
        className= "border border-slate-500 px-2 rounded"
        type = "text"
        placeholder = "Description of wine"
        onChange={e => setDescription(e.target.value)} 
        />
        <select 
            className="border border-slate-500 px-2 rounded"
            value={status} // Bind the value to the state
            onChange={e => setStatus(e.target.value)} // Update the state on change
        >
          <option value="" disabled>Select status</option>
          <option value="Available">Available</option>
          <option value="Sold">Sold</option>
          <option value="Reserved">Reserved</option>
        </select>
        <button className="bg-black font-light p-3 px-6 text-white rounded-md">Add Wine</button>
    </form>

);
}