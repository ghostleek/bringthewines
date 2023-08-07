
// this is a client side action
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import dotenv from 'dotenv';

dotenv.config();

export default function EditWineForm({ id, name, type, description, price, status, vintage, ctscore }) {
    const [newName, setNewName] = useState(name);
    const [newType, setNewType] = useState(type);
    const [newPrice, setNewPrice] = useState(price);
    const [newDescription, setNewDescription] = useState(description);
    const [newStatus, setNewStatus] = useState(status);
    const [newVintage, setNewVintage] = useState(vintage);
    const [newCtscore, setNewCtscore] = useState(ctscore);

    const router = useRouter();

    const handleSubmit = async e => {
        e.preventDefault();

        try{

            const baseURL = process.env.NODE_ENV === 'development' ? `http://localhost:3000/api/wines/${id}` : 'https://bringthewines.vercel.app/api/wines/${id}';
            const res =  await fetch(baseURL, {
                method: "PUT",
                headers:{
                    "Content-type":"application/json"
                },
                body: JSON.stringify({ newName, newType, newPrice, newDescription, newStatus, newVintage, newCtscore})
            });
            if (!res.ok){
                throw new Error("Failed to update wine")
        }
        router.push("/");
        } catch (error) {
            console.log(error);
        }
        };
    
    return (
        <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
        <div className="font-bold items-center">Add a Wine</div>
        <input 
        className= "border border-slate-500 px-2 rounded"
        type = "text"
        placeholder = "Name of wine"
        value={newName} 
        onChange={(e) => setNewName(e.target.value)} 
        />
        <select 
            className="border border-slate-500 px-2 rounded"
            value={type} // Bind the value to the state
            onChange={e => setNewType(e.target.value)} // Update the state on change
        >
          <option value="" disabled selected>Select type of wine</option>
          <option value="Red">Red</option>
          <option value="White">White</option>
          <option value="Rosé">Rosé</option>
          <option value="Sparkling">Sparkling</option>
          <option value="Dessert">Dessert</option>
        </select>
        <input 
        className= "price-input border border-slate-500 px-2 rounded"
        type = "text"
        placeholder = "Price"
        value={newPrice} 
        onChange={(e) => setNewPrice(e.target.value)} 
        />
        <input 
        className= "border border-slate-500 px-2 rounded"
        type = "text"
        placeholder = "Vintage"
        onChange={e => setNewVintage(e.target.value)} 
        />
        <input 
        className= "border border-slate-500 px-2 rounded"
        type = "text"
        placeholder = "CT Score"
        value={newCtscore} 
        onChange={(e) => setNewCtscore(e.target.value)} 
        />

        <input 
        className= "border border-slate-500 px-2 rounded"
        type = "text"
        placeholder = "Description of wine"
        value={newDescription} 
        onChange={e => setNewDescription(e.target.value)} 
        />
        <select 
            className="border border-slate-500 px-2 rounded"
            value={status} // Bind the value to the state
            onChange={e => setNewStatus(e.target.value)} // Update the state on change
        >
          <option value="" disabled>Select status</option>
          <option value="Available" selected>Available</option>
          <option value="Sold">Sold</option>
          <option value="Reserved">Reserved</option>
        </select>
        <button className="bg-black font-light p-3 px-6 text-white rounded-md">Update Wine</button>
    </form>
);
}